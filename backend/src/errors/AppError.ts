export default class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  private constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }

  public static create(message: string, statusCode = 400): AppError {
    return new AppError(message, statusCode);
  }
}
