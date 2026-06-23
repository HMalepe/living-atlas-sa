import { describe, expect, it } from "vitest";
import { AppError, getErrorMessage, toAppError } from "@/lib/errors";

describe("errors", () => {
  it("creates operational AppError with code", () => {
    const error = new AppError("Not found", { code: "NOT_FOUND", statusCode: 404 });
    expect(error.code).toBe("NOT_FOUND");
    expect(error.statusCode).toBe(404);
    expect(error.isOperational).toBe(true);
  });

  it("extracts message from unknown errors", () => {
    expect(getErrorMessage("boom")).toBe("boom");
    expect(getErrorMessage(null)).toBe("An unexpected error occurred.");
  });

  it("wraps unknown errors", () => {
    const wrapped = toAppError(new Error("inner"), "Failed");
    expect(wrapped.message).toBe("Failed");
  });
});
