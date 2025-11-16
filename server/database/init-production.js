import pool, { query } from '../config/database.js';

async function initProductionDatabase() {
  try {
    console.log('프로덕션 데이터베이스 초기화를 시작합니다...');
    
    // 테이블 생성
    const schemaPath = new URL('schema.sql', import.meta.url);
    const schemaSQL = await fetch(schemaPath).then(res => res.text());
    console.log('테이블 생성 중...');
    await query(schemaSQL);
    console.log('✓ 테이블 생성 완료');

    // 초기 데이터 삽입
    const seedPath = new URL('seed.sql', import.meta.url);
    const seedSQL = await fetch(seedPath).then(res => res.text());
    console.log('초기 데이터 삽입 중...');
    await query(seedSQL);
    console.log('✓ 초기 데이터 삽입 완료');
    
    console.log('프로덕션 데이터베이스 초기화가 완료되었습니다!');
  } catch (error) {
    console.error('데이터베이스 초기화 중 오류 발생:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

initProductionDatabase()
  .then(() => {
    console.log('초기화 성공');
    process.exit(0);
  })
  .catch((error) => {
    console.error('초기화 실패:', error);
    process.exit(1);
  });

