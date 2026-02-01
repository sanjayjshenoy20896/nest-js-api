import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DevConfigService } from './common/provider/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';
import { NestFactory } from '@nestjs/core';

const devConfig = { port: 3000 };
const proConfig = { port: 4000 };

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sanjay@20896',
      database: 'n_test',
      entities: [Song],
      synchronize: true,
    }),
    SongsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { 
    provide: DevConfigService, 
    useClass: DevConfigService, 
    },
     {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
    {
      provide: 'SONG_REPOSITORY',
      useFactory: () => AppDataSource.getRepository(Song),
    }
  ],
})
export class AppModule implements NestModule {
  constructor(
    private dataSource:DataSource
  ){
    console.log(this.dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'sanjay@20896',
  database: 'n_test',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});

async function bootstrap() {
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();