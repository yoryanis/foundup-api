import { CommentRepository } from 'src/repositories';
import { ApiResponse } from 'src/responses';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
export declare class ReportService {
    private commentRepository;
    private months;
    constructor(commentRepository: CommentRepository);
    getAll(pagination: IPaginationWithDates): Promise<ApiResponse>;
    getReportGeneral(year: string): Promise<ApiResponse<any>>;
    getReportCity(year: string): Promise<ApiResponse<any>>;
    getReportCategory(year: string): Promise<ApiResponse<any>>;
}
