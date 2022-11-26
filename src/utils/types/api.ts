// Responses
export type CounterGetResponse = {
  value: number;
};

export type City = {
  city: string;
  state: string;
  occupancy: number;
  total_listing: number;
  acc_listing: number;
};

export type ApiParams = {
  page: number;
  items: number;
  state: string;
};

export type ApiResponse = {
  status: string;
  content: {
    input: ApiParams;
    total_page_results: number;
    cities: City[];
  };
};
