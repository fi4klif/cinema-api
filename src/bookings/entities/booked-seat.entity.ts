import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Booking } from './booking.entity';
import { Showing } from '../../showings/entities/showing.entity';

@Entity('booked_seats')
@Unique(['showingId', 'row', 'seat'])
export class BookedSeat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  bookingId: string;

  @Column({ type: 'uuid' })
  showingId: string;

  @ApiProperty({ example: 5, description: 'Row number' })
  @Column({ type: 'int' })
  row: number;

  @ApiProperty({ example: 8, description: 'Seat number in the row' })
  @Column({ type: 'int' })
  seat: number;

  @ManyToOne(() => Booking, (booking) => booking.seats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;

  @ManyToOne(() => Showing, (showing) => showing.bookedSeats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'showingId' })
  showing: Showing;
}