import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTaskArgs } from './dto/update-task.args';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  findAllTasks(): Promise<Task[]> {
    return this.repo.find();
  }

  findByUserId(userId: number): Promise<Task[]> {
    return this.repo.find({ userId });
  }

  create(attrs: UpdateTaskArgs): Promise<Task> {
    const task = this.repo.create({
      ...attrs,
    });
    return this.repo.save(task);
  }

  async remove(id: number): Promise<Task> {
    const task = await this.repo.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return this.repo.remove(task);
  }

  async update(id: number, attrs: Partial<Task>): Promise<Task> {
    const task = await this.repo.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    Object.assign(task, attrs);
    return this.repo.save(task);
  }
}
