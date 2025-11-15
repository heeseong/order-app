import * as MenuModel from '../models/Menu.js';

// 모든 메뉴 조회
export const getAllMenus = async (req, res, next) => {
  try {
    const menus = await MenuModel.getAllMenus();
    res.json({
      success: true,
      data: menus
    });
  } catch (error) {
    next(error);
  }
};

// 특정 메뉴 조회
export const getMenuById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu = await MenuModel.getMenuById(parseInt(id));
    
    if (!menu) {
      return res.status(404).json({
        success: false,
        error: '메뉴를 찾을 수 없습니다'
      });
    }
    
    res.json({
      success: true,
      data: menu
    });
  } catch (error) {
    next(error);
  }
};

// 메뉴 재고 수정
export const updateMenuStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    
    if (stock === undefined || stock === null) {
      return res.status(400).json({
        success: false,
        error: '재고 수량이 필요합니다'
      });
    }
    
    if (stock < 0) {
      return res.status(400).json({
        success: false,
        error: '재고는 0 이상이어야 합니다'
      });
    }
    
    const updatedMenu = await MenuModel.updateMenuStock(parseInt(id), stock);
    
    if (!updatedMenu) {
      return res.status(404).json({
        success: false,
        error: '메뉴를 찾을 수 없습니다'
      });
    }
    
    res.json({
      success: true,
      data: updatedMenu
    });
  } catch (error) {
    next(error);
  }
};

