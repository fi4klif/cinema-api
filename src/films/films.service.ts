import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { CreateFilmDto } from './dto/create-film.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
  ) {}

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const newFilm = this.filmsRepository.create(createFilmDto);
    return await this.filmsRepository.save(newFilm);
  }

  async findAll(): Promise<Film[]> {
    return await this.filmsRepository.find();
  }

  async findOne(id: string): Promise<Film> {
    const film = await this.filmsRepository.findOne({ where: { id } });
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    return film;
  }

  async remove(id: string): Promise<void> {
    const film = await this.filmsRepository.findOne({
      where: { id },
      relations: { showings: true },
    });

    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }

    if (film.showings && film.showings.length > 0) {
      throw new ConflictException('Cannot delete film because it has active showings');
    }

    await this.filmsRepository.remove(film);
  }
}