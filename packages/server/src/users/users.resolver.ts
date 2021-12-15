import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserArgs, LoginUserArgs, UpdateUserArgs } from './dto/user.args';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation((returns) => User)
  register(
    @Args('data', { type: () => CreateUserArgs })
    { email, password, username }: CreateUserArgs,
  ): Promise<User> {
    return this.usersService.register({ email, password, username });
  }

  @Mutation((returns) => User)
  login(
    @Args('data', { type: () => LoginUserArgs })
    { email, password }: LoginUserArgs,
  ): Promise<User> {
    return this.usersService.login({ email, password });
  }

  @Mutation((returns) => User)
  remove(@Args('id') id: number): Promise<User> {
    return this.usersService.remove(id);
  }

  @Mutation((returns) => User)
  update(
    @Args('id') id: number,
    @Args('attrs') attrs: UpdateUserArgs,
  ): Promise<User> {
    return this.usersService.update(id, attrs);
  }
}
