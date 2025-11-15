import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

// GET /api/orders/stats - 주문 통계 조회
router.get('/stats', orderController.getOrderStats);

// GET /api/orders - 모든 주문 목록 조회
router.get('/', orderController.getAllOrders);

// GET /api/orders/:id - 특정 주문 정보 조회
router.get('/:id', orderController.getOrderById);

// POST /api/orders - 주문 생성
router.post('/', orderController.createOrder);

// PUT /api/orders/:id/status - 주문 상태 변경
router.put('/:id/status', orderController.updateOrderStatus);

export default router;

