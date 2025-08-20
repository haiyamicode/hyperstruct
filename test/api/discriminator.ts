import assert from "assert";
import { discriminator, string, number } from "../../src";

describe("discriminator", () => {
  const Struct = discriminator("type", {
    user: { id: string(), name: string() },
    admin: { id: string(), permissions: number() },
  });

  describe("assert", () => {
    it("should pass for valid user", () => {
      const data = { type: "user", id: "123", name: "John" };
      assert.doesNotThrow(() => Struct.assert(data));
    });

    it("should pass for valid admin", () => {
      const data = { type: "admin", id: "456", permissions: 15 };
      assert.doesNotThrow(() => Struct.assert(data));
    });

    it("should throw for invalid discriminator", () => {
      const data = { type: "invalid", id: "789", name: "Jane" };
      assert.throws(() => Struct.assert(data));
    });

    it("should throw for missing discriminator", () => {
      const data = { id: "789", name: "Jane" };
      assert.throws(() => Struct.assert(data));
    });

    it("should throw for wrong property type", () => {
      const data = { type: "user", id: 123, name: "Jane" };
      assert.throws(() => Struct.assert(data));
    });
  });

  describe("is", () => {
    it("should return true for valid user", () => {
      const data = { type: "user", id: "123", name: "John" };
      assert.strictEqual(Struct.is(data), true);
    });

    it("should return true for valid admin", () => {
      const data = { type: "admin", id: "456", permissions: 15 };
      assert.strictEqual(Struct.is(data), true);
    });

    it("should return false for invalid discriminator", () => {
      const data = { type: "invalid", id: "789", name: "Jane" };
      assert.strictEqual(Struct.is(data), false);
    });

    it("should return false for missing discriminator", () => {
      const data = { id: "789", name: "Jane" };
      assert.strictEqual(Struct.is(data), false);
    });

    it("should return false for non-object", () => {
      assert.strictEqual(Struct.is("not an object"), false);
    });
  });

  describe("create", () => {
    it("should create valid user", () => {
      const data = { type: "user", id: "123", name: "John" };
      const result = Struct.create(data);
      assert.deepStrictEqual(result, data);
    });

    it("should create valid admin", () => {
      const data = { type: "admin", id: "456", permissions: 15 };
      const result = Struct.create(data);
      assert.deepStrictEqual(result, data);
    });

    it("should throw for invalid data", () => {
      const data = { type: "invalid", id: "789", name: "Jane" };
      assert.throws(() => Struct.create(data));
    });
  });

  describe("validate", () => {
    it("should validate user successfully", () => {
      const data = { type: "user", id: "123", name: "John" };
      const [error, result] = Struct.validate(data);
      assert.strictEqual(error, undefined);
      assert.deepStrictEqual(result, data);
    });

    it("should validate admin successfully", () => {
      const data = { type: "admin", id: "456", permissions: 15 };
      const [error, result] = Struct.validate(data);
      assert.strictEqual(error, undefined);
      assert.deepStrictEqual(result, data);
    });

    it("should return error for invalid discriminator", () => {
      const data = { type: "invalid", id: "789", name: "Jane" };
      const [error] = Struct.validate(data);
      assert(error instanceof Error);
      assert(error.message.includes("Expected property `type` to be one of"));
    });

    it("should return error for missing discriminator", () => {
      const data = { id: "789", name: "Jane" };
      const [error] = Struct.validate(data);
      assert(error instanceof Error);
      assert(error.message.includes("Expected property `type` to be a string"));
    });
  });

});