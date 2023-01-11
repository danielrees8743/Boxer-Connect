export default class AppError extends Error {
  [x: string]: any;
  public message: any;
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    this.isOperational = true;
  }
}
