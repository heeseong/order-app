import express from 'express';
import * as menuController from '../controllers/menuController.js';

const router = express.Router();

// GET /api/menus - 모든 메뉴 목록 조회
router.get('/', menuController.getAllMenus);

// GET /api/menus/:id - 특정 메뉴 상세 정보 조회
router.get('/:id', menuController.getMenuById);

// PUT /api/menus/:id/stock - 메뉴 재고 수정
router.put('/:id/stock', menuController.updateMenuStock);

export default router;

