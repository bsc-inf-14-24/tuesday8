import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  async create(dto: any) {
    // 1. Prevent double booking manually (extra safety)
    const existing = await this.bookingRepo.findOne({
      where: {
        barberId: dto.barberId,
        bookingDate: dto.bookingDate,
      },
    });

    if (existing) {
      throw new ConflictException('Barber already booked at this time');
    }

    const booking = this.bookingRepo.create({
      userId: dto.userId,
      barberId: dto.barberId,
      serviceId: dto.serviceId,
      bookingDate: dto.bookingDate,
      status: 'pending',
    });

    return this.bookingRepo.save(booking);
  }

  findAll() {
    return this.bookingRepo.find({
      relations: ['service'],
    });
  }

  findOne(id: number) {
    return this.bookingRepo.findOne({
      where: { id },
      relations: ['service'],
    });
  }

  async updateStatus(id: number, status: string) {
    await this.bookingRepo.update(id, { status });
    return this.findOne(id);
  }
}