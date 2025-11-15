import { useState } from 'react'
import './App.css'

// 커피 메뉴 데이터
const menuItems = [
  {
    id: 1,
    name: '아메리카노(ICE)',
    price: 4000,
    description: '에스프레소에 물을 넣어 만든 시원한 아이스 커피',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: '아메리카노(HOT)',
    price: 4000,
    description: '에스프레소에 물을 넣어 만든 따뜻한 커피',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: '카페라떼',
    price: 5000,
    description: '에스프레소에 스팀밀크를 넣은 부드러운 라떼',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: '카푸치노',
    price: 5500,
    description: '에스프레소에 우유와 우유거품을 넣은 카푸치노',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: '카라멜 마키아토',
    price: 6000,
    description: '카라멜 시럽이 들어간 달콤한 마키아토',
    image: 'https://images.unsplash.com/photo-1570968914863-9a1008442c8a?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: '바닐라 라떼',
    price: 5500,
    description: '바닐라 시럽이 들어간 달콤한 라떼',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop'
  }
]

function App() {
  const [cart, setCart] = useState([])

  // 옵션 추가 시 가격 계산
  const calculatePrice = (basePrice, options) => {
    let totalPrice = basePrice
    if (options.addShot) totalPrice += 500
    if (options.addSyrup) totalPrice += 0
    return totalPrice
  }

  // 장바구니에 추가
  const addToCart = (item, options) => {
    // 옵션이 없으면 기본 메뉴만으로 인식
    const hasOptions = options.addShot || options.addSyrup
    const price = calculatePrice(item.price, options)
    
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
  const handleOrder = () => {
    if (cart.length === 0) {
      alert('장바구니가 비어있습니다.')
      return
    }
    alert(`주문이 완료되었습니다!\n총 금액: ${calculateTotal().toLocaleString()}원`)
    setCart([])
  }

  return (
    <div className="app">
      {/* 헤더 */}
      <header className="header">
        <div className="logo">COZY-Enjoy a flavour you have never experienced</div>
        <nav className="navigation">
          <button className="nav-button active">주문하기</button>
          <button className="nav-button">관리자</button>
        </nav>
      </header>

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

  const currentPrice = item.price + (options.addShot ? 500 : 0)

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
          <label className="option-label">
            <input
              type="checkbox"
              checked={options.addShot}
              onChange={() => handleOptionChange('addShot')}
            />
            <span>샷 추가 (+500원)</span>
          </label>
          <label className="option-label">
            <input
              type="checkbox"
              checked={options.addSyrup}
              onChange={() => handleOptionChange('addSyrup')}
            />
            <span>시럽 추가 (+0원)</span>
          </label>
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
