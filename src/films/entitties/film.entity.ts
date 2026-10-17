import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Showing } from '../../showings/entities/showing.entity';

@Entity('films')
export class Film {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Interstellar',
    description: 'Name film',
  })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    example: 169,
    description: 'Duration film',
  })
  @Column({ type: 'int' })
  duration: number;

  @ApiProperty({
    example: 'Sci-Fi',
    description: 'Genre film',
  })
  @Column({ type: 'varchar', length: 100 })
  genre: string;

  @ApiProperty({
    example: '2026-10-15T12:00:00.000Z',
    description: 'Date created',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => Showing, (showing) => showing.film)
  showings: Showing[];
}