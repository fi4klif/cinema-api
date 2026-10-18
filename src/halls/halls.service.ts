import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hall } from './entities/hall.entity';
import { CreateHallDto } from './dto/create-hall.dto';

@Injectable()
export class HallsService {
  constructor(
    @InjectRepository(Hall)
    private readonly hallsRepository: Repository<Hall>,
  ) {}

  async create(createHallDto: CreateHallDto): Promise<Hall> {
    const existingHall = await this.hallsRepository.findOne({
      where: { name: createHallDto.name },
    });

    if (existingHall) {
      throw new ConflictException(`Hall with name '${createHallDto.name}' already exists`);
    }

    const newHall = this.hallsRepository.create(createHallDto);
    return await this.hallsRepository.save(newHall);
  }

  async findAll(): Promise<Hall[]> {
    return await this.hallsRepository.find();
  }

  async findOne(id: string): Promise<any> {
    const hall = await this.hallsRepository.findOne({ where: { id } });
    
    if (!hall) {
      throw new NotFoundException(`Hall with ID ${id} not found`);
    }

    const seats = [];
    for (let row = 1; row <= hall.rows; row++) {
      for (let seat = 1; seat <= hall.seatsPerRow; seat++) {
        seats.push({ row, seat });
      }
    }

    return { ...hall, seats };
  }

  async remove(id: string): Promise<void> {
    const hall = await this.hallsRepository.findOne({
      where: { id },
      relations: { showings: true },
    });

    if (!hall) {
      throw new NotFoundException(`Hall with ID ${id} not found`);
    }

    if (hall.showings && hall.showings.length > 0) {
      throw new ConflictException('Cannot delete hall because it has active showings');
    }

    await this.hallsRepository.remove(hall);
  }
}