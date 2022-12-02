export type HotelData = {
  id: string;
  name: string;
  price: string;
  image: string;
  category?: string;
};

export type HotelDetail = {
  caption: string;
  name: string;
  location: string;
  rating: number;
};

export type History = {
  checkIn: Date;
  checkOut: Date;
  hotel: HotelData;
  guests: number;
  rooms: number;
  bookDate: Date;
};
