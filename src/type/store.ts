export type StoreCardProps = {
  cafe_id: number;
  cafe_name: string;
  address: string;
  description: string;
  operating_hours: string;
  cafe_image_url: string;
};

// type/cafe.ts
export type MenuItem = {
  item_id: number;
  item_name: string;
  price: number;
  description: string;
  category: string;
  item_image_url: string;
};

export type CafeDetail = {
  cafe_id: number;
  cafe_name: string;
  address: string;
  phone_number: string;
  description: string;
  operating_hours: string;
  cafe_image_url: string;
  items: MenuItem[];
};

export type OwnerCafe = {
  cafe_id: number;
  cafe_name: string;
  address: string;
  cafe_image_url: string;
};

// GET /owner/cafes 의 응답 타입
export type OwnerCafeListResponse = OwnerCafe[];

//수정
export type UpdateMenuItemRequest = {
  item_name?: string;
  price?: number;
  description?: string;
  category?: string;
  item_image_url?: string;
};

export type UpdateMenuItemResponse = {
  item_id: number;
  cafe_id: number;
};

// 메뉴 추가
export type CreateMenuItemRequest = {
  item_name: string;
  price: number;
  description: string;
  category: string;
  item_image_url: string;
};

export type CreateMenuItemResponse = {
  item_id: number;
  cafe_id: number;
  item_name: string;
};

// src/type/cafe.ts
export type CreateCafeRequest = {
  cafe_name: string;
  address: string;
  phone_number: string;
  description: string;
  operating_hours: string;
  cafe_image_url: string;
};

export type CreateCafeResponse = {
  cafe_id: number;
  cafe_name: string;
  owner_id: number;
};
