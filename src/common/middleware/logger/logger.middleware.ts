import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(req.method, req.originalUrl);
    console.log(`Request .... ${req.method} - ${req.url} ${res.statusCode}`, new Date().toDateString());
    next();
  }
}
