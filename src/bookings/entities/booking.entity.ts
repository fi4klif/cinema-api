import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Showing } from '../../showings/entities/showing.entity';
import { BookedSeat } from './booked-seat.entity';

@Entity('bookings')
export class Booking {
  @ApiProperty({
    example: '880e8400-e29b-41d4-a716-446655440003',
    description: 'Unique booking identifier (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '770e8400-e29b-41d4-a716-446655440002',
    description: 'Showing identifier',
  })
  @Column({ type: 'uuid' })
  showingId: string;

  @ManyToOne(() => Showing, (showing) => showing.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'showingId' })
  showing: Showing;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Customer email or identifier',
    required: false,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  customerEmail?: string;

  @ApiProperty({
    example: 50000,
    description: 'Total booking price in kopecks',
  })
  @Column({ type: 'int' })
  totalPrice: number;

  @ApiProperty({
    example: '2026-10-15T14:00:00.000Z',
    description: 'Date and time when the booking was created',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => BookedSeat, (seat) => seat.booking, {
    cascade: true,
    eager: true,
  })
  seats: BookedSeat[];
}