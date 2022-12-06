export interface DataResult<T> {
  content: [];
  pagination: {
    pageNumber: number,
    size: number
  };
  totalElements: number;
}
