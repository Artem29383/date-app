import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class BadgeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  subs: number;

  @Column({ default: 0 })
  comments: number;

  @Column()
  @Exclude({ toPlainOnly: true })
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.badge, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
