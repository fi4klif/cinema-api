import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsUUID, IsDateString } from 'class-validator';

export class CreateShowingDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Film UUID' })
  @IsUUID()
  @IsNotEmpty()
  filmId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Hall UUID' })
  @IsUUID()
  @IsNotEmpty()
  hallId: string;

  @ApiProperty({ example: 25000, description: 'Price in kopecks' })
  @IsInt()
  @IsPositive()
  price: number;

  @ApiProperty({ example: '2027-12-01T18:00:00.000Z', description: 'Start time (ISO 8601)' })
  @IsDateString()
  @IsNotEmpty()
  startsAt: string;
}