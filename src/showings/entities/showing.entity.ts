import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Film } from '../../films/entities/film.entity';
import { Hall } from '../../halls/entities/hall.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { BookedSeat } from '../../bookings/entities/booked-seat.entity';

@Entity('showings')
export class Showing {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Showing UUID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 25000, description: 'Price in kopecks' })
  @Column({ type: 'int' })
  price: number;

  @ApiProperty({ example: '2027-12-01T18:00:00.000Z', description: 'Start time' })
  @Column({ type: 'timestamptz' })
  startsAt: Date;

  @ManyToOne(() => Film, (film) => film.showings, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'filmId' })
  film: Film;

  @ManyToOne(() => Hall, (hall) => hall.showings, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'hallId' })
  hall: Hall;

  @OneToMany(() => Booking, (booking) => booking.showing)
  bookings: Booking[];

  @OneToMany(() => BookedSeat, (bookedSeat) => bookedSeat.showing)
  bookedSeats: BookedSeat[];
}