import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsArray, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class SeatDto {
  @ApiProperty({ example: 5, description: 'Row number' })
  @IsInt()
  @IsPositive()
  row: number;

  @ApiProperty({ example: 7, description: 'Seat number' })
  @IsInt()
  @IsPositive()
  seat: number;
}

export class CreateBookingDto {
  @ApiProperty({ type: [SeatDto], description: 'Array of seats to book' })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SeatDto)
  seats: SeatDto[];
}