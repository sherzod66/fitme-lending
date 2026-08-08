export interface IPaginationParams {
  skip?: number;
  take?: number;
  searchTerm?: string;
}
export interface IPaginationResponse<T> {
  items: T[];
  isHasMore: boolean;
  count?: number;
}
