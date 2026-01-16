import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Onboarding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column()
  email: string;

  @Column('decimal')
  initialAmount: number;

  @Column({ default: 'REQUESTED' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
