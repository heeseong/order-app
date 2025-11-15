import { query, transaction } from '../config/database.js';

// 주문 생성 (트랜잭션 사용)
export const createOrder = async (orderData) => {
  const { items, totalPrice } = orderData;
  
  return await transaction(async (client) => {
    // 1. 재고 확인
    for (const item of items) {
      const stockResult = await client.query(
        'SELECT stock FROM menus WHERE id = $1',
        [item.menu_id]
      );
      const stock = stockResult.rows[0]?.stock || 0;
      
      if (stock < item.quantity) {
        throw new Error(`재고가 부족합니다. 메뉴 ID: ${item.menu_id}, 요청 수량: ${item.quantity}, 현재 재고: ${stock}`);
      }
    }
    
    // 2. 주문 생성
    const orderResult = await client.query(`
      INSERT INTO orders (order_date, status, total_price)
      VALUES (CURRENT_TIMESTAMP, 'accepted', $1)
      RETURNING id, order_date, status, total_price, created_at, updated_at
    `, [totalPrice]);
    
    const order = orderResult.rows[0];
    
    // 3. 주문 항목 생성 및 재고 차감
    const orderItems = [];
    for (const item of items) {
      // 재고 차감
      await client.query(`
        UPDATE menus 
        SET stock = stock - $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [item.quantity, item.menu_id]);
      
      // 주문 항목 생성
      const itemResult = await client.query(`
        INSERT INTO order_items (
          order_id, menu_id, menu_name, quantity, unit_price, options, item_total_price
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, menu_id, menu_name, quantity, unit_price, options, item_total_price
      `, [
        order.id,
        item.menu_id,
        item.menu_name,
        item.quantity,
        item.unit_price,
        JSON.stringify(item.options || {}),
        item.item_total_price
      ]);
      
      orderItems.push(itemResult.rows[0]);
    }
    
    return {
      ...order,
      items: orderItems.map(item => ({
        ...item,
        options: typeof item.options === 'string' ? JSON.parse(item.options) : item.options
      }))
    };
  });
};

// 모든 주문 조회
export const getAllOrders = async (statusFilter = null) => {
  let sql = `
    SELECT 
      o.id,
      o.order_date,
      o.status,
      o.total_price,
      o.created_at,
      o.updated_at,
      COALESCE(
        json_agg(
          json_build_object(
            'id', oi.id,
            'menu_id', oi.menu_id,
            'menu_name', oi.menu_name,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'options', oi.options,
            'item_total_price', oi.item_total_price
          )
        ) FILTER (WHERE oi.id IS NOT NULL),
        '[]'::json
      ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
  `;
  
  const params = [];
  if (statusFilter) {
    sql += ' WHERE o.status = $1';
    params.push(statusFilter);
  }
  
  sql += ' GROUP BY o.id, o.order_date, o.status, o.total_price, o.created_at, o.updated_at';
  sql += ' ORDER BY o.order_date DESC';
  
  const result = await query(sql, params);
  return result.rows.map(row => ({
    ...row,
    items: row.items.map(item => ({
      ...item,
      options: typeof item.options === 'string' ? JSON.parse(item.options) : item.options
    }))
  }));
};

// 특정 주문 조회
export const getOrderById = async (id) => {
  const result = await query(`
    SELECT 
      o.id,
      o.order_date,
      o.status,
      o.total_price,
      o.created_at,
      o.updated_at,
      COALESCE(
        json_agg(
          json_build_object(
            'id', oi.id,
            'menu_id', oi.menu_id,
            'menu_name', oi.menu_name,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'options', oi.options,
            'item_total_price', oi.item_total_price
          )
        ) FILTER (WHERE oi.id IS NOT NULL),
        '[]'::json
      ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.id = $1
    GROUP BY o.id, o.order_date, o.status, o.total_price, o.created_at, o.updated_at
  `, [id]);
  
  if (result.rows.length === 0) {
    return null;
  }
  
  const order = result.rows[0];
  return {
    ...order,
    items: order.items.map(item => ({
      ...item,
      options: typeof item.options === 'string' ? JSON.parse(item.options) : item.options
    }))
  };
};

// 주문 상태 변경
export const updateOrderStatus = async (id, status) => {
  const validStatuses = ['pending', 'accepted', 'preparing', 'completed'];
  if (!validStatuses.includes(status)) {
    throw new Error(`유효하지 않은 주문 상태입니다: ${status}`);
  }
  
  const result = await query(`
    UPDATE orders 
    SET status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING id, status, updated_at
  `, [status, id]);
  
  return result.rows[0];
};

// 주문 통계 조회
export const getOrderStats = async () => {
  const result = await query(`
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'accepted') as accepted,
      COUNT(*) FILTER (WHERE status = 'preparing') as preparing,
      COUNT(*) FILTER (WHERE status = 'completed') as completed
    FROM orders
  `);
  return result.rows[0];
};

