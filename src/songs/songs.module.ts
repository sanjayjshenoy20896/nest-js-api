import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';
/**
 * CustomProviders:
 *@Module({
  controllers: [SongsController],
  providers:[SongsService]
})
  The above snippet is used to add providers in a standard way.
  * However, to illustrate the concept of custom providers in NestJS, we can modify the providers array to use an object that specifies how to provide the SongsService.
  * This approach allows for more flexibility, such as using different classes or values for the provider.
  * In this case, we are explicitly defining that whenever SongsService is requested, the useClass property indicates that the SongsService class should be instantiated.
  * @Module({
  controllers: [SongsController],
  providers: [{
    provide:SongsService,
    useClass:SongsService
  }]
})
  * This is particularly useful in scenarios where you might want to swap out implementations or use mock services for testing.
 */

// mock songs service to demonstrate value providers
const mockSongsService = {
  findAll() {
    return [{ id: 1, title: 'Lasting lover', artists: ['Siagla'] }];
  },
};
@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    // {
    //   provide:SongsService,
    //   useClass:SongsService
    // },
    // {
    //   provide: SongsService,
    //   useValue: mockSongsService,
    // },
    {
      provide:'CONNECTION',
      useValue:connection
    }
]
})
export class SongsModule {}
