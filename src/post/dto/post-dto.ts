import { Field, InputType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@InputType()
export class createPostInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  userId: number;
}
