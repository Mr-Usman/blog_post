import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/user/jwt-guard';
import { createPostInput } from './dto/post-dto';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async createPost(@Args('post') post: createPostInput): Promise<Post> {
    const { title, description, userId } = post;
    const result = await this.postService.createNewpost({
      title,
      description,
      userId,
    });
    return result;
  }
}
