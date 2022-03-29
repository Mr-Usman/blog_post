import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPostInput } from './dto/post-dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createNewpost(post: createPostInput): Promise<Post> {
    const { title, description, userId } = post;
    const postDBSave = { title, description, user: { id: userId } };
    return this.postRepository.save(postDBSave);
  }
}
