import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { BookedSeat } from './entities/booked-seat.entity';
import { Showing } from '../showings/entities/showing.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private readonly bookingsRepository: Repository<Booking>,
    @InjectRepository(BookedSeat) private readonly bookedSeatsRepository: Repository<BookedSeat>,
    @InjectRepository(Showing) private readonly showingsRepository: Repository<Showing>,
    private readonly dataSource: DataSource,
  ) {}

  async create(showingId: string, dto: CreateBookingDto): Promise<Booking> {
    const showing = await this.showingsRepository.findOne({
      where: { id: showingId },
      relations: { hall: true },
    });

    if (!showing) {
      throw new NotFoundException(`Showing with ID ${showingId} not found`);
    }

    const seatSet = new Set(dto.seats.map((s) => `${s.row}-${s.seat}`));
    if (seatSet.size !== dto.seats.length) {
      throw new BadRequestException('Duplicate seats found in request');
    }

    for (const seat of dto.seats) {
      if (seat.row > showing.hall.rows || seat.seat > showing.hall.seatsPerRow) {
        throw new BadRequestException(`Seat ${seat.row}-${seat.seat} is out of hall bounds`);
      }
    }

    return await this.dataSource.transaction(async (manager) => {
      const existingSeats = await manager.find(BookedSeat, {
        where: { showing: { id: showingId } },
      });
      const bookedSet = new Set(existingSeats.map((s) => `${s.row}-${s.seat}`));

      for (const seat of dto.seats) {
        if (bookedSet.has(`${seat.row}-${seat.seat}`)) {
          throw new ConflictException(`Seat ${seat.row}-${seat.seat} is already booked`);
        }
      }

      const totalPrice = showing.price * dto.seats.length;
      
      const booking = manager.create(Booking, {
        totalPrice,
        showing,
      });
      const savedBooking = await manager.save(booking);

      const bookedSeatsToSave = dto.seats.map((seat) =>
        manager.create(BookedSeat, {
          row: seat.row,
          seat: seat.seat,
          booking: savedBooking,
          showing,
        }),
      );
      await manager.save(bookedSeatsToSave);

      return savedBooking;
    });
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingsRepository.find({
      relations: { seats: true, showing: true },
    });
  }

  async findByShowingId(showingId: string): Promise<Booking[]> {
    const showing = await this.showingsRepository.findOne({
      where: { id: showingId },
    });

    if (!showing) {
      throw new NotFoundException(`Showing with ID ${showingId} not found`);
    }

    return await this.bookingsRepository.find({
      where: { showing: { id: showingId } },
      relations: { seats: true },
    });
  }

  async remove(id: string): Promise<void> {
    const booking = await this.bookingsRepository.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    await this.bookingsRepository.remove(booking);
  }
}