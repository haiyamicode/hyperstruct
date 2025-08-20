import { discriminator, number, object, string } from "../../../src";

export const Struct = discriminator("type", {
  user: object({ id: string(), name: string() }),
  admin: object({ id: string(), permissions: number() }),
});

export const data = {
  type: "admin",
  id: "456",
  permissions: 15,
};

export const output = {
  type: "admin",
  id: "456",
  permissions: 15,
};
