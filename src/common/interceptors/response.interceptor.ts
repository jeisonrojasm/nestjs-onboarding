import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        // URLS excluidas de darles formato
        if (request.url === '/health') {
          return data;
        }

        return {
          response: true,
          data: {
            data,
            statusCode: response.statusCode,
            timestamp: new Date().toISOString(),
            path: request.url,
          },
        };
      }),
    );
  }
}
