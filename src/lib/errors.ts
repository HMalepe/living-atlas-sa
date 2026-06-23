export class AppError extends Error {
  readonly code: string;
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(
    message: string,
    options: {
      code?: string;
      statusCode?: number;
      cause?: unknown;
      isOperational?: boolean;
    } = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "AppError";
    this.code = options.code ?? "APP_ERROR";
    this.statusCode = options.statusCode ?? 500;
    this.isOperational = options.isOperational ?? true;
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred.";
}

export function toAppError(error: unknown, fallbackMessage: string): AppError {
  if (error instanceof AppError) {
    return error;
  }

  return new AppError(fallbackMessage, { cause: error });
}
