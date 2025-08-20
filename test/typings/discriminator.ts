import {
  boolean,
  discriminator,
  enums,
  type Infer,
  number,
  string,
} from "../../src";

// Basic discriminator
const User = discriminator("type", {
  user: { id: string(), name: string() },
  admin: { id: string(), permissions: number() },
});

type UserType = Infer<typeof User>;

// Should allow valid user
const validUser: UserType = {
  type: "user",
  id: "123",
  name: "John Doe",
};

// Should allow valid admin
const validAdmin: UserType = {
  type: "admin",
  id: "456",
  permissions: 15,
};

// Complex discriminator
const Event = discriminator("eventType", {
  USER_CREATED: {
    id: string(),
    name: string(),
  },
  USER_PAYMENT_PLAN_CHANGED: {
    id: string(),
    plan: enums(["FREE", "PAID"]),
  },
  USER_DELETED: {
    id: string(),
    softDelete: boolean(),
  },
});

type EventType = Infer<typeof Event>;

// Should allow valid event types
const userCreatedEvent: EventType = {
  eventType: "USER_CREATED",
  id: "user-123",
  name: "Jane Smith",
};

const paymentChangedEvent: EventType = {
  eventType: "USER_PAYMENT_PLAN_CHANGED",
  id: "user-456",
  plan: "PAID",
};

const userDeletedEvent: EventType = {
  eventType: "USER_DELETED",
  id: "user-789",
  softDelete: true,
};

// Test that discriminator enforces types correctly
const invalidEvent1: EventType = {
  // @ts-expect-error - invalid discriminator value
  eventType: "INVALID_TYPE",
  id: "user-123",
  name: "Jane Smith",
};

// @ts-expect-error - missing required property for USER_CREATED
const invalidEvent2: EventType = {
  eventType: "USER_CREATED",
  id: "user-123",
};

const invalidEvent3: EventType = {
  eventType: "USER_PAYMENT_PLAN_CHANGED",
  id: "user-456",
  // @ts-expect-error - wrong property type
  plan: "INVALID_PLAN",
};
