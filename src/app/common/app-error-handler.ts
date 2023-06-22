import { ErrorHandler } from '@angular/core';

export class AppErrorHandler extends ErrorHandler {
  ErrorHandler(error: any) {
    console.error('Error: ', error);
    alert('an unexpected error occured!');
  }
}
