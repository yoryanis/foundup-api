import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { ApiResponse } from 'src/responses';
import { ReportService } from 'src/services/report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    getAll(pagination: IPaginationWithDates): Promise<ApiResponse>;
    getReportGeneral(year: string): Promise<ApiResponse>;
    getReportByCity(year: string): Promise<ApiResponse>;
    getReportByCategory(year: string): Promise<ApiResponse>;
}
