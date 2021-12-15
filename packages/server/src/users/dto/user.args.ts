import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@ArgsType()
@InputType('CreateUserArgs')
export class CreateUserArgs {
  @Field(() => String)
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @Field(() => String)
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  @MaxLength(20, { message: 'Username must be at most 20 characters' })
  username: string;

  @Field(() => String)
  @IsString()
  @MinLength(3, { message: 'Password must be at least 3 characters' })
  @MaxLength(20, { message: 'Password must be at most 20 characters' })
  password: string;
}

@ArgsType()
@InputType('UpdateUserArgs')
export class UpdateUserArgs {
  @Field(() => String)
  @IsEmail({}, { message: 'Email is not valid' })
  email?: string;

  @Field(() => String)
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  @MaxLength(20, { message: 'Username must be at most 20 characters' })
  username?: string;
}

@ArgsType()
@InputType('LoginUserArgs')
export class LoginUserArgs {
  @Field(() => String)
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @Field(() => String)
  @IsString()
  password: string;
}
