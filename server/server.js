import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRoutes from './routes/index.js';
import menuRoutes from './routes/menus.js';
import orderRoutes from './routes/orders.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// 환경 변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors()); // CORS 허용 (프런트엔드와 통신을 위해)
app.use(express.json()); // JSON 요청 본문 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 요청 본문 파싱

// 기본 라우트
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '커피 주문 앱 API 서버',
    version: '1.0.0'
  });
});

// API 라우트
app.use('/api', indexRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/orders', orderRoutes);

// 404 핸들러
app.use(notFoundHandler);

// 에러 핸들러
app.use(errorHandler);

// 서버 시작
const server = app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`환경: ${process.env.NODE_ENV || 'development'}`);
});

// 포트 충돌 에러 처리
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\n❌ 포트 ${PORT}가 이미 사용 중입니다.`);
    console.error(`다음 중 하나를 시도하세요:`);
    console.error(`1. 포트 ${PORT}를 사용하는 프로세스를 종료하세요`);
    console.error(`   Windows: netstat -ano | findstr :${PORT}`);
    console.error(`   그 다음: taskkill /F /PID [프로세스ID]`);
    console.error(`2. .env 파일에서 다른 포트 번호를 설정하세요 (예: PORT=3001)`);
    process.exit(1);
  } else {
    console.error('서버 시작 오류:', error);
    process.exit(1);
  }
});

export default app;

