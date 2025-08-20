import { discriminator, string, number, array, object, enums, boolean } from "../../../src";

export const Struct = discriminator("eventType", {
  USER_CREATED: { 
    id: string(), 
    name: string(),
    metadata: object({ source: string() }) 
  },
  USER_PAYMENT_PLAN_CHANGED: {
    id: string(),
    plan: enums(["FREE", "PAID"]),
    billingCycle: enums(["MONTHLY", "YEARLY"]),
  },
  USER_DELETED: { 
    id: string(), 
    softDelete: boolean(),
    deletedBy: string(),
  },
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