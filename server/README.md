# 커피 주문 앱 백엔드 서버

Express.js와 PostgreSQL을 사용한 커피 주문 앱의 백엔드 서버입니다.

## 기술 스택

- **Node.js**: JavaScript 런타임
- **Express.js**: 웹 애플리케이션 프레임워크
- **PostgreSQL**: 관계형 데이터베이스
- **pg**: PostgreSQL 클라이언트

## 프로젝트 구조

```
server/
├── config/          # 설정 파일 (데이터베이스 연결 등)
├── controllers/     # 컨트롤러 (비즈니스 로직)
├── models/         # 데이터 모델
├── routes/          # 라우트 정의
├── middleware/      # 미들웨어
├── server.js        # 서버 진입점
├── package.json     # 의존성 관리
└── .env            # 환경 변수 (git에 포함하지 않음)
```

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 참고하여 `.env` 파일을 생성하고 데이터베이스 정보를 입력하세요.

```bash
cp .env.example .env
```

`.env` 파일을 열어서 데이터베이스 설정을 수정하세요:

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=coffee_order_db
DB_USER=postgres
DB_PASSWORD=your_password
```

### 3. 데이터베이스 설정

PostgreSQL 데이터베이스를 생성하고, `docs/PRD.md`의 5.4 섹션에 있는 SQL 스키마를 실행하세요.

### 4. 서버 실행

**개발 모드** (nodemon 사용, 파일 변경 시 자동 재시작):
```bash
npm run dev
```

**프로덕션 모드**:
```bash
npm start
```

서버가 성공적으로 시작되면 `http://localhost:3000`에서 접근할 수 있습니다.

## API 엔드포인트

API 엔드포인트는 `docs/PRD.md`의 5.3 섹션을 참고하세요.

### 메뉴 관련
- `GET /api/menus` - 모든 메뉴 목록 조회
- `GET /api/menus/:id` - 특정 메뉴 상세 정보 조회
- `PUT /api/menus/:id/stock` - 메뉴 재고 수정

### 주문 관련
- `POST /api/orders` - 주문 생성
- `GET /api/orders` - 모든 주문 목록 조회
- `GET /api/orders/:id` - 특정 주문 정보 조회
- `PUT /api/orders/:id/status` - 주문 상태 변경

## 개발 가이드

### 폴더별 역할

- **config/**: 데이터베이스 연결 설정 등
- **controllers/**: 각 엔드포인트의 비즈니스 로직 처리
- **models/**: 데이터베이스 쿼리 함수
- **routes/**: API 라우트 정의 및 컨트롤러 연결
- **middleware/**: 인증, 에러 처리 등 공통 미들웨어

### 코드 스타일

- ES6 모듈 문법 사용 (`import`/`export`)
- 비동기 처리는 `async/await` 사용
- 에러 처리는 try-catch 사용

## 문제 해결

### 포트가 이미 사용 중인 경우

`.env` 파일에서 `PORT` 값을 다른 포트로 변경하세요.

### 데이터베이스 연결 오류

1. PostgreSQL이 실행 중인지 확인
2. `.env` 파일의 데이터베이스 정보가 올바른지 확인
3. 데이터베이스가 생성되었는지 확인

