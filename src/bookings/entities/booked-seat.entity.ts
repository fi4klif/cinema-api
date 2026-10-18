import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Booking } from './booking.entity';
import { Showing } from '../../showings/entities/showing.entity';

@Entity('booked_seats')
export class BookedSeat {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'UUID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 5, description: 'Row number' })
  @Column({ type: 'int' })
  row: number;

  @ApiProperty({ example: 7, description: 'Seat number' })
  @Column({ type: 'int' })
  seat: number;

  @ManyToOne(() => Booking, (booking) => booking.seats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;

  @ManyToOne(() => Showing, (showing) => showing.bookedSeats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'showingId' })
  showing: Showing;
}