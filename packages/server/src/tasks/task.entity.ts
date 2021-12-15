import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Field()
  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true, default: 'unassigned' })
  @Field()
  status?: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column({ nullable: true })
  @Field(() => Int)
  userId?: number;
}
