import pool, { query } from '../config/database.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 시드 데이터만 삽입하는 함수
async function seedDatabase() {
  try {
    console.log('초기 데이터 삽입을 시작합니다...');

    // 시드 데이터 파일 읽기
    const seedPath = join(__dirname, 'seed.sql');
    const seedSQL = readFileSync(seedPath, 'utf-8');

    console.log('초기 데이터 삽입 중...');
    await query(seedSQL);
    console.log('✓ 초기 데이터 삽입 완료');

    console.log('데이터 삽입이 완료되었습니다!');
  } catch (error) {
    console.error('데이터 삽입 중 오류 발생:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// 스크립트로 직접 실행될 때
seedDatabase()
  .then(() => {
    console.log('시드 데이터 삽입 성공');
    process.exit(0);
  })
  .catch((error) => {
    console.error('시드 데이터 삽입 실패:', error);
    process.exit(1);
  });

