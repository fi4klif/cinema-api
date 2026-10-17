import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Film } from '../../films/entitties/film.entity';
import { Hall } from '../../halls/entities/hall.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { BookedSeat } from '../../bookings/entities/booked-seat.entity';

@Entity('showings')
export class Showing {
  @ApiProperty({
    example: '770e8400-e29b-41d4-a716-446655440002',
    description: 'Unique showing identifier (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Film identifier',
  })
  @Column({ type: 'uuid' })
  filmId: string;

  @ApiProperty({
    example: '660e8400-e29b-41d4-a716-446655440001',
    description: 'Hall identifier',
  })
  @Column({ type: 'uuid' })
  hallId: string;

  @ManyToOne(() => Film, (film) => film.showings, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'filmId' })
  film: Film;

  @ManyToOne(() => Hall, (hall) => hall.showings, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'hallId' })
  hall: Hall;

  @ApiProperty({
    example: '2026-12-01T18:30:00.000Z',
    description: 'Showing start time in ISO 8601 format',
  })
  @Column({ type: 'timestamptz' })
  startsAt: Date;

  @ApiProperty({
    example: 25000,
    description: 'Ticket price in kopecks (e.g., 25000 = 250 UAH)',
  })
  @Column({ type: 'int' })
  price: number;

  @OneToMany(() => Booking, (booking) => booking.showing)
  bookings: Booking[];

  @OneToMany(() => BookedSeat, (bookedSeat) => bookedSeat.showing)
  bookedSeats: BookedSeat[];
}