import type {
  CafeDetail,
  CafeListItem,
  CreateCafeRequest,
  CreateCafeResponse,
  CreateMenuItemRequest,
  CreateMenuItemResponse,
  MenuItem,
  OwnerCafeListResponse,
  UpdateMenuItemRequest,
  UpdateMenuItemResponse,
} from "../type/store";
import { Api } from "./authApi";
// 하나의 카페 정보 조회
export const getCafeDetail = async (cafeId: number): Promise<CafeDetail> => {
  console.log(`📍 GET /cafes/${cafeId} 호출`);
  const res = await Api.get(`/cafes/${cafeId}`);
  console.log("✅ 카페 상세 응답:", res.data);
  return res.data;
};
// 카페 리스트 가져오기
export const getCafeList = async (): Promise<CafeListItem[]> => {
  const res = await Api.get("/cafes");
  return res.data;
};
// 내 카페 조회
export const getOwnerCafesMe = async (
  userId: number
): Promise<OwnerCafeListResponse> => {
  const res = await Api.get("/cafes/owner/me", {
    headers: {
      "X-USER-ID": String(userId),
    },
  });
  return res.data;
};
//카페 생성
export const createCafe = async (
  userId: number,
  body: CreateCafeRequest
): Promise<CreateCafeResponse> => {
  // 서버는 snake_case JSON을 camelCase DTO에 매핑하는 설정임
  const payload = {
    cafe_name: body.cafe_name,
    address: body.address,
    phone_number: body.phone_number,
    description: body.description,
    operating_hours: body.operating_hours,
    cafe_image_url: body.cafe_image_url,
  };

  console.log("POST /cafes payload:", payload);

  const res = await Api.post("/cafes", payload, {
    headers: {
      "Content-Type": "application/json",
      "X-USER-ID": String(userId),
    },
  });
  return res.data;
};

//메뉴수정
export const updateMenuItem = async (
  userId: number,
  itemId: number,
  body: UpdateMenuItemRequest
): Promise<UpdateMenuItemResponse> => {
  // 여기서 snake_case로 보냄
  const payload = {
    item_name: body.item_name,
    price: body.price,
    description: body.description,
    category: body.category,
    item_image_url: body.item_image_url,
  };

  console.log("PUT /cafes/menus/:itemId payload:", itemId, payload);

  const res = await Api.put(`/cafes/menus/${itemId}`, payload, {
    headers: {
      "Content-Type": "application/json",
      "X-USER-ID": String(userId),
    },
  });

  return res.data;
};

//메뉴리스트 가져오기
export const getCafeMenus = async (cafeId: number): Promise<MenuItem[]> => {
  const res = await Api.get(`/cafes/${cafeId}/menus`);
  return res.data;
};

//메뉴 추가
export const createMenuItem = async (
  userId: number,
  cafeId: number,
  body: CreateMenuItemRequest
): Promise<CreateMenuItemResponse> => {
  const payload = {
    item_name: body.item_name,
    price: body.price,
    description: body.description,
    category: body.category,
    item_image_url: body.item_image_url,
  };

  console.log("POST /cafes/:cafeId/menus payload:", cafeId, payload);

  const res = await Api.post(`/cafes/${cafeId}/menus`, payload, {
    headers: {
      "Content-Type": "application/json",
      "X-USER-ID": String(userId),
    },
  });

  return res.data;
};
