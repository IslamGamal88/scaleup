import { ArgsType, InputType, Field, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@ArgsType()
@InputType('UpdateTaskArgs')
export class UpdateTaskArgs {
  @Field(() => String)
  @IsOptional()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Description must be at most 200 characters' })
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsEnum(['unassigned', 'in-progress', 'completed'], {
    message: 'Status is not valid',
  })
  status?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  userId?: number;
}
