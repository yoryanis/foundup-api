export interface IPagination {
  pageNumber: number;
  pageElements: number;
}

export interface IPaginationWithDates extends IPagination {
  start: Date;
  end: Date;
}

export interface IPaginationWithDatesAndState extends IPaginationWithDates {
  state: string;
  identification: number;
}

export interface IPaginationWithDatesAndFilter extends IPaginationWithDates {
  filter: number;
}
