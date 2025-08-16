import { doesNotThrow, throws } from "assert";
import { assert, StructError, string } from "../../src";

describe("assert", () => {
  it("valid as helper", () => {
    doesNotThrow(() => {
      assert("valid", string());
    });
  });

  it("valid as method", () => {
    doesNotThrow(() => {
      // @ts-expect-error
      string().assert("valid");
    });
  });

  it("invalid as helper", () => {
    throws(() => {
      assert(42, string());
    }, StructError);
  });

  it("invalid as method", () => {
    throws(() => {
      // @ts-expect-error
      string().assert(42);
    }, StructError);
  });

  it("custom error message", () => {
    throws(() => string().assert(42, "Not a string!"), {
      cause: "Expected a string, but received: 42",
      message: "Not a string!",
    });
  });
});
