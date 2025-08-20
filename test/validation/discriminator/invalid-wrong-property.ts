import { discriminator, number, object, string } from "../../../src";

export const Struct = discriminator("type", {
  user: object({ id: string(), name: string() }),
  admin: object({ id: string(), permissions: number() }),
});

export const data = {
  type: "user",
  id: "123",
  permissions: 15,
};

export const failures = [
  {
    value: undefined,
    type: "string",
    refinement: undefined,
    path: ["name"],
    branch: [data, undefined],
  },
  {
    value: 15,
    type: "never",
    refinement: undefined,
    path: ["permissions"],
    branch: [data, data.permissions],
  },
];
