import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Bookings')
@Controller()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('showings/:showingId/bookings')
  @ApiOperation({ summary: 'Book seats for a showing' })
  @ApiParam({ name: 'showingId', description: 'Showing UUID' })
  @ApiResponse({ status: 201, description: 'Booking successful.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid seats.' })
  @ApiResponse({ status: 404, description: 'Showing not found.' })
  @ApiResponse({ status: 409, description: 'Conflict. Seats already booked.' })
  create(
    @Param('showingId') showingId: string,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return this.bookingsService.create(showingId, createBookingDto);
  }

  @Get('bookings')
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({ status: 200, description: 'Return all bookings.' })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get('showings/:showingId/bookings')
  @ApiOperation({ summary: 'Get all bookings for a specific showing' })
  @ApiParam({ name: 'showingId', description: 'Showing UUID' })
  @ApiResponse({ status: 200, description: 'Return bookings for the showing.' })
  @ApiResponse({ status: 404, description: 'Showing not found.' })
  findByShowingId(@Param('showingId') showingId: string) {
    return this.bookingsService.findByShowingId(showingId);
  }

  @Delete('bookings/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a booking by ID' })
  @ApiParam({ name: 'id', description: 'Booking UUID' })
  @ApiResponse({ status: 204, description: 'Booking successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}