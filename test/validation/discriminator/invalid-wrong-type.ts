import { discriminator, number, object, string } from "../../../src";

export const Struct = discriminator("type", {
  user: object({ id: string(), name: string() }),
  admin: object({ id: string(), permissions: number() }),
});

export const data = {
  type: "manager",
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
