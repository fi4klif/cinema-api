import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { HallsService } from './halls.service';
import { CreateHallDto } from './dto/create-hall.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Halls')
@Controller('halls')
export class HallsController {
  constructor(private readonly hallsService: HallsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new hall' })
  @ApiResponse({ status: 201, description: 'The hall has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  @ApiResponse({ status: 409, description: 'Conflict. Hall name already exists.' })
  create(@Body() createHallDto: CreateHallDto) {
    return this.hallsService.create(createHallDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all halls' })
  @ApiResponse({ status: 200, description: 'Return an array of all halls.' })
  findAll() {
    return this.hallsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a hall by ID with generated seats' })
  @ApiParam({ name: 'id', description: 'Hall UUID' })
  @ApiResponse({ status: 200, description: 'Return the hall object with seats array.' })
  @ApiResponse({ status: 404, description: 'Hall not found.' })
  findOne(@Param('id') id: string) {
    return this.hallsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a hall by ID' })
  @ApiParam({ name: 'id', description: 'Hall UUID' })
  @ApiResponse({ status: 204, description: 'The hall has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Hall not found.' })
  @ApiResponse({ status: 409, description: 'Conflict. Hall has active showings.' })
  remove(@Param('id') id: string) {
    return this.hallsService.remove(id);
  }
}