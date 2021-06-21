import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { ApiResponse } from 'src/responses';
import { ReportService } from 'src/services/report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(
    @Query() pagination: IPaginationWithDates,
  ): Promise<ApiResponse> {
    return await this.reportService.getAll(pagination);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/general/:year')
  async getReportGeneral(@Param('year') year: string): Promise<ApiResponse> {
    return await this.reportService.getReportGeneral(year);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/city/:year')
  async getReportByCity(@Param('year') year: string): Promise<ApiResponse> {
    return await this.reportService.getReportCity(year);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/category/:year')
  async getReportByCategory(@Param('year') year: string): Promise<ApiResponse> {
    return await this.reportService.getReportCategory(year);
  }
}
