export interface IStat {
  totalUsers: number;
  activeUsersByDays: {
    date: string;
    count: number;
  }[];
  pageClicks: {
    url: string;
    clicks: number;
  }[];
}

export interface IStateResponse {
  data?: { message: string; data: IStat };
  success: boolean;
  message: string;
}
