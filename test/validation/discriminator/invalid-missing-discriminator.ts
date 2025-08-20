import { discriminator, string, number } from "../../../src";

export const Struct = discriminator("type", {
  user: { id: string(), name: string() },
  admin: { id: string(), permissions: number() },
});

export const data = {
  id: "789",
  name: "Jane Smith",
};

export const failures = [
  {
    value: data,
    type: "discriminator",
    refinement: undefined,
    path: [],
    branch: [data],
  },
];