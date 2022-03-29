import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createUserInput, getUserProjectByUserId } from './dto/user-input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('user') user: createUserInput): Promise<User> {
    const { username, email, password } = user;
    const result = await this.userService.createNewUser({
      username,
      email,
      password,
    });
    return result;
  }

  @Query(() => User)
  async getUserPostByUserId(@Args('userId') userId: getUserProjectByUserId) {
    return this.userService.getUserProjectById(userId);
  }
}
