import { discriminator, string, number } from "../../../src";

export const Struct = discriminator("type", {
  user: { id: string(), name: string() },
  admin: { id: string(), permissions: number() },
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