import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Showing } from '../../showings/entities/showing.entity';

@Entity('halls')
export class Hall {
  @ApiProperty({
    example: '660e8400-e29b-41d4-a716-446655440001',
    description: 'Unique hall identifier (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'IMAX Hall 1',
    description: 'Unique name of the hall',
  })
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @ApiProperty({
    example: 10,
    description: 'Number of rows in the hall',
  })
  @Column({ type: 'int' })
  rows: number;

  @ApiProperty({
    example: 15,
    description: 'Number of seats per row',
  })
  @Column({ type: 'int' })
  seatsPerRow: number;

  @OneToMany(() => Showing, (showing) => showing.hall)
  showings: Showing[];
}