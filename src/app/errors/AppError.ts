class AppError extends Error {
  public statusCode: number;

  //* Define the Constructor **

  constructor(statusCode: number, message: string, stack = "") {
    // Call the Super For message to Error Class **
    super(message);

    //  Set The statusCode to Error :
    this.statusCode = statusCode;

    //  Set The Stack Trace **
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
