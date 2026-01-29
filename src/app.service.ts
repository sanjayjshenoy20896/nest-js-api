import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/provider/DevConfigService';

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService,
    @Inject("CONFIG") private config:{port:string}
  ){
    console.log('Config Service Port:', this.config.port);
  }
  getHello(): string {
    return `Hello I am learning nestjs ${this.devConfigService.getDBHOST()}:${this.config.port}`;
  }
}
