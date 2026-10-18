import { Controller, Get, Post, Body, Param, Query, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ShowingsService } from './showings.service';
import { CreateShowingDto } from './dto/create-showing.dto';
import { GetShowingsQueryDto } from './dto/get-showings-query.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Showings')
@Controller('showings')
export class ShowingsController {
  constructor(private readonly showingsService: ShowingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new showing' })
  @ApiResponse({ status: 201, description: 'The showing has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Film/Hall not found or invalid date.' })
  create(@Body() createShowingDto: CreateShowingDto) {
    return this.showingsService.create(createShowingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all showings (with optional filters)' })
  @ApiResponse({ status: 200, description: 'Return an array of showings.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid date format.' })
  findAll(@Query() query: GetShowingsQueryDto) {
    return this.showingsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a showing by ID' })
  @ApiParam({ name: 'id', description: 'Showing UUID' })
  @ApiResponse({ status: 200, description: 'Return the showing object.' })
  @ApiResponse({ status: 404, description: 'Showing not found.' })
  findOne(@Param('id') id: string) {
    return this.showingsService.findOne(id);
  }

  @Get(':id/seats')
  @ApiOperation({ summary: 'Get all seats for a showing' })
  @ApiParam({ name: 'id', description: 'Showing UUID' })
  @ApiResponse({ status: 200, description: 'Return an array of seats with booking status.' })
  @ApiResponse({ status: 404, description: 'Showing not found.' })
  getSeats(@Param('id') id: string) {
    return this.showingsService.getSeats(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a showing by ID' })
  @ApiResponse({ status: 204, description: 'The showing has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Showing not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.showingsService.remove(id);
  }
}