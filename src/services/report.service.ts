import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { CommentEntity, PaginationVerifier } from 'src/entities';
import { CommentRepository } from 'src/repositories';
import { ApiResponse, ERROR, SUCCESS } from 'src/responses';
import { ApiResponseRecords } from 'src/responses/api.response';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';

@Injectable()
export class ReportService {
  private months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: CommentRepository,
  ) {}

  async getAll(pagination: IPaginationWithDates): Promise<ApiResponse> {
    if (!PaginationVerifier.verifyIPagination(pagination))
      return ApiResponse.paginationWithDatesNotProvidedError();

    const result = await this.commentRepository
      .createQueryBuilder('comment')
      .innerJoinAndSelect(
        'comment.userOwner',
        'user',
        'comment.user_owner = user.id',
      )
      .innerJoinAndSelect(
        'comment.accessory',
        'accessory',
        'comment.accessory_id = accessory.id',
      )
      .innerJoinAndSelect(
        'accessory.category',
        'category',
        'accessory.category_id = category.id',
      )
      .where(
        "accessory.state = 'lost' AND accessory.created_at >= :start AND accessory.created_at <= :end AND user.role_id = 2",
        {
          start: pagination.start,
          end: pagination.end,
        },
      )
      .skip(Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements))
      .take(pagination.pageElements)
      .orderBy('accessory.createdAt', 'DESC')
      .getManyAndCount();

    if (!result.length) new ApiResponse(false, ERROR.USERS_NOT_FOUND);

    return new ApiResponse(
      true,
      SUCCESS.REPORT,
      new ApiResponseRecords(result, pagination),
    );
  }

  async getReportGeneral(year: string) {
    let founds = [];
    let losts = [];

    for (let i = 0; i < this.months.length; i++) {
      let found = await this.commentRepository.query(
        `SELECT COUNT(*) FROM accessories as consul WHERE to_char(lost_date, 'YYYY') = $1 AND state = 'found' AND to_char(lost_date, 'mm') = '${this.months[i]}';`,
        [year],
      );

      founds.push(...found);
    }

    for (let i = 0; i < 9; i++) {
      let lost = await this.commentRepository.query(
        `SELECT COUNT(*) FROM accessories as consul WHERE to_char(lost_date, 'YYYY') = $1 AND state = 'lost' AND to_char(lost_date, 'mm') = '${this.months[i]}';`,
        [year],
      );

      losts.push(...lost);
    }
    let count = await this.commentRepository.query(
      `SELECT COUNT(*) FROM accessories as consul WHERE to_char(lost_date, 'YYYY') = $1`,
      [year],
    );

    let result = { founds, losts, count };

    if (!result) new ApiResponse(false, ERROR.REPORT_NO_FOUND);

    return new ApiResponse(true, SUCCESS.REPORT, result);
  }

  async getReportCity(year: string) {
    let cities = await this.commentRepository.query(
      `SELECT lost_place, COUNT(*) FROM accessories as consul WHERE to_char(lost_date, 'YYYY') = $1 AND state = 'lost' GROUP BY lost_place;`,
      [year],
    );
    let count = await this.commentRepository.query(
      `SELECT COUNT(*) FROM accessories as consul WHERE to_char(lost_date, 'YYYY') = $1 AND state = 'lost'`,
      [year],
    );

    let result = { cities, count };

    if (!result) new ApiResponse(false, ERROR.REPORT_NO_FOUND);

    return new ApiResponse(true, SUCCESS.REPORT, result);
  }

  async getReportCategory(year: string) {
    let categories = await this.commentRepository.query(
      `SELECT c.category, COUNT(*) FROM accessories a INNER JOIN categories c ON c.id = a.category_id WHERE to_char(a.lost_date, 'YYYY') = $1 AND a.state = 'lost' GROUP BY c.category;`,
      [year],
    );
    let count = await this.commentRepository.query(
      `SELECT COUNT(*) FROM accessories a INNER JOIN categories c ON c.id = a.category_id WHERE to_char(a.lost_date, 'YYYY') = $1 AND a.state = 'lost';`,
      [year],
    );

    let result = { categories, count };

    if (!result) new ApiResponse(false, ERROR.REPORT_NO_FOUND);

    return new ApiResponse(true, SUCCESS.REPORT, result);
  }
}
