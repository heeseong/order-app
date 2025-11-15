import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRoutes from './routes/index.js';
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

// API 라우트 (추후 추가 예정)
// app.use('/api/menus', menuRoutes);
// app.use('/api/orders', orderRoutes);

// 404 핸들러
app.use(notFoundHandler);

// 에러 핸들러
app.use(errorHandler);

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`환경: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

