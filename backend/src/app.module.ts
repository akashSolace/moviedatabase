import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'config.env',
      load: [databaseConfig, jwtConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        ...configService.get('database.options'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    MoviesModule,
    UsersModule,
  ],
})
export class AppModule {}
