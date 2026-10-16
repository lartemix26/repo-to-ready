import { describe, expect, it } from "vitest";
import { oauthReturnPath } from "@/lib/oauth-return-path";

describe("OAuth return boundary", () => {
  it("preserves the consent authorization and fragment", () => {
    expect(oauthReturnPath("/.lovable/oauth/consent?authorization_id=abc#confirm")).toBe("/.lovable/oauth/consent?authorization_id=abc#confirm");
  });
  it("rejects external and malformed destinations", () => {
    for (const value of ["https://outside.invalid", "//outside.invalid", "/\\outside.invalid", "/\noutside.invalid", null]) expect(oauthReturnPath(value)).toBe("/");
  });
});