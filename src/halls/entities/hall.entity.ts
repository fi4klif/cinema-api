import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Showing } from '../../showings/entities/showing.entity';

@Entity('halls')
export class Hall {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Hall UUID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'IMAX 3D', description: 'Hall name' })
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @ApiProperty({ example: 10, description: 'Number of rows' })
  @Column({ type: 'int' })
  rows: number;

  @ApiProperty({ example: 15, description: 'Number of seats per row' })
  @Column({ type: 'int' })
  seatsPerRow: number;

  @ApiProperty({ example: '2026-10-15T12:00:00.000Z', description: 'Date created' })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => Showing, (showing) => showing.hall)
  showings: Showing[];
}