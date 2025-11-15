# 데이터베이스 설정 가이드

## 1. PostgreSQL 데이터베이스 생성

PostgreSQL이 설치되어 있다면, 다음 방법 중 하나로 데이터베이스를 생성하세요.

### 방법 1: psql 명령어 사용

```bash
# PostgreSQL에 접속
psql -U postgres

# 데이터베이스 생성
CREATE DATABASE coffee_order_db;

# 종료
\q
```

### 방법 2: pgAdmin 사용

1. pgAdmin을 실행합니다
2. 서버에 연결합니다 (localhost)
3. "Databases"를 우클릭하고 "Create" > "Database..."를 선택합니다
4. Database name에 `coffee_order_db`를 입력하고 저장합니다

## 2. 환경 변수 확인

`server/.env` 파일이 올바르게 설정되어 있는지 확인하세요:

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=coffee_order_db
DB_USER=postgres
DB_PASSWORD=@surrey07
```

## 3. 데이터베이스 연결 테스트

```bash
cd server
npm run db:test
```

연결이 성공하면 다음 메시지가 표시됩니다:
```
✓ 데이터베이스 연결 성공!
```

## 4. 데이터베이스 초기화 (테이블 생성 및 초기 데이터 삽입)

```bash
cd server
npm run db:init
```

이 명령어는 다음을 수행합니다:
- 모든 테이블 생성 (menus, options, orders, order_items)
- 인덱스 생성
- 트리거 생성 (updated_at 자동 업데이트)
- 초기 메뉴 데이터 삽입
- 초기 옵션 데이터 삽입

## 5. 확인

초기화가 완료되면 다시 연결 테스트를 실행하여 테이블이 생성되었는지 확인하세요:

```bash
npm run db:test
```

다음과 같은 출력이 보이면 성공입니다:
```
✓ 데이터베이스 연결 성공!
생성된 테이블:
  - menus
  - options
  - order_items
  - orders
```

## 문제 해결

### "데이터베이스를 찾을 수 없습니다" 오류

- PostgreSQL이 실행 중인지 확인하세요
- 데이터베이스가 생성되었는지 확인하세요 (`psql -U postgres -l` 명령어로 확인)
- `.env` 파일의 `DB_NAME`이 올바른지 확인하세요

### "인증 실패" 오류

- `.env` 파일의 `DB_USER`와 `DB_PASSWORD`가 올바른지 확인하세요
- PostgreSQL의 사용자 권한을 확인하세요

### "연결할 수 없습니다" 오류

- PostgreSQL 서비스가 실행 중인지 확인하세요
- `.env` 파일의 `DB_HOST`와 `DB_PORT`가 올바른지 확인하세요
- 방화벽 설정을 확인하세요

