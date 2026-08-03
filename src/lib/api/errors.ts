import { FieldError } from "@/types/api";

export class ApiError extends Error {
  public status: number;
  public errors?: FieldError[];

  constructor(message: string, status: number, errors?: FieldError[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function getErrorMessage(error: unknown, fallback = "An unexpected error occurred."): string {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}
