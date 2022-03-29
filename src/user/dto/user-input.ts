import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createUserInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class getUserProjectByUserId {
  @Field()
  userId: string;
}
