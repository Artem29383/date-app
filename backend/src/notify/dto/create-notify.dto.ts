import { IsEnum, IsOptional } from 'class-validator';
import { NotifyType } from '../types';
import { Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

export class CreateNotifyDto {
  @IsEnum(NotifyType)
  @Column()
  type: NotifyType;

  @Column()
  userId: string;

  @Column()
  @IsOptional()
  commentId?: string;

  @Column()
  postId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @ManyToOne(() => UserEntity, (user) => user.notifications, { eager: false })
  user?: UserEntity;
}
