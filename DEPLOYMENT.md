# Render.com 배포 가이드

이 문서는 커피 주문 앱을 Render.com에 배포하는 방법을 설명합니다.

## 📋 사전 준비사항

- GitHub 계정 및 저장소
- Render.com 계정 ([https://render.com](https://render.com)에서 무료 가입)
- Node.js 및 npm 설치 (로컬에서 테스트용)

## 🚀 배포 순서 요약

1. **GitHub 저장소 준비** → 프로젝트를 GitHub에 푸시
2. **PostgreSQL 데이터베이스 생성** → Render에서 PostgreSQL 서비스 생성
3. **백엔드 서버 배포** → Render에서 Web Service로 배포
4. **데이터베이스 초기화** → 테이블 생성 및 초기 데이터 삽입
5. **프런트엔드 배포** → Render에서 Static Site로 배포

## 📝 상세 배포 순서

### 1단계: GitHub 저장소 준비

1. 프로젝트를 GitHub에 푸시합니다.
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

### 2단계: PostgreSQL 데이터베이스 생성 (Render)

1. Render.com 대시보드에 로그인
2. **New +** 버튼 클릭 → **PostgreSQL** 선택
3. 설정:
   - **Name**: `coffee-order-db` (또는 원하는 이름)
   - **Database**: `coffee_order_db`
   - **User**: 자동 생성됨
   - **Region**: 가장 가까운 지역 선택 (예: `Singapore`)
   - **PostgreSQL Version**: 최신 버전 선택
   - **Plan**: Free 플랜 선택 (또는 원하는 플랜)
4. **Create Database** 클릭
5. 데이터베이스가 생성되면, **Connection** 탭에서 다음 정보를 확인:
   - **Internal Database URL**: 백엔드 서버에서 사용
   - **External Database URL**: 로컬 개발용 (선택사항)

**중요**: `DATABASE_URL` 환경 변수를 복사해 두세요.

### 3단계: 백엔드 서버 배포 (Render)

1. Render.com 대시보드에서 **New +** 버튼 클릭 → **Web Service** 선택
2. GitHub 저장소 연결:
   - 저장소를 선택하거나 연결
   - **Branch**: `main` (또는 사용하는 브랜치)
   - **Root Directory**: `server` (백엔드 서버 폴더)
3. 기본 설정:
   - **Name**: `coffee-order-api` (또는 원하는 이름)
   - **Environment**: `Node`
   - **Region**: 데이터베이스와 같은 지역 선택
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. 환경 변수 설정 (Environment Variables):
   ```
   NODE_ENV=production
   ```
   
   **DATABASE_URL 설정:**
   - Render 대시보드에서 데이터베이스 → **Info** 탭 클릭
   - **Internal Database URL** 복사
   - 서버의 환경 변수에 `DATABASE_URL` 추가하고 복사한 URL 붙여넣기
   
   > **참고**: Render의 PostgreSQL은 `DATABASE_URL`을 제공합니다. 이 변수만 설정하면 됩니다.
   > 
   > **참고 2**: `PORT` 환경 변수는 설정하지 않아도 됩니다. Render가 자동으로 `PORT` 환경 변수를 제공합니다.
   
5. **Create Web Service** 클릭
6. 서버가 배포되면 URL 확인 (예: `https://coffee-order-api.onrender.com`)

### 4단계: 데이터베이스 초기화

1. 서버 배포가 완료되면, Render 대시보드에서 서버의 **Shell** 탭 열기
2. 다음 명령 실행:
   ```bash
   cd server
   npm run db:init
   ```
   
   또는 로컬에서 데이터베이스를 초기화하려면:
   ```bash
   # 환경 변수 설정
   export DATABASE_URL=<Render에서 제공한 Internal Database URL>
   
   # 데이터베이스 초기화
   cd server
   npm run db:init
   ```

   > **참고**: 첫 번째 배포 시에만 필요합니다. 이미 데이터가 있는 경우 실행하지 마세요.

### 5단계: 프런트엔드 배포 (Render)

**옵션 A: Static Site로 배포 (권장)**

1. Render.com 대시보드에서 **New +** 버튼 클릭 → **Static Site** 선택
2. GitHub 저장소 연결
3. 설정:
   - **Name**: `coffee-order-frontend`
   - **Branch**: `main`
   - **Root Directory**: `UI`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. 환경 변수 설정:
   ```
   VITE_API_URL=<백엔드 서버 URL>
   ```
   예: `VITE_API_URL=https://coffee-order-api.onrender.com`
   
   > **참고**: URL에는 프로토콜과 호스트만 포함하면 됩니다 (예: `https://coffee-order-api.onrender.com`)
   > `/api` 경로는 자동으로 추가됩니다.
5. **Create Static Site** 클릭

**옵션 B: Web Service로 배포**

1. Render.com 대시보드에서 **New +** 버튼 클릭 → **Web Service** 선택
2. GitHub 저장소 연결
3. 설정:
   - **Name**: `coffee-order-frontend`
   - **Environment**: `Node`
   - **Region**: 백엔드와 같은 지역
   - **Branch**: `main`
   - **Root Directory**: `UI`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s dist -l 10000`
4. 환경 변수 설정:
   ```
   VITE_API_URL=<백엔드 서버 URL>
   ```
5. **Create Web Service** 클릭

### 6단계: 프런트엔드 API URL 업데이트

프런트엔드가 배포된 백엔드 URL을 사용하도록 설정되었는지 확인합니다.
`UI/src/api.js` 파일이 환경 변수를 사용하도록 이미 수정되었습니다.

## 중요 사항

### 무료 플랜 제한사항

- **Sleeping**: 15분간 트래픽이 없으면 서비스가 잠들 수 있습니다.
- **Cold Start**: 첫 요청 시 약 30초 소요될 수 있습니다.
- **데이터베이스**: 90일 무료 체험 후 자동 삭제될 수 있습니다.

### 프로덕션 환경 변수

배포 전에 다음 환경 변수들을 확인하세요:

**백엔드:**
- `NODE_ENV=production`
- `DATABASE_URL` (Render PostgreSQL에서 제공)
- `PORT` (Render가 자동 할당, 환경 변수는 선택사항)

**프런트엔드:**
- `VITE_API_URL` (백엔드 서버의 전체 URL)

### 데이터베이스 백업

정기적으로 데이터베이스를 백업하는 것을 권장합니다.
Render 대시보드에서 데이터베이스 → **Backups** 탭에서 수동 백업 가능합니다.

## ⚙️ Render Blueprint 사용 (선택사항)

`render.yaml` 파일을 사용하면 한 번에 모든 서비스를 배포할 수 있습니다.

1. GitHub에 `render.yaml` 파일이 있는지 확인
2. Render 대시보드에서 **New +** → **Blueprint** 선택
3. GitHub 저장소 연결
4. **Apply** 클릭
5. 환경 변수 확인 및 조정
6. **Apply** 클릭하여 배포 시작

> **참고**: Blueprint를 사용하면 자동으로 서비스 간 연결이 설정되지만, 데이터베이스 초기화는 수동으로 해야 합니다.

## 🔧 트러블슈팅

### 서버가 시작되지 않는 경우

1. **Logs** 탭에서 에러 확인
2. 환경 변수가 올바르게 설정되었는지 확인
3. 데이터베이스 연결이 정상인지 확인

### 프런트엔드가 API를 호출하지 못하는 경우

1. CORS 설정 확인 (`server/server.js`)
2. `VITE_API_URL` 환경 변수가 올바르게 설정되었는지 확인
3. 브라우저 개발자 도구의 Network 탭에서 에러 확인

### 데이터베이스 연결 오류

1. `DATABASE_URL`이 올바른지 확인
2. 데이터베이스가 같은 지역에 있는지 확인
3. Internal Database URL을 사용하는지 확인 (External URL은 외부에서만 사용)

## 추가 리소스

- [Render 문서](https://render.com/docs)
- [Render PostgreSQL 가이드](https://render.com/docs/databases)
- [Render Node.js 배포](https://render.com/docs/node-version)

