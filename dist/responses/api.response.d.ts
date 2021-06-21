import { IPaginationWithDates, IPagination } from '../entities/interfaces/pagination';
export declare class ApiResponseRecords {
    records: any[];
    elementsPerPage: number;
    page: number;
    totalPages: number;
    constructor(queryResult: any[], pagination?: IPagination | IPaginationWithDates);
}
export declare class ApiResponse<T = any> {
    code: number;
    message?: string;
    error?: any;
    data?: T;
    constructor(success: boolean, value: any, data?: any);
    static paginationWithDatesNotProvidedError(): ApiResponse<any>;
    static paginationNotProvidedError(): ApiResponse<any>;
}
