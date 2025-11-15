import pool, { query } from '../config/database.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 데이터베이스 초기화 함수
async function initDatabase() {
  try {
    console.log('데이터베이스 초기화를 시작합니다...');

    // 스키마 파일 읽기
    const schemaPath = join(__dirname, 'schema.sql');
    const schemaSQL = readFileSync(schemaPath, 'utf-8');

    // 스키마 실행
    console.log('테이블 생성 중...');
    await query(schemaSQL);
    console.log('✓ 테이블 생성 완료');

    // 시드 데이터 삽입
    const seedPath = join(__dirname, 'seed.sql');
    const seedSQL = readFileSync(seedPath, 'utf-8');

    console.log('초기 데이터 삽입 중...');
    await query(seedSQL);
    console.log('✓ 초기 데이터 삽입 완료');

    console.log('데이터베이스 초기화가 완료되었습니다!');
  } catch (error) {
    console.error('데이터베이스 초기화 중 오류 발생:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// 스크립트로 직접 실행될 때
const isMainModule = import.meta.url === `file://${process.argv[1]}` || 
                     process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));

if (isMainModule || process.argv[1]?.includes('init.js')) {
  initDatabase()
    .then(() => {
      console.log('초기화 성공');
      process.exit(0);
    })
    .catch((error) => {
      console.error('초기화 실패:', error);
      process.exit(1);
    });
}

export default initDatabase;

