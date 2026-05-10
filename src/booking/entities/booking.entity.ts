import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Barber } from '../../barber/entities/barber.entity';
import { Service } from '../../service/entities/service.entity';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => Barber)
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @Column({ name: 'barber_id' })
  barberId: number;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ name: 'service_id' })
  serviceId: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column({ default: 'pending' })
  status: string;
}