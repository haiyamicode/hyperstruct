import { discriminator, string, number } from "../../../src";

export const Struct = discriminator("type", {
  user: { id: string(), name: string() },
  admin: { id: string(), permissions: number() },
});

export const data = "not an object";

export const failures = [
  {
    value: "not an object",
    type: "discriminator",
    refinement: undefined,
    path: [],
    branch: [data],
  },
];