import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../base-entity';

@Entity({ name: 'Comment' })
@ObjectType()
export class Comment extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  @Field()
  commentText: string;

  @ManyToOne(() => User, (user) => user.comment)
  user: User;

  @ManyToOne(() => Post, (post) => post.comment)
  post: Post;
}
