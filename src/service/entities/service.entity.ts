import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('barber_service')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  duration: number;

  @Column({ nullable: true })
  description: string;
}