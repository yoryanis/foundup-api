import { IPagination, IPaginationWithDates, IPaginationWithDatesAndState } from './interfaces/pagination';
export declare class PaginationVerifier {
    constructor();
    static verifyIPagination(p: IPagination): boolean;
    static verifyIPaginatioWithDates(p: IPaginationWithDates): boolean;
    static verifyIPaginatioWithDatesAndState(p: IPaginationWithDatesAndState): boolean;
    static defaultPaginationExample(): {
        description: string;
        pageNumber: string;
        pageElements: string;
    };
    static paginationWithDatesExample(): {
        description: string;
        pageNumber: string;
        pageElements: string;
        start: string;
        end: string;
        state: string;
    };
    static generateFormatError(): {
        name: string;
        message: string;
        example: {
            description: string;
            pageNumber: string;
            pageElements: string;
            start: string;
            end: string;
            state: string;
        };
    };
}
