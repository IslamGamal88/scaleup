import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateTaskArgs } from './dto/update-task.args';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Resolver((of) => Task)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query((returns) => [Task])
  findAllTasks(): Promise<Task[]> {
    return this.tasksService.findAllTasks();
  }

  @Query((returns) => [Task])
  findByUserId(@Args('userId') id: number): Promise<Task[]> {
    return this.tasksService.findByUserId(id);
  }

  @Mutation((returns) => Task)
  create(@Args('attrs') attrs: UpdateTaskArgs): Promise<Task> {
    return this.tasksService.create(attrs);
  }

  @Mutation((returns) => Task)
  remove(@Args('id') id: number): Promise<Task> {
    return this.tasksService.remove(id);
  }

  @Mutation((returns) => Task)
  update(
    @Args('taskId') id: number,
    @Args('attrs') attrs: UpdateTaskArgs,
  ): Promise<Task> {
    return this.tasksService.update(id, attrs);
  }
}
