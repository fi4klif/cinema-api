import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Showing } from '../../showings/entities/showing.entity';
import { BookedSeat } from './booked-seat.entity';

@Entity('bookings')
export class Booking {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Booking UUID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 50000, description: 'Total price in kopecks' })
  @Column({ type: 'int' })
  totalPrice: number;

  @ApiProperty({ example: '2026-10-15T12:00:00.000Z', description: 'Date created' })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Showing, (showing) => showing.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'showingId' })
  showing: Showing;

  @OneToMany(() => BookedSeat, (bookedSeat) => bookedSeat.booking, { cascade: true })
  seats: BookedSeat[];
}