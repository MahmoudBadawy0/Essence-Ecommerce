import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  //handle errors

  return next(req).pipe(
    catchError((err) => {
      console.log('Interceptor', err.error.message);

      return throwError(() => err);
    })
  );
};
