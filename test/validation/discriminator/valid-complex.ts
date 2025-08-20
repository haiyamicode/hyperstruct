import { boolean, discriminator, enums, object, string } from "../../../src";

export const Struct = discriminator("eventType", {
  USER_CREATED: object({
    id: string(),
    name: string(),
    metadata: object({ source: string() }),
  }),
  USER_PAYMENT_PLAN_CHANGED: object({
    id: string(),
    plan: enums(["FREE", "PAID"]),
    billingCycle: enums(["MONTHLY", "YEARLY"]),
  }),
  USER_DELETED: object({
    id: string(),
    softDelete: boolean(),
    deletedBy: string(),
  }),
});

export const data = {
  eventType: "USER_PAYMENT_PLAN_CHANGED",
  id: "user-123",
  plan: "PAID",
  billingCycle: "MONTHLY",
};

export const output = {
  eventType: "USER_PAYMENT_PLAN_CHANGED",
  id: "user-123",
  plan: "PAID",
  billingCycle: "MONTHLY",
};
