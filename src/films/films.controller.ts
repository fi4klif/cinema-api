import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new film' })
  @ApiResponse({ status: 201, description: 'The film has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all films' })
  @ApiResponse({ status: 200, description: 'Return an array of all films.' })
  findAll() {
    return this.filmsService.findAll();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a film by ID' })
  @ApiParam({ name: 'id', description: 'Film UUID' })
  @ApiResponse({ status: 204, description: 'The film has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Film not found.' })
  @ApiResponse({ status: 409, description: 'Conflict. Film has active showings.' })
  remove(@Param('id') id: string) {
    return this.filmsService.remove(id);
  }
}