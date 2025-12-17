import storeImg from "../assets/store.png";
import type { CafeDetail } from "../type/store";

export const dummyStores = [
  {
    cafe_id: 1,
    cafe_name: "브라운빈 카페",
    address: "서울시 강남구 테헤란로 123",
    description: "핸드드립과 싱글 오리진이 유명한 스페셜티 카페",
    operating_hours: "매일 09:00 - 22:00",
    cafe_image_url: storeImg,
  },
  {
    cafe_id: 2,
    cafe_name: "모닝라떼",
    address: "서울시 마포구 연남동 45-1",
    description: "브런치와 라떼 아트로 인기 많은 카페",
    operating_hours: "평일 08:00 - 21:00 / 주말 10:00 - 22:00",
    cafe_image_url: storeImg,
  },
  {
    cafe_id: 3,
    cafe_name: "라이트로스트",
    address: "서울시 성동구 성수이로 77",
    description: "라이트 로스팅 원두와 화사한 인테리어가 특징",
    operating_hours: "매일 10:00 - 21:00",
    cafe_image_url: storeImg,
  },
  {
    cafe_id: 4,
    cafe_name: "카페 데이브레이크",
    address: "서울시 종로구 종로 11",
    description: "출근길 테이크아웃 손님이 많은 에스프레소 바",
    operating_hours: "평일 07:30 - 20:00 / 주말 휴무",
    cafe_image_url: storeImg,
  },
  {
    cafe_id: 5,
    cafe_name: "미드나잇 브루",
    address: "서울시 용산구 이태원로 55",
    description: "늦은 밤까지 운영하는 시그니처 콜드브루 전문점",
    operating_hours: "매일 12:00 - 01:00",
    cafe_image_url: storeImg,
  },
  {
    cafe_id: 6,
    cafe_name: "그린빈 라운지",
    address: "서울시 서초구 서초대로 201",
    description: "식물 인테리어와 디카페인 메뉴가 인기인 카페",
    operating_hours: "매일 09:00 - 21:30",
    cafe_image_url: storeImg,
  },
];

// mock/cafe.ts

export const dummyCafeDetail: CafeDetail = {
  cafe_id: 1,
  cafe_name: "브라운빈 카페",
  address: "서울시 강남구 테헤란로 123",
  phone_number: "02-123-4567",
  description: "핸드드립과 싱글 오리진이 유명한 스페셜티 카페입니다.",
  operating_hours: "매일 09:00 - 22:00",
  cafe_image_url: storeImg,
  items: [
    // 커피
    {
      item_id: 1,
      item_name: "아메리카노",
      price: 4500,
      description: "싱글 오리진 원두로 추출한 기본 에스프레소 음료",
      category: "커피",
      item_image_url: "https://via.placeholder.com/120x120?text=Americano",
    },
    {
      item_id: 2,
      item_name: "카페라떼",
      price: 5500,
      description: "부드러운 우유와 조화로운 라떼",
      category: "커피",
      item_image_url: "https://via.placeholder.com/120x120?text=Latte",
    },
    {
      item_id: 3,
      item_name: "바닐라 라떼",
      price: 5800,
      description: "달콤한 바닐라 시럽이 들어간 부드러운 라떼",
      category: "커피",
      item_image_url: "https://via.placeholder.com/120x120?text=Vanilla+Latte",
    },

    // 논커피
    {
      item_id: 4,
      item_name: "초코 라떼",
      price: 5800,
      description: "진한 코코아와 우유가 어우러진 달콤한 초코 음료",
      category: "논커피",
      item_image_url: "https://via.placeholder.com/120x120?text=Choco+Latte",
    },
    {
      item_id: 5,
      item_name: "말차 라떼",
      price: 6000,
      description: "부드러운 우유와 진한 말차의 조화",
      category: "논커피",
      item_image_url: "https://via.placeholder.com/120x120?text=Matcha+Latte",
    },

    // 디저트
    {
      item_id: 6,
      item_name: "뉴욕 치즈케이크",
      price: 6500,
      description: "꾸덕한 식감의 클래식 치즈케이크",
      category: "디저트",
      item_image_url: "https://via.placeholder.com/120x120?text=Cheesecake",
    },
    {
      item_id: 7,
      item_name: "초코 브라우니",
      price: 5200,
      description: "진한 초콜릿이 가득한 수제 브라우니",
      category: "디저트",
      item_image_url: "https://via.placeholder.com/120x120?text=Brownie",
    },

    // 스페셜
    {
      item_id: 8,
      item_name: "콜드브루 시그니처",
      price: 6000,
      description: "12시간 이상 더치 방식으로 추출한 시그니처 콜드브루",
      category: "스페셜",
      item_image_url: "https://via.placeholder.com/120x120?text=Cold+Brew",
    },
    {
      item_id: 9,
      item_name: "시나몬 라떼",
      price: 6200,
      description: "시나몬 파우더와 시럽이 들어간 향긋한 라떼",
      category: "스페셜",
      item_image_url: "https://via.placeholder.com/120x120?text=Cinnamon+Latte",
    },
  ],
};
