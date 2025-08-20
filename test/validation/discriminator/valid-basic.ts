import { discriminator, string, number } from "../../../src";

export const Struct = discriminator("type", {
  user: { id: string(), name: string() },
  admin: { id: string(), permissions: number() },
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