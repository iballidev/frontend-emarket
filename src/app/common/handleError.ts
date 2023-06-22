 const handleError = (errorResponse: Response) => {

    switch (errorResponse?.status) {
        case 400:
            
            break;
    
        default:
            break;
    }
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
