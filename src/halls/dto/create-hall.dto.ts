import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateHallDto {
  @ApiProperty({ example: 'IMAX 3D', description: 'Hall name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 10, description: 'Number of rows' })
  @IsInt()
  @IsPositive()
  rows: number;

  @ApiProperty({ example: 15, description: 'Number of seats per row' })
  @IsInt()
  @IsPositive()
  seatsPerRow: number;
}