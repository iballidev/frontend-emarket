import { throwError } from 'rxjs';
import { BadInputError } from './bad-input-error';
import { AppError } from './app-error';
import { NotFoundError } from './not-found-error';

export const handleError = (errorResponse: Response) => {
  if (errorResponse.status === 400)
    return throwError(() => new BadInputError(errorResponse));

  if (errorResponse.status === 404)
    return throwError(() => new NotFoundError(errorResponse));

  return throwError(() => new AppError(errorResponse));
};



// export const handleError = (errorResponse: HttpErrorResponse) => {
//     if (errorResponse.error instanceof ErrorEvent) {
//       console.error('Client Side Error: ', errorResponse.error.message);
//     } else {
//       console.error('Server Side Error: ', errorResponse);
//     }
//     return throwError({
//       error: errorResponse,
//       message:
//         'There is a problem with the service. We are notified & working on it. Please try again later',
//     });
//   };
