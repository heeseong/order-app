#커피 주문 앱

1. 프로젝트 개요

1.1 프로젝트 명
커피주문 앱

1.2 프로젝트 목적
사용자가 커피 메뉴를 주문하고, 관리자가 주문을 관리할 수 있는 간단한 풀스택 웹 앱

1.3 개발 범위
-주문하기 화면(메뉴 선택 및 장바구니 기능)
-관리자 화면(재고 관리 및 주문상태 관리리)
-데이터를 생성/조회/수정/삭제할 수 있는 기능

2. 기술 스택
-프런트엔드: HTML, CSS, 리액트, 자바스크립트
-백엔드:Node.js, Express
-database: PostgreSQL

3. 기본 사항
- 프런트엔드와 백엔드를 따로 개발
- 기본적인 웹 기술만 사용
- 학습 목적이므로 사용자 인증이나 결제 기능은 제외
- 메뉴는 커피 메뉴만 있음

4. 프런트엔드 UI 사양

4.1 주문하기 화면

4.1.1 전체 레이아웃
- 화면은 헤더, 메뉴 아이템 영역, 장바구니 영역으로 구성
- 배경색: 흰색
- 텍스트: 어두운 회색
- 전체적으로 깔끔하고 미니멀한 디자인

4.1.2 헤더 영역
- 위치: 화면 상단 좌측
- 로고 영역:
  - 배경색: 진한 초록색 (dark green)
  - 텍스트: "COZY" (흰색)
  - 사각형 박스 형태
- 네비게이션 버튼:
  - "주문하기" 버튼 (헤더 우측)
  - "관리자" 버튼 (헤더 우측)
  - 두 버튼은 로고 우측에 나란히 배치

4.1.3 메뉴 아이템 영역
- 위치: 헤더 아래
- 레이아웃: 메뉴 아이템 카드들이 가로로 배열 (그리드 형태)
- 메뉴 아이템 카드 구성:
  - 이미지 영역:
    - 플레이스홀더 이미지 (흰색 사각형에 대각선 표시)
    - 메뉴 아이템 이미지 표시
  - 메뉴명: 커피 음료 이름 (예: "아메리카노(ICE)", "아메리카노(HOT)", "카페라떼")
  - 가격: 한국원화 표기 (예: "4,000원", "5,000원")
  - 설명: "간단한 설명..." 텍스트 표시
  - 커스터마이징 옵션:
    - 체크박스 형태의 옵션
    - "샷 추가 (+500원)" 옵션
    - "시럽 추가 (+0원)" 옵션
    - 각 옵션은 체크 가능
  - 담기 버튼: 회색 버튼, "담기" 텍스트
- 카드 스타일:
  - 각 카드는 독립적인 카드 형태
  - 카드 간 간격 유지
  - 테두리: 어두운 회색

4.1.4 장바구니 영역
- 위치: 화면 하단
- 레이아웃: 큰 사각형 박스 형태
- 제목: "장바구니"
- 장바구니 아이템 목록:
  - 각 아이템은 다음 정보 표시:
    - 메뉴명
    - 선택된 옵션 (예: "(샷 추가)")
    - 수량 (예: "X 1", "X 2")
    - 가격 (예: "4,500원", "8,000원")
  - 아이템 형식 예시:
    - "아메리카노(ICE) (샷 추가) X 1 - 4,500원"
    - "아메리카노(HOT) X 2 - 8,000원"
- 총 금액:
  - 위치: 아이템 목록 우측
  - 레이블: "총 금액"
  - 금액: 굵은 글씨로 표시 (예: "12,500원")
  - 계산: 장바구니 내 모든 아이템 가격 합계
- 주문하기 버튼:
  - 위치: 총 금액 아래
  - 스타일: 회색 버튼
  - 텍스트: "주문하기"

4.1.5 상호작용 기능
- 메뉴 아이템 담기:
  - 사용자가 메뉴 카드에서 옵션 선택 (체크박스)
  - "담기" 버튼 클릭 시 장바구니에 추가
  - 동일 메뉴+옵션 조합이 이미 장바구니에 있으면 수량 증가
  - 옵션 선택 시 가격에 반영 (예: 샷 추가 시 +500원)
- 장바구니 관리:
  - 장바구니에 추가된 아이템 목록 표시
  - 각 아이템의 총 가격 계산 (단가 × 수량)
  - 총 금액 자동 계산 및 업데이트
- 주문하기:
  - "주문하기" 버튼 클릭 시 주문 처리
  - 주문 처리 후 장바구니 초기화 또는 주문 완료 표시

4.1.6 디자인 상세 사양
- 색상:
  - 배경: 흰색 (#FFFFFF)
  - 텍스트: 어두운 회색 (#333333 또는 유사)
  - 로고 배경: 진한 초록색 (dark green)
  - 로고 텍스트: 흰색 (#FFFFFF)
  - 버튼: 회색 (#CCCCCC 또는 유사)
  - 테두리: 어두운 회색 (#666666 또는 유사)
- 타이포그래피:
  - 기본 폰트: 시스템 기본 폰트 또는 깔끔한 웹 폰트
  - 총 금액: 굵은 글씨 (bold)
- 간격 및 레이아웃:
  - 카드 간 적절한 간격 유지
  - 여백과 패딩을 통한 가독성 확보
  - 반응형 디자인 고려 (화면 크기에 따른 조정)

4.1.7 상태 및 동작
- 메뉴 아이템 로딩:
  - 서버에서 메뉴 데이터를 가져와 표시
- 옵션 선택:
  - 체크박스 클릭 시 선택/해제 상태 토글
  - 선택된 옵션에 따라 가격 미리보기 가능
- 장바구니 업데이트:
  - 아이템 추가 시 즉시 장바구니에 반영
  - 총 금액 자동 재계산
- 빈 장바구니:
  - 장바구니가 비어있을 때 적절한 메시지 표시 (선택사항)
- 주문 처리:
  - 주문하기 버튼 클릭 시 주문 데이터 전송
  - 주문 성공/실패에 따른 피드백 제공

4.2 관리자 화면

4.2.1 전체 레이아웃
- 화면은 헤더, 관리자 대시보드 섹션, 재고 현황 섹션, 주문 현황 섹션으로 구성
- 배경색: 흰색
- 텍스트: 어두운 회색
- 전체적으로 깔끔하고 미니멀한 디자인
- 세로 방향으로 섹션들이 배열

4.2.2 헤더 영역
- 위치: 화면 상단 좌측
- 로고 영역:
  - 배경색: 진한 초록색 (dark green)
  - 텍스트: "COZY" (흰색)
  - 사각형 박스 형태
  - 테두리: 어두운 회색
- 네비게이션 버튼:
  - "주문하기" 버튼 (헤더 우측)
  - "관리자" 버튼 (헤더 우측)
  - 두 버튼은 로고 우측에 나란히 배치
  - 관리자 화면에서는 "관리자" 버튼이 활성화 상태로 표시 (선택사항)

4.2.3 관리자 대시보드 섹션
- 위치: 헤더 아래
- 제목: "관리자 대시보드" (굵은 글씨 또는 큰 폰트)
- 요약 정보:
  - 위치: 제목 아래
  - 형식: "총 주문 X / 주문 접수 Y / 제조 중 Z / 제조 완료 W"
  - 각 상태별 주문 수 표시:
    - 총 주문: 전체 주문 건수
    - 주문 접수: 접수된 주문 건수
    - 제조 중: 현재 제조 중인 주문 건수
    - 제조 완료: 완료된 주문 건수
  - 실시간으로 업데이트
  - 예시: "총 주문 1 / 주문 접수 1 / 제조 중 0 / 제조 완료 0"

4.2.4 재고 현황 섹션
- 위치: 관리자 대시보드 섹션 아래
- 제목: "재고 현황"
- 레이아웃: 재고 아이템들이 가로로 배열 (그리드 형태)
- 재고 아이템 카드 구성:
  - 메뉴명: 커피 음료 이름 (예: "아메리카노(ICE)", "아메리카노(HOT)", "카페라떼")
  - 수량: 현재 재고 수량 (예: "10개")
  - 재고 조정 버튼:
    - "+" 버튼: 재고 증가 (작은 사각형 버튼)
    - "-" 버튼: 재고 감소 (작은 사각형 버튼)
    - 버튼은 수량 아래에 배치
- 카드 스타일:
  - 각 카드는 독립적인 사각형 박스 형태
  - 테두리: 어두운 회색
  - 카드 간 간격 유지

4.2.5 주문 현황 섹션
- 위치: 재고 현황 섹션 아래
- 제목: "주문 현황"
- 레이아웃: 주문 아이템들이 세로로 배열
- 주문 아이템 카드 구성:
  - 날짜 및 시간: 주문 일시 (예: "7월 31일 13:00")
  - 주문 내용:
    - 메뉴명 및 수량 (예: "아메리카노(ICE) x 1")
    - 선택된 옵션 표시 (예: "(샷 추가)")
    - 가격 (예: "4,000원")
  - 주문 상태: 주문의 현재 상태 표시 (접수, 제조 중, 완료 등)
  - 액션 버튼:
    - 위치: 주문 아이템 우측
    - 버튼 종류:
      - "주문 접수" 버튼: 주문을 접수 상태로 변경
      - "제조 시작" 버튼: 주문을 제조 중 상태로 변경
      - "제조 완료" 버튼: 주문을 완료 상태로 변경
    - 상태에 따라 다른 버튼 표시
- 카드 스타일:
  - 각 주문은 큰 사각형 박스 형태
  - 테두리: 어두운 회색
  - 주문 간 간격 유지
  - 주문이 많을 경우 스크롤 가능

4.2.6 상호작용 기능
- 재고 관리:
  - "+" 버튼 클릭 시 해당 메뉴의 재고 증가
  - "-" 버튼 클릭 시 해당 메뉴의 재고 감소
  - 재고 변경 시 즉시 서버에 반영
  - 재고 수량은 실시간으로 업데이트
- 주문 상태 관리:
  - "주문 접수" 버튼 클릭 시 주문을 접수 상태로 변경
  - "제조 시작" 버튼 클릭 시 주문을 제조 중 상태로 변경
  - "제조 완료" 버튼 클릭 시 주문을 완료 상태로 변경
  - 주문 상태 변경 시 대시보드 요약 정보 자동 업데이트
  - 주문 상태 변경 시 서버에 반영
- 대시보드 업데이트:
  - 주문 상태 변경 시 요약 정보 자동 재계산
  - 실시간으로 각 상태별 주문 수 업데이트

4.2.7 디자인 상세 사양
- 색상:
  - 배경: 흰색 (#FFFFFF)
  - 텍스트: 어두운 회색 (#333333 또는 유사)
  - 로고 배경: 진한 초록색 (dark green)
  - 로고 텍스트: 흰색 (#FFFFFF)
  - 버튼: 회색 (#CCCCCC 또는 유사)
  - 테두리: 어두운 회색 (#666666 또는 유사)
  - 섹션 제목: 굵은 글씨 또는 강조 색상
- 타이포그래피:
  - 기본 폰트: 시스템 기본 폰트 또는 깔끔한 웹 폰트
  - 섹션 제목: 굵은 글씨 (bold) 또는 큰 폰트
  - 요약 정보: 가독성 있는 폰트 크기
- 간격 및 레이아웃:
  - 섹션 간 적절한 간격 유지
  - 카드 간 간격 유지
  - 여백과 패딩을 통한 가독성 확보
  - 반응형 디자인 고려 (화면 크기에 따른 조정)
  - 재고 카드는 가로 배열, 주문 카드는 세로 배열

4.2.8 상태 및 동작
- 데이터 로딩:
  - 페이지 로드 시 서버에서 재고 데이터 가져오기
  - 페이지 로드 시 서버에서 주문 데이터 가져오기
  - 대시보드 요약 정보 계산 및 표시
- 재고 조정:
  - +/- 버튼 클릭 시 재고 수량 변경
  - 재고 변경 시 즉시 UI 업데이트
  - 재고 변경 시 서버에 저장
  - 재고가 0 이하로 내려가지 않도록 제한 (선택사항)
- 주문 상태 변경:
  - 액션 버튼 클릭 시 주문 상태 변경
  - 상태 변경 시 즉시 UI 업데이트
  - 상태 변경 시 서버에 저장
  - 상태 변경 시 대시보드 요약 정보 업데이트
  - 상태별로 다른 액션 버튼 표시
- 주문 목록 관리:
  - 새로운 주문이 접수되면 주문 현황에 추가
  - 주문 상태에 따라 주문 목록 필터링 (선택사항)
  - 주문이 많을 경우 스크롤 가능
  - 주문 정렬 (최신순, 상태순 등) (선택사항)
- 실시간 업데이트:
  - 주문 상태 변경 시 즉시 반영
  - 재고 변경 시 즉시 반영
  - 대시보드 요약 정보 실시간 업데이트
  - 새 주문 접수 시 자동 업데이트 (폴링 또는 웹소켓) (선택사항)

5. 백엔드 개발 사양

5.1 데이터 모델

5.1.1 Menus (메뉴)
- id: 메뉴 고유 식별자 (Primary Key)
- name: 커피 이름 (예: "아메리카노(ICE)", "카페라떼")
- description: 메뉴 설명 (예: "에스프레소에 물을 넣어 만든 시원한 아이스 커피")
- price: 가격 (정수, 원화 단위)
- image: 이미지 URL 또는 이미지 경로
- stock: 재고 수량 (정수)
- created_at: 생성 일시
- updated_at: 수정 일시

5.1.2 Options (옵션)
- id: 옵션 고유 식별자 (Primary Key)
- name: 옵션 이름 (예: "샷 추가", "시럽 추가")
- price: 옵션 가격 (정수, 원화 단위, 0 이상)
- menu_id: 연결할 메뉴 ID (Foreign Key, Menus 테이블 참조)
- created_at: 생성 일시
- updated_at: 수정 일시

5.1.3 Orders (주문)
- id: 주문 고유 식별자 (Primary Key)
- order_date: 주문 일시 (날짜 및 시간)
- status: 주문 상태 (문자열)
  - 'pending': 주문 접수 대기
  - 'accepted': 주문 접수
  - 'preparing': 제조 중
  - 'completed': 제조 완료
- total_price: 총 주문 금액 (정수, 원화 단위)
- created_at: 생성 일시
- updated_at: 수정 일시

5.1.4 OrderItems (주문 항목)
- id: 주문 항목 고유 식별자 (Primary Key)
- order_id: 주문 ID (Foreign Key, Orders 테이블 참조)
- menu_id: 메뉴 ID (Foreign Key, Menus 테이블 참조)
- menu_name: 메뉴 이름 (주문 시점의 메뉴 이름 저장)
- quantity: 수량 (정수)
- unit_price: 단가 (정수, 주문 시점의 가격 저장)
- options: 선택된 옵션 정보 (JSON 형태 또는 별도 테이블)
  - 예: {"addShot": true, "addSyrup": false}
- item_total_price: 항목별 총 가격 (단가 × 수량 + 옵션 가격)
- created_at: 생성 일시

5.2 데이터 스키마를 위한 사용자 흐름

5.2.1 메뉴 조회 흐름
① 프런트엔드에서 '주문하기' 메뉴를 클릭하면 API를 통해 데이터베이스에서 커피 메뉴 목록을 조회합니다.
② Menus 테이블에서 모든 메뉴 정보(id, name, description, price, image)를 가져와 브라우저 화면에 표시합니다.
③ Menus 테이블의 stock(재고 수량) 정보는 관리자 화면에만 표시합니다.
④ 각 메뉴에 연결된 Options 정보도 함께 조회하여 옵션 선택 UI에 표시합니다.

5.2.2 주문 생성 흐름
① 사용자가 앱 화면에서 커피 메뉴를 선택하고 옵션을 선택한 후 장바구니에 담습니다.
② 장바구니에서 '주문하기' 버튼을 클릭하면 주문 정보를 Orders 테이블에 저장합니다.
③ Orders 테이블에 저장할 정보:
   - order_date: 주문 일시 (현재 시간)
   - status: 'accepted' (주문 접수 상태로 기본 설정)
   - total_price: 장바구니의 모든 항목 총 금액
④ OrderItems 테이블에 주문 내용을 저장합니다:
   - 각 장바구니 항목마다 하나의 OrderItem 레코드 생성
   - menu_id, menu_name, quantity, unit_price, options, item_total_price 저장
⑤ 주문이 생성되면 해당 메뉴의 재고(stock)를 차감합니다:
   - Menus 테이블에서 주문된 메뉴의 stock을 수량만큼 감소
   - 재고가 부족한 경우 주문 실패 처리 (에러 응답)

5.2.3 주문 현황 조회 흐름
① 관리자 화면의 '주문 현황' 섹션에서 Orders 테이블의 정보를 조회합니다.
② 주문의 기본 상태는 'accepted' (주문 접수)입니다.
③ 각 주문에 대해 다음 정보를 표시:
   - 주문 일시 (order_date)
   - 주문 내용 (OrderItems에서 조회: 메뉴명, 수량, 옵션, 금액)
   - 주문 상태 (status)
   - 총 금액 (total_price)
④ 주문 상태 변경:
   - '제조 시작' 버튼 클릭 시: status를 'preparing' (제조 중)으로 변경
   - '제조 완료' 버튼 클릭 시: status를 'completed' (제조 완료)로 변경
   - 상태 변경 시 Orders 테이블의 status 필드를 업데이트하고 updated_at을 갱신

5.2.4 재고 관리 흐름
① 관리자 화면의 '재고 현황' 섹션에서 Menus 테이블의 stock 정보를 조회합니다.
② 재고 증가/감소 버튼 클릭 시:
   - Menus 테이블의 해당 메뉴의 stock 값을 증가 또는 감소
   - 재고는 0 이하로 내려가지 않도록 제한
   - 재고 변경 시 updated_at을 갱신

5.3 API 설계

5.3.1 메뉴 관련 API

GET /api/menus
- 설명: 모든 메뉴 목록 조회
- 요청: 없음
- 응답:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "아메리카노(ICE)",
        "description": "에스프레소에 물을 넣어 만든 시원한 아이스 커피",
        "price": 4000,
        "image": "https://images.unsplash.com/...",
        "stock": 10,
        "options": [
          {
            "id": 1,
            "name": "샷 추가",
            "price": 500,
            "menu_id": 1
          },
          {
            "id": 2,
            "name": "시럽 추가",
            "price": 0,
            "menu_id": 1
          }
        ]
      }
    ]
  }
  ```
- 에러 응답:
  ```json
  {
    "success": false,
    "error": "메뉴 조회 실패"
  }
  ```

GET /api/menus/:id
- 설명: 특정 메뉴 상세 정보 조회
- 요청 파라미터:
  - id: 메뉴 ID
- 응답:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "아메리카노(ICE)",
      "description": "에스프레소에 물을 넣어 만든 시원한 아이스 커피",
      "price": 4000,
      "image": "https://images.unsplash.com/...",
      "stock": 10,
      "options": [...]
    }
  }
  ```

PUT /api/menus/:id/stock
- 설명: 메뉴 재고 수정 (관리자용)
- 요청 파라미터:
  - id: 메뉴 ID
- 요청 본문:
  ```json
  {
    "stock": 15
  }
  ```
- 응답:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "stock": 15
    }
  }
  ```

5.3.2 주문 관련 API

POST /api/orders
- 설명: 주문 생성
- 요청 본문:
  ```json
  {
    "items": [
      {
        "menu_id": 1,
        "menu_name": "아메리카노(ICE)",
        "quantity": 2,
        "unit_price": 4000,
        "options": {
          "addShot": true,
          "addSyrup": false
        },
        "item_total_price": 9000
      }
    ],
    "total_price": 9000
  }
  ```
- 응답:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "order_date": "2024-01-15T10:30:00Z",
      "status": "accepted",
      "total_price": 9000,
      "items": [...]
    }
  }
  ```
- 에러 응답 (재고 부족):
  ```json
  {
    "success": false,
    "error": "재고가 부족합니다",
    "menu_id": 1,
    "available_stock": 0
  }
  ```

GET /api/orders
- 설명: 모든 주문 목록 조회 (관리자용)
- 쿼리 파라미터 (선택):
  - status: 주문 상태로 필터링 (예: ?status=accepted)
- 응답:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "order_date": "2024-01-15T10:30:00Z",
        "status": "accepted",
        "total_price": 9000,
        "items": [
          {
            "id": 1,
            "menu_id": 1,
            "menu_name": "아메리카노(ICE)",
            "quantity": 2,
            "unit_price": 4000,
            "options": {
              "addShot": true,
              "addSyrup": false
            },
            "item_total_price": 9000
          }
        ]
      }
    ]
  }
  ```

GET /api/orders/:id
- 설명: 주문 ID로 특정 주문 정보 조회
- 요청 파라미터:
  - id: 주문 ID
- 응답:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "order_date": "2024-01-15T10:30:00Z",
      "status": "accepted",
      "total_price": 9000,
      "items": [...]
    }
  }
  ```
- 에러 응답:
  ```json
  {
    "success": false,
    "error": "주문을 찾을 수 없습니다"
  }
  ```

PUT /api/orders/:id/status
- 설명: 주문 상태 변경 (관리자용)
- 요청 파라미터:
  - id: 주문 ID
- 요청 본문:
  ```json
  {
    "status": "preparing"
  }
  ```
- 응답:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "status": "preparing",
      "updated_at": "2024-01-15T10:35:00Z"
    }
  }
  ```
- 유효한 status 값: 'pending', 'accepted', 'preparing', 'completed'

5.3.3 API 공통 사양

응답 형식:
- 성공 시: `{ "success": true, "data": ... }`
- 실패 시: `{ "success": false, "error": "에러 메시지" }`

HTTP 상태 코드:
- 200: 성공
- 201: 생성 성공 (POST)
- 400: 잘못된 요청
- 404: 리소스를 찾을 수 없음
- 500: 서버 오류

에러 처리:
- 모든 API는 적절한 에러 메시지와 HTTP 상태 코드를 반환해야 합니다.
- 데이터베이스 오류, 유효성 검사 실패 등에 대한 명확한 에러 메시지를 제공합니다.

5.4 데이터베이스 스키마 예시

```sql
-- Menus 테이블
CREATE TABLE menus (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image VARCHAR(500),
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Options 테이블
CREATE TABLE options (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders 테이블
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) NOT NULL DEFAULT 'accepted',
  total_price INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OrderItems 테이블
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_id INTEGER REFERENCES menus(id),
  menu_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL,
  options JSONB,
  item_total_price INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_order_date ON orders(order_date);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_menu_id ON order_items(menu_id);
CREATE INDEX idx_options_menu_id ON options(menu_id);
```

5.5 비즈니스 로직 규칙

5.5.1 주문 생성 시 규칙
- 주문 생성 시 주문된 메뉴의 재고를 즉시 차감합니다.
- 재고가 부족한 경우 주문을 생성하지 않고 에러를 반환합니다.
- 주문 상태는 기본적으로 'accepted' (주문 접수)로 설정됩니다.
- 주문 일시는 서버 시간을 사용합니다.

5.5.2 재고 관리 규칙
- 재고는 0 이상의 값만 허용합니다.
- 재고 감소 시 0 이하로 내려가지 않도록 제한합니다.
- 관리자가 재고를 수동으로 조정할 수 있습니다.

5.5.3 주문 상태 변경 규칙
- 주문 상태는 다음 순서로만 변경 가능합니다:
  - 'accepted' → 'preparing' → 'completed'
- 상태 변경은 역순으로 되돌릴 수 없습니다 (예: 'completed' → 'preparing' 불가).
- 주문 상태 변경 시 updated_at을 갱신합니다.

5.5.4 데이터 무결성
- OrderItems는 Orders와 함께 삭제됩니다 (CASCADE).
- Options는 연결된 Menu가 삭제되면 함께 삭제됩니다 (CASCADE).
- 주문 시점의 메뉴 정보(이름, 가격)는 OrderItems에 저장하여 메뉴 정보가 변경되어도 주문 내역은 유지됩니다.