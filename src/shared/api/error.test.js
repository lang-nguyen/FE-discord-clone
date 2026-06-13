import { describe, expect, it } from "vitest";

import { getErrorMessage } from "./error";

describe("getErrorMessage", () => {
  it("reads an ASP.NET validation error", () => {
    const error = {
      data: {
        title: "One or more validation errors occurred.",
        errors: {
          Name: ["The field Name must be at least 2 characters."],
        },
      },
    };

    expect(getErrorMessage(error)).toBe("The field Name must be at least 2 characters.");
  });

  it("prefers a business error message over validation metadata", () => {
    const error = {
      data: {
        message: "Category does not belong to this server.",
        errors: {
          CategoryId: ["Invalid category."],
        },
      },
    };

    expect(getErrorMessage(error)).toBe("Category does not belong to this server.");
  });
});
