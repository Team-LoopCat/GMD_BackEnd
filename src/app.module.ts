import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    UserModule,
    AdminModule,
    ChackerModule,
  ],
})
export class AppModule {}
