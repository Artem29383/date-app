import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  username: string;

  @Column()
  countries: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column()
  gender: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  age?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
