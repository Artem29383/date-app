import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../../types';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  countries: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ default: Roles.customer })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
