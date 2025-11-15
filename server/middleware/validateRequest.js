// 요청 유효성 검사 미들웨어
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // 모든 오류를 수집
      stripUnknown: true // 알 수 없는 필드 제거
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        error: '요청 데이터 유효성 검사 실패',
        details: errors
      });
    }

    req.validatedData = value;
    next();
  };
};

