import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateFilmDto {
  @ApiProperty({ example: 'Interstellar', description: 'Film title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 169, description: 'Duration in minutes' })
  @IsInt()
  @IsPositive()
  duration: number;

  @ApiProperty({ example: 'Sci-Fi', description: 'Film genre' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  genre: string;
}