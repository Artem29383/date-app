import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  age: number;

  @Column()
  countries: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column()
  gender: string;

  @Column()
  description?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
