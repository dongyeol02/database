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
