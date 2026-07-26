import { describe, expect, it } from "vitest";

import { createCacheKey } from "../src/index.js";

describe("createCacheKey", () => {
  it("encodes namespaces and typed primitive parts deterministically", () => {
    expect(
      createCacheKey("users/v1", [
        "a:b",
        1,
        -0,
        Number.NaN,
        2n,
        true,
        null,
        undefined,
      ]),
    ).toBe(
      "users%2Fv1:string:a%3Ab|number:1|number:-0|number:NaN|bigint:2|boolean:true|null|undefined",
    );
  });

  it("distinguishes values with identical string representations", () => {
    expect(createCacheKey("x", ["1"])).not.toBe(createCacheKey("x", [1]));
    expect(createCacheKey("x", [])).toBe("x:");
  });

  it("rejects an empty namespace", () => {
    expect(() => createCacheKey("", ["key"])).toThrow(TypeError);
  });
});
