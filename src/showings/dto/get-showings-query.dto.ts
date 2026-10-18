import { IsOptional, IsUUID, IsString, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetShowingsQueryDto {
  @ApiPropertyOptional({ description: 'Film UUID to filter showings by film' })
  @IsOptional()
  @IsUUID()
  filmId?: string;

  @ApiPropertyOptional({ description: 'Date in YYYY-MM-DD format to filter showings by date' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' })
  date?: string;
}