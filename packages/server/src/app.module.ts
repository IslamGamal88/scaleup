import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/user.entity';
import { join } from 'path';
import { Task } from './tasks/task.entity';

const {
  DB_HOST = 'localhost',
  DB_USERNAME = 'islamgamal',
  DB_PASSWORD = '',
  DB_NAME = 'scaleup',
} = process.env;
const __prod__ = process.env.NODE_ENV === 'production';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: DB_NAME,
      host: DB_HOST,
      port: 5433,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      entities: [User, Task],
      synchronize: !__prod__,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
