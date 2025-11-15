import { query } from '../config/database.js';

// 모든 메뉴 조회 (옵션 포함)
export const getAllMenus = async () => {
  const result = await query(`
    SELECT 
      m.id,
      m.name,
      m.description,
      m.price,
      m.image,
      m.stock,
      m.created_at,
      m.updated_at,
      COALESCE(
        json_agg(
          json_build_object(
            'id', o.id,
            'name', o.name,
            'price', o.price,
            'menu_id', o.menu_id
          )
        ) FILTER (WHERE o.id IS NOT NULL),
        '[]'::json
      ) as options
    FROM menus m
    LEFT JOIN options o ON m.id = o.menu_id
    GROUP BY m.id, m.name, m.description, m.price, m.image, m.stock, m.created_at, m.updated_at
    ORDER BY m.id
  `);
  return result.rows;
};

// 특정 메뉴 조회 (옵션 포함)
export const getMenuById = async (id) => {
  const result = await query(`
    SELECT 
      m.id,
      m.name,
      m.description,
      m.price,
      m.image,
      m.stock,
      m.created_at,
      m.updated_at,
      COALESCE(
        json_agg(
          json_build_object(
            'id', o.id,
            'name', o.name,
            'price', o.price,
            'menu_id', o.menu_id
          )
        ) FILTER (WHERE o.id IS NOT NULL),
        '[]'::json
      ) as options
    FROM menus m
    LEFT JOIN options o ON m.id = o.menu_id
    WHERE m.id = $1
    GROUP BY m.id, m.name, m.description, m.price, m.image, m.stock, m.created_at, m.updated_at
  `, [id]);
  return result.rows[0];
};

// 메뉴 재고 업데이트
export const updateMenuStock = async (id, stock) => {
  const result = await query(`
    UPDATE menus 
    SET stock = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING id, stock, updated_at
  `, [stock, id]);
  return result.rows[0];
};

// 메뉴 재고 확인
export const checkMenuStock = async (id) => {
  const result = await query(`
    SELECT stock FROM menus WHERE id = $1
  `, [id]);
  return result.rows[0]?.stock || 0;
};

// 메뉴 재고 차감
export const decreaseMenuStock = async (id, quantity) => {
  const result = await query(`
    UPDATE menus 
    SET stock = stock - $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 AND stock >= $1
    RETURNING id, stock
  `, [quantity, id]);
  return result.rows[0];
};

