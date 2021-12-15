import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from 'src/tasks/task.entity';
@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true, type: 'text' })
  @Field()
  email: string;

  @Column({ type: 'text', unique: true })
  @Field()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @Column({ nullable: true, default: new Date() })
  @Field()
  createdAt?: Date;

  @Column({ nullable: true, default: new Date() })
  @Field()
  updatedAt?: Date;
}
