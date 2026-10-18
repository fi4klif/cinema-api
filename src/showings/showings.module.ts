import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowingsService } from './showings.service';
import { ShowingsController } from './showings.controller';
import { Showing } from './entities/showing.entity';
import { Film } from '../films/entities/film.entity';
import { Hall } from '../halls/entities/hall.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Showing, Film, Hall])],
  controllers: [ShowingsController],
  providers: [ShowingsService],
  exports: [ShowingsService],
})
export class ShowingsModule {}