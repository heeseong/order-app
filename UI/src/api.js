// API 기본 URL
const API_BASE_URL = 'http://localhost:3000/api';

// API 호출 헬퍼 함수
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API 호출 실패');
    }

    return data;
  } catch (error) {
    console.error('API 호출 오류:', error);
    throw error;
  }
};

// 메뉴 관련 API
export const menuAPI = {
  // 모든 메뉴 조회
  getAllMenus: async () => {
    const response = await apiCall('/menus');
    return response.data;
  },

  // 특정 메뉴 조회
  getMenuById: async (id) => {
    const response = await apiCall(`/menus/${id}`);
    return response.data;
  },

  // 재고 수정
  updateStock: async (id, stock) => {
    const response = await apiCall(`/menus/${id}/stock`, {
      method: 'PUT',
      body: JSON.stringify({ stock })
    });
    return response.data;
  }
};

// 주문 관련 API
export const orderAPI = {
  // 주문 생성
  createOrder: async (orderData) => {
    const response = await apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
    return response.data;
  },

  // 모든 주문 조회
  getAllOrders: async (status = null) => {
    const endpoint = status ? `/orders?status=${status}` : '/orders';
    const response = await apiCall(endpoint);
    return response.data;
  },

  // 특정 주문 조회
  getOrderById: async (id) => {
    const response = await apiCall(`/orders/${id}`);
    return response.data;
  },

  // 주문 상태 변경
  updateOrderStatus: async (id, status) => {
    const response = await apiCall(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
    return response.data;
  },

  // 주문 통계 조회
  getOrderStats: async () => {
    const response = await apiCall('/orders/stats');
    return response.data;
  }
};

