import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  barberId: number;

  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;
}