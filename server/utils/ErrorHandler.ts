class ErrorHandler extends Error {
  statusCode: number;
  constructor( message: any, statusCode:number) {
    super(message);
    this.statusCode = statusCode;

    // Capture the stack trace, excluding the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
