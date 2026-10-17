import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5434,
        username: 'postgres',
        password: 'cinema_super_secret',
        database: 'cinema_db',
        autoLoadEntities: true,
        synchronize: true, 
      }),
    }),
  ],
})
export class AppModule {}