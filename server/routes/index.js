import express from 'express';

const router = express.Router();

// API 상태 확인
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API 서버가 정상적으로 동작 중입니다.',
    timestamp: new Date().toISOString()
  });
});

export default router;

