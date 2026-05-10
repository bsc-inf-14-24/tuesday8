import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Service } from './entities/service.entity';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const service = this.serviceRepository.create(createServiceDto);

    return await this.serviceRepository.save(service);
  }

  async findAll() {
    return await this.serviceRepository.find();
  }

  async findOne(id: number) {
    return await this.serviceRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    await this.serviceRepository.update(id, updateServiceDto);

    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.serviceRepository.delete(id);
  }
}