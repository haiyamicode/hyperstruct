import { discriminator, number, object, string } from "../../../src";

export const Struct = discriminator("type", {
  user: object({ id: string(), name: string() }),
  admin: object({ id: string(), permissions: number() }),
});

export const data = {
  type: "user",
  id: "123",
  name: "John Doe",
};

export const output = {
  type: "user",
  id: "123",
  name: "John Doe",
};
