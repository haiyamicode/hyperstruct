import { discriminator, number, object, string } from "../../../src";

export const Struct = discriminator("type", {
  user: object({ id: string(), name: string() }),
  admin: object({ id: string(), permissions: number() }),
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
