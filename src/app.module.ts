import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { configDotenv } from 'dotenv';
import { AdminModule } from './admin/admin.module';
import { ChackerModule } from './chacker/chacker.module';

configDotenv();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: process.env.DB_HOST,
      username: process.env.USERNAME,
      password: process.env.PW,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: false,
      migrations: [__dirname + '/../**/migrations/*.js'],
      migrationsTableName: 'migrations',
      autoLoadEntities: true,
      entities: [__dirname + '/../**/entities/*.js'],
      timezone: 'Asia/Seoul',
    }),
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PW,
      },
    }),
    UserModule,
    AdminModule,
    ChackerModule,
  ],
})
export class AppModule {}
