import * as OrderModel from '../models/Order.js';

// 주문 생성
export const createOrder = async (req, res, next) => {
  try {
    const { items, total_price } = req.body;
    
    // 유효성 검사
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: '주문 항목이 필요합니다'
      });
    }
    
    if (!total_price || total_price <= 0) {
      return res.status(400).json({
        success: false,
        error: '유효한 총 금액이 필요합니다'
      });
    }
    
    // 각 항목 유효성 검사
    for (const item of items) {
      if (!item.menu_id || !item.menu_name || !item.quantity || !item.unit_price) {
        return res.status(400).json({
          success: false,
          error: '주문 항목에 필수 정보가 누락되었습니다'
        });
      }
      
      if (item.quantity <= 0) {
        return res.status(400).json({
          success: false,
          error: '수량은 1 이상이어야 합니다'
        });
      }
    }
    
    const order = await OrderModel.createOrder({
      items,
      totalPrice: total_price
    });
    
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    // 재고 부족 에러 처리
    if (error.message.includes('재고가 부족합니다')) {
      const match = error.message.match(/메뉴 ID: (\d+), 요청 수량: (\d+), 현재 재고: (\d+)/);
      if (match) {
        return res.status(400).json({
          success: false,
          error: '재고가 부족합니다',
          menu_id: parseInt(match[1]),
          available_stock: parseInt(match[3])
        });
      }
    }
    
    next(error);
  }
};

// 모든 주문 조회
export const getAllOrders = async (req, res, next) => {
  try {
    const { status } = req.query;
    const orders = await OrderModel.getAllOrders(status || null);
    
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// 특정 주문 조회
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.getOrderById(parseInt(id));
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: '주문을 찾을 수 없습니다'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// 주문 상태 변경
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        error: '주문 상태가 필요합니다'
      });
    }
    
    const updatedOrder = await OrderModel.updateOrderStatus(parseInt(id), status);
    
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        error: '주문을 찾을 수 없습니다'
      });
    }
    
    res.json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    if (error.message.includes('유효하지 않은 주문 상태')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    next(error);
  }
};

// 주문 통계 조회
export const getOrderStats = async (req, res, next) => {
  try {
    const stats = await OrderModel.getOrderStats();
    res.json({
      success: true,
      data: {
        total: parseInt(stats.total),
        accepted: parseInt(stats.accepted),
        preparing: parseInt(stats.preparing),
        completed: parseInt(stats.completed)
      }
    });
  } catch (error) {
    next(error);
  }
};

