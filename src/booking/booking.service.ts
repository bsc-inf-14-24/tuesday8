import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  create(dto: CreateBookingDto) {
    const booking = this.bookingRepository.create(dto);
    return this.bookingRepository.save(booking);
  }

  findAll() {
    return this.bookingRepository.find({
      relations: ['user', 'barber', 'service'],
    });
  }

  findOne(id: number) {
    return this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'barber', 'service'],
    });
  }

  update(id: number, dto: UpdateBookingDto) {
    return this.bookingRepository.update(id, dto);
  }

  remove(id: number) {
    return this.bookingRepository.delete(id);
  }

  findByUser(userId: number) {
    return this.bookingRepository.find({
      where: { userId },
      relations: ['barber', 'service'],
    });
  }

  findByBarber(barberId: number) {
    return this.bookingRepository.find({
      where: { barberId },
      relations: ['user', 'service'],
    });
  }
}