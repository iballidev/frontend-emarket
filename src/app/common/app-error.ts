export class AppError {
  constructor(public OriginalError?: any) {
    console.warn('The Original Error: ', OriginalError);
  }
}
