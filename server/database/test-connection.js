import pool from '../config/database.js';

// 데이터베이스 연결 테스트
async function testConnection() {
  try {
    console.log('데이터베이스 연결 테스트 중...');
    const result = await pool.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✓ 데이터베이스 연결 성공!');
    console.log('현재 시간:', result.rows[0].current_time);
    console.log('PostgreSQL 버전:', result.rows[0].pg_version.split('\n')[0]);
    
    // 테이블 존재 확인
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    if (tablesResult.rows.length > 0) {
      console.log('\n생성된 테이블:');
      tablesResult.rows.forEach(row => {
        console.log(`  - ${row.table_name}`);
      });
    } else {
      console.log('\n⚠ 테이블이 없습니다. 데이터베이스를 초기화하세요: npm run db:init');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('✗ 데이터베이스 연결 실패:', error.message);
    console.error('\n확인 사항:');
    console.error('1. PostgreSQL이 실행 중인지 확인하세요');
    console.error('2. .env 파일의 데이터베이스 설정이 올바른지 확인하세요');
    console.error('3. 데이터베이스가 생성되었는지 확인하세요');
    process.exit(1);
  } finally {
    await pool.end();
  }
}

testConnection();

