-- 초기 데이터 삽입 (시드 데이터)

-- 메뉴 데이터 삽입
INSERT INTO menus (name, description, price, image, stock) VALUES
('아메리카노(ICE)', '에스프레소에 물을 넣어 만든 시원한 아이스 커피', 4000, 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop', 10),
('아메리카노(HOT)', '에스프레소에 물을 넣어 만든 따뜻한 커피', 4000, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop', 10),
('카페라떼', '에스프레소에 스팀밀크를 넣은 부드러운 라떼', 5000, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop', 10),
('카푸치노', '에스프레소에 우유와 우유거품을 넣은 카푸치노', 5500, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop', 10),
('카라멜 마키아토', '카라멜 시럽이 들어간 달콤한 마키아토', 6000, 'https://images.unsplash.com/photo-1570968914863-9a1008442c8a?w=400&h=300&fit=crop', 10),
('바닐라 라떼', '바닐라 시럽이 들어간 달콤한 라떼', 5500, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop', 10)
ON CONFLICT DO NOTHING;

-- 옵션 데이터 삽입 (모든 메뉴에 공통 옵션)
INSERT INTO options (name, price, menu_id)
SELECT '샷 추가', 500, id FROM menus
ON CONFLICT DO NOTHING;

INSERT INTO options (name, price, menu_id)
SELECT '시럽 추가', 0, id FROM menus
ON CONFLICT DO NOTHING;

