// src/mock/ownerCafes.ts

import type { OwnerCafe } from "../type/store";

export const dummyOwnerCafes: OwnerCafe[] = [
  {
    cafe_id: 1,
    cafe_name: "커피스미스",
    address: "서울시 마포구 어딘가 12",
    cafe_image_url:
      "https://images.pexels.com/photos/3736397/pexels-photo-3736397.jpeg",
  },
  {
    cafe_id: 2,
    cafe_name: "카페모먼트",
    address: "서울시 성동구 어디로 45",
    cafe_image_url:
      "https://images.pexels.com/photos/3736392/pexels-photo-3736392.jpeg",
  },
  {
    cafe_id: 3,
    cafe_name: "어반부루",
    address: "서울시 강남구 카페길 101",
    cafe_image_url:
      "https://images.pexels.com/photos/3806434/pexels-photo-3806434.jpeg",
  },
];
