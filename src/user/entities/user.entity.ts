import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comments.entity';
import { Post } from 'src/post/entities/post.entity';
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../base-entity';

@Entity({ name: 'User' })
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 100, nullable: false })
  username: string;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post], { nullable: true })
  post: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment], { nullable: true })
  comment: Comment[];
}
