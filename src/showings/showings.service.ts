import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Showing } from './entities/showing.entity';
import { CreateShowingDto } from './dto/create-showing.dto';
import { GetShowingsQueryDto } from './dto/get-showings-query.dto';
import { Film } from '../films/entities/film.entity';
import { Hall } from '../halls/entities/hall.entity';

@Injectable()
export class ShowingsService {
  constructor(
    @InjectRepository(Showing)
    private readonly showingsRepository: Repository<Showing>,
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
    @InjectRepository(Hall)
    private readonly hallsRepository: Repository<Hall>,
  ) {}

  async create(createShowingDto: CreateShowingDto): Promise<Showing> {
    const startsAtDate = new Date(createShowingDto.startsAt);
    
    if (startsAtDate <= new Date()) {
      throw new BadRequestException('startsAt must be a date in the future');
    }

    const film = await this.filmsRepository.findOne({ where: { id: createShowingDto.filmId } });
    if (!film) {
      throw new BadRequestException(`Film with ID ${createShowingDto.filmId} not found`);
    }

    const hall = await this.hallsRepository.findOne({ where: { id: createShowingDto.hallId } });
    if (!hall) {
      throw new BadRequestException(`Hall with ID ${createShowingDto.hallId} not found`);
    }

    const newShowing = this.showingsRepository.create({
      ...createShowingDto,
      film,
      hall,
    });

    return await this.showingsRepository.save(newShowing);
  }

  async findAll(query: GetShowingsQueryDto): Promise<any[]> {
    const where: any = {};

    if (query.filmId) {
      where.film = { id: query.filmId };
    }

    if (query.date) {
      const startDate = new Date(`${query.date}T00:00:00.000Z`);
      const endDate = new Date(`${query.date}T23:59:59.999Z`);
      where.startsAt = Between(startDate, endDate);
    }

    const showings = await this.showingsRepository.find({
      where,
      relations: { film: true, hall: true },
    });

    showings.sort((a, b) => {
      const timeDiff = new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();
      if (timeDiff === 0) {
        return a.id.localeCompare(b.id);
      }
      return timeDiff;
    });

    return showings.map((showing) => ({
      id: showing.id,
      price: showing.price,
      startsAt: showing.startsAt,
      filmTitle: showing.film.title,
      hallName: showing.hall.name,
    }));
  }

  async findOne(id: string): Promise<any> {
    const showing = await this.showingsRepository.findOne({
      where: { id },
      relations: { film: true, hall: true },
    });

    if (!showing) {
      throw new NotFoundException(`Showing with ID ${id} not found`);
    }

    return {
      id: showing.id,
      price: showing.price,
      startsAt: showing.startsAt,
      filmTitle: showing.film.title,
      hallName: showing.hall.name,
    };
  }

  async getSeats(id: string): Promise<any[]> {
    const showing = await this.showingsRepository.findOne({
      where: { id },
      relations: { hall: true, bookedSeats: true },
    });

    if (!showing) {
      throw new NotFoundException(`Showing with ID ${id} not found`);
    }

    const seats = [];
    const bookedSet = new Set(
      (showing.bookedSeats || []).map((bs) => `${bs.row}-${bs.seat}`),
    );

    for (let row = 1; row <= showing.hall.rows; row++) {
      for (let seat = 1; seat <= showing.hall.seatsPerRow; seat++) {
        seats.push({
          row,
          seat,
          isBooked: bookedSet.has(`${row}-${seat}`),
        });
      }
    }

    return seats;
  }

  async remove(id: string): Promise<void> {
    const showing = await this.showingsRepository.findOne({ where: { id } });
    if (!showing) {
      throw new NotFoundException(`Showing with ID ${id} not found`);
    }
    await this.showingsRepository.remove(showing);
  }
}