// 에러 핸들링 미들웨어
export const errorHandler = (err, req, res, next) => {
  console.error('에러 발생:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.url,
    method: req.method
  });

  // 데이터베이스 오류 처리
  if (err.code === '23505') { // Unique violation
    return res.status(409).json({
      success: false,
      error: '중복된 데이터입니다.'
    });
  }

  if (err.code === '23503') { // Foreign key violation
    return res.status(400).json({
      success: false,
      error: '참조 무결성 오류가 발생했습니다.'
    });
  }

  // 기본 에러 응답
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || '서버 내부 오류가 발생했습니다.'
  });
};

// 404 핸들러
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: `요청한 경로 ${req.originalUrl}를 찾을 수 없습니다.`
  });
};

