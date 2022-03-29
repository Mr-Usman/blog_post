import { ObjectType, Field } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comments.entity';
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

@Entity({ name: 'Post' })
@ObjectType()
export class Post extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  @Field()
  title: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.post)
  @Field(() => User, { nullable: false })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  @Field(() => [Comment], { nullable: true })
  comment: Comment[];
}
