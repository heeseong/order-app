import { useState, useEffect } from 'react'
import './App.css'
import { menuAPI, orderAPI } from './api'

// 주문 상태
const ORDER_STATUS = {
  PENDING: 'pending',      // 주문 접수 대기
  ACCEPTED: 'accepted',    // 주문 접수
  PREPARING: 'preparing',  // 제조 중
  COMPLETED: 'completed'   // 제조 완료
}

function App() {
  const [currentView, setCurrentView] = useState('order') // 'order' or 'admin'
  const [cart, setCart] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // 관리자 화면용 상태
  const [inventory, setInventory] = useState({})
  const [orders, setOrders] = useState([])
  const [dashboardStats, setDashboardStats] = useState({
    total: 0,
    accepted: 0,
    preparing: 0,
    completed: 0
  })

  // 메뉴 데이터 로드
  useEffect(() => {
    loadMenus()
  }, [])

  // 주문 데이터 및 통계 로드 (관리자 화면일 때)
  useEffect(() => {
    if (currentView === 'admin') {
      loadOrders()
      loadOrderStats()
      loadInventory()
    }
  }, [currentView])

  // 메뉴 목록 로드
  const loadMenus = async () => {
    try {
      setLoading(true)
      const menus = await menuAPI.getAllMenus()
      setMenuItems(menus)
      
      // 재고 정보 초기화
      const inventoryMap = {}
      menus.forEach(menu => {
        inventoryMap[menu.id] = menu.stock
      })
      setInventory(inventoryMap)
    } catch (err) {
      setError('메뉴를 불러오는데 실패했습니다.')
      console.error('메뉴 로드 오류:', err)
    } finally {
      setLoading(false)
    }
  }

  // 주문 목록 로드
  const loadOrders = async () => {
    try {
      const orders = await orderAPI.getAllOrders()
      setOrders(orders)
    } catch (err) {
      console.error('주문 로드 오류:', err)
    }
  }

  // 주문 통계 로드
  const loadOrderStats = async () => {
    try {
      const stats = await orderAPI.getOrderStats()
      setDashboardStats(stats)
    } catch (err) {
      console.error('통계 로드 오류:', err)
    }
  }

  // 재고 정보 로드
  const loadInventory = async () => {
    try {
      const menus = await menuAPI.getAllMenus()
      const inventoryMap = {}
      menus.forEach(menu => {
        inventoryMap[menu.id] = menu.stock
      })
      setInventory(inventoryMap)
    } catch (err) {
      console.error('재고 로드 오류:', err)
    }
  }

  // 옵션 추가 시 가격 계산
  const calculatePrice = (item, selectedOptions) => {
    let totalPrice = item.price
    if (item.options && Array.isArray(item.options)) {
      item.options.forEach(option => {
        const optionKey = option.name === '샷 추가' ? 'addShot' : 
                         option.name === '시럽 추가' ? 'addSyrup' : null
        if (optionKey && selectedOptions[optionKey]) {
          totalPrice += option.price
        }
      })
    }
    return totalPrice
  }

  // 장바구니에 추가
  const addToCart = (item, options) => {
    // 옵션이 없으면 기본 메뉴만으로 인식
    const hasOptions = options.addShot || options.addSyrup
    const price = calculatePrice(item, options)
    
    // 옵션이 없는 경우 같은 메뉴로 인식
    if (!hasOptions) {
      const existingItemIndex = cart.findIndex(
        (cartItem) =>
          cartItem.menuId === item.id &&
          !cartItem.options.addShot &&
          !cartItem.options.addSyrup
      )

      if (existingItemIndex >= 0) {
        // 기존 아이템 수량 증가
        const updatedCart = [...cart]
        updatedCart[existingItemIndex].quantity += 1
        setCart(updatedCart)
        return
      }
    }

    // 옵션이 있거나 새 아이템인 경우
    const cartItem = {
      id: `${item.id}-${options.addShot ? 'shot' : ''}-${options.addSyrup ? 'syrup' : ''}`,
      menuId: item.id,
      name: item.name,
      price: price,
      options: { ...options },
      quantity: 1
    }

    // 동일한 메뉴와 옵션 조합이 있는지 확인
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.menuId === item.id &&
        cartItem.options.addShot === options.addShot &&
        cartItem.options.addSyrup === options.addSyrup
    )

    if (existingItemIndex >= 0) {
      // 기존 아이템 수량 증가
      const updatedCart = [...cart]
      updatedCart[existingItemIndex].quantity += 1
      setCart(updatedCart)
    } else {
      // 새 아이템 추가
      setCart([...cart, cartItem])
    }
  }

  // 장바구니 총 금액 계산
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // 주문하기
  const handleOrder = async () => {
    if (cart.length === 0) {
      alert('장바구니가 비어있습니다.')
      return
    }
    
    try {
      // 주문 데이터 준비
      const orderItems = cart.map(item => ({
        menu_id: item.menuId,
        menu_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        options: item.options,
        item_total_price: item.price * item.quantity
      }))
      
      const totalPrice = calculateTotal()
      
      // API 호출
      await orderAPI.createOrder({
        items: orderItems,
        total_price: totalPrice
      })
      
      // 성공 시 장바구니 비우기 및 메뉴 재고 새로고침
      setCart([])
      await loadMenus() // 재고 업데이트를 위해 메뉴 다시 로드
      alert(`주문이 완료되었습니다!\n총 금액: ${totalPrice.toLocaleString()}원`)
    } catch (err) {
      alert(err.message || '주문 처리 중 오류가 발생했습니다.')
      console.error('주문 오류:', err)
    }
  }

  // 재고 증가
  const increaseInventory = async (menuId) => {
    try {
      const currentStock = inventory[menuId] || 0
      const newStock = currentStock + 1
      await menuAPI.updateStock(menuId, newStock)
      setInventory(prev => ({
        ...prev,
        [menuId]: newStock
      }))
    } catch (err) {
      alert('재고 수정 중 오류가 발생했습니다.')
      console.error('재고 수정 오류:', err)
    }
  }

  // 재고 감소
  const decreaseInventory = async (menuId) => {
    try {
      const currentStock = inventory[menuId] || 0
      if (currentStock <= 0) return
      
      const newStock = currentStock - 1
      await menuAPI.updateStock(menuId, newStock)
      setInventory(prev => ({
        ...prev,
        [menuId]: newStock
      }))
    } catch (err) {
      alert('재고 수정 중 오류가 발생했습니다.')
      console.error('재고 수정 오류:', err)
    }
  }

  // 재고 상태 확인
  const getInventoryStatus = (quantity) => {
    if (quantity === 0) return '품절'
    if (quantity < 5) return '주의'
    return '정상'
  }

  // 재고 상태 색상
  const getInventoryStatusColor = (status) => {
    if (status === '품절') return '#ef4444'
    if (status === '주의') return '#f59e0b'
    return '#10b981'
  }

  // 주문 상태 변경
  const changeOrderStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus)
      // 주문 목록 및 통계 새로고침
      await loadOrders()
      await loadOrderStats()
    } catch (err) {
      alert('주문 상태 변경 중 오류가 발생했습니다.')
      console.error('주문 상태 변경 오류:', err)
    }
  }

  return (
    <div className="app">
      {/* 헤더 */}
      <header className="header">
        <div className="logo">COZY-Enjoy a flavour you have never experienced</div>
        <nav className="navigation">
          <button 
            className={`nav-button ${currentView === 'order' ? 'active' : ''}`}
            onClick={() => setCurrentView('order')}
          >
            주문하기
          </button>
          <button 
            className={`nav-button ${currentView === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentView('admin')}
          >
            관리자
          </button>
        </nav>
      </header>

      {/* 화면 전환 */}
      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>로딩 중...</p>
        </div>
      ) : error ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
          <p>{error}</p>
          <button onClick={loadMenus}>다시 시도</button>
        </div>
      ) : currentView === 'order' ? (
        <OrderView
          menuItems={menuItems}
          cart={cart}
          addToCart={addToCart}
          calculateTotal={calculateTotal}
          handleOrder={handleOrder}
        />
      ) : (
        <AdminView
          menuItems={menuItems}
          inventory={inventory}
          increaseInventory={increaseInventory}
          decreaseInventory={decreaseInventory}
          getInventoryStatus={getInventoryStatus}
          getInventoryStatusColor={getInventoryStatusColor}
          orders={orders}
          changeOrderStatus={changeOrderStatus}
          dashboardStats={dashboardStats}
          ORDER_STATUS={ORDER_STATUS}
        />
      )}
    </div>
  )
}

// 주문하기 화면
function OrderView({ menuItems, cart, addToCart, calculateTotal, handleOrder }) {
  return (
    <>
      {/* 메뉴 아이템 영역 */}
      <main className="main-content">
        <div className="menu-grid">
          {menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* 장바구니 영역 */}
      <aside className="cart-section">
        <h2 className="cart-title">장바구니</h2>
        <div className="cart-content">
          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">장바구니가 비어있습니다.</p>
            ) : (
              cart.map((item) => {
                const optionsText = []
                if (item.options.addShot) optionsText.push('샷 추가')
                if (item.options.addSyrup) optionsText.push('시럽 추가')
                const optionsDisplay = optionsText.length > 0 ? ` (${optionsText.join(', ')})` : ''
                
                return (
                  <div key={item.id} className="cart-item">
                    <span className="cart-item-text">
                      {item.name}{optionsDisplay} X {item.quantity} - {(item.price * item.quantity).toLocaleString()}원
                    </span>
                  </div>
                )
              })
            )}
          </div>
          <div className="cart-summary">
            <div className="total-amount">
              <span className="total-label">총 금액</span>
              <span className="total-price">{calculateTotal().toLocaleString()}원</span>
            </div>
            <button className="order-button" onClick={handleOrder}>
              주문하기
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

// 관리자 화면
function AdminView({
  menuItems,
  inventory,
  increaseInventory,
  decreaseInventory,
  getInventoryStatus,
  getInventoryStatusColor,
  orders,
  changeOrderStatus,
  dashboardStats,
  ORDER_STATUS
}) {
  // 주문 접수된 주문만 표시
  const acceptedOrders = orders.filter(order => 
    order.status === ORDER_STATUS.ACCEPTED || order.status === ORDER_STATUS.PREPARING
  )

  // 날짜 포맷팅 함수
  const formatOrderDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  return (
    <div className="admin-content">
      {/* 관리자 대시보드 섹션 */}
      <section className="dashboard-section">
        <h2 className="section-title">관리자 대시보드</h2>
        <div className="dashboard-stats">
          <div className="stat-item">
            <span className="stat-label">총 주문</span>
            <span className="stat-value">{dashboardStats.total}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">주문 접수</span>
            <span className="stat-value">{dashboardStats.accepted}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">제조 중</span>
            <span className="stat-value">{dashboardStats.preparing}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">제조 완료</span>
            <span className="stat-value">{dashboardStats.completed}</span>
          </div>
        </div>
      </section>

      {/* 재고 현황 섹션 */}
      <section className="inventory-section">
        <h2 className="section-title">재고 현황</h2>
        <div className="inventory-grid">
          {menuItems.map((item) => {
            const quantity = inventory[item.id]
            const status = getInventoryStatus(quantity)
            const statusColor = getInventoryStatusColor(status)
            
            return (
              <div key={item.id} className="inventory-card">
                <h3 className="inventory-item-name">{item.name}</h3>
                <div className="inventory-quantity">
                  <span className="quantity-number">{quantity}개</span>
                  <span 
                    className="quantity-status"
                    style={{ color: statusColor }}
                  >
                    {status}
                  </span>
                </div>
                <div className="inventory-controls">
                  <button 
                    className="inventory-button decrease"
                    onClick={() => decreaseInventory(item.id)}
                    disabled={quantity === 0}
                  >
                    -
                  </button>
                  <button 
                    className="inventory-button increase"
                    onClick={() => increaseInventory(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 주문 현황 섹션 */}
      <section className="orders-section">
        <h2 className="section-title">주문 현황</h2>
        <div className="orders-list">
          {acceptedOrders.length === 0 ? (
            <p className="empty-orders">주문이 없습니다.</p>
          ) : (
            acceptedOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-info">
                  <div className="order-date">{formatOrderDate(order.order_date)}</div>
                  <div className="order-items">
                    {order.items.map((item, index) => {
                      const optionsText = []
                      if (item.options?.addShot) optionsText.push('샷 추가')
                      if (item.options?.addSyrup) optionsText.push('시럽 추가')
                      const optionsDisplay = optionsText.length > 0 ? ` (${optionsText.join(', ')})` : ''
                      
                      return (
                        <div key={index} className="order-item">
                          {item.menu_name}{optionsDisplay} X {item.quantity} - {item.unit_price.toLocaleString()}원
                        </div>
                      )
                    })}
                  </div>
                  <div className="order-total">총 금액: {order.total_price.toLocaleString()}원</div>
                  <div className="order-status">
                    상태: {
                      order.status === ORDER_STATUS.ACCEPTED ? '주문 접수' :
                      order.status === ORDER_STATUS.PREPARING ? '제조 중' :
                      order.status === ORDER_STATUS.COMPLETED ? '제조 완료' :
                      '대기 중'
                    }
                  </div>
                </div>
                <div className="order-actions">
                  {order.status === ORDER_STATUS.ACCEPTED && (
                    <button
                      className="action-button prepare-button"
                      onClick={() => changeOrderStatus(order.id, ORDER_STATUS.PREPARING)}
                    >
                      제조 시작
                    </button>
                  )}
                  {order.status === ORDER_STATUS.PREPARING && (
                    <button
                      className="action-button complete-button"
                      onClick={() => changeOrderStatus(order.id, ORDER_STATUS.COMPLETED)}
                    >
                      제조 완료
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

// 메뉴 아이템 카드 컴포넌트
function MenuItemCard({ item, onAddToCart }) {
  const [options, setOptions] = useState({
    addShot: false,
    addSyrup: false
  })

  const handleOptionChange = (optionName) => {
    setOptions((prev) => ({
      ...prev,
      [optionName]: !prev[optionName]
    }))
  }

  const handleAddToCart = () => {
    onAddToCart(item, options)
    // 담기 후 옵션 초기화
    setOptions({
      addShot: false,
      addSyrup: false
    })
  }

  // 옵션에 따른 가격 계산
  const calculateCurrentPrice = () => {
    let price = item.price
    if (item.options && Array.isArray(item.options)) {
      item.options.forEach(option => {
        if (options[option.name === '샷 추가' ? 'addShot' : 'addSyrup']) {
          price += option.price
        }
      })
    }
    return price
  }

  const currentPrice = calculateCurrentPrice()

  // 옵션 매핑 (API 옵션 이름을 내부 옵션 키로 변환)
  const getOptionKey = (optionName) => {
    if (optionName === '샷 추가') return 'addShot'
    if (optionName === '시럽 추가') return 'addSyrup'
    return null
  }

  return (
    <div className="menu-card">
      <div className="menu-image">
        {item.image ? (
          <img src={item.image} alt={item.name} className="menu-image-img" />
        ) : (
          <div className="image-placeholder">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <line x1="0" y1="0" x2="100" y2="100" stroke="#ccc" strokeWidth="2" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="#ccc" strokeWidth="2" />
            </svg>
          </div>
        )}
      </div>
      <div className="menu-info">
        <h3 className="menu-name">{item.name}</h3>
        <p className="menu-price">{currentPrice.toLocaleString()}원</p>
        <p className="menu-description">{item.description}</p>
        <div className="menu-options">
          {item.options && Array.isArray(item.options) && item.options.map((option) => {
            const optionKey = getOptionKey(option.name)
            if (!optionKey) return null
            
            return (
              <label key={option.id} className="option-label">
                <input
                  type="checkbox"
                  checked={options[optionKey] || false}
                  onChange={() => handleOptionChange(optionKey)}
                />
                <span>{option.name} {option.price > 0 ? `(+${option.price.toLocaleString()}원)` : ''}</span>
              </label>
            )
          })}
        </div>
        <div className="menu-button-container">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            담기
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
