import * as h from "../dist/index.js";

// Define a discriminated union for different event types
const Event = h.discriminator("type", {
  // User creation event
  user_created: {
    id: h.string(),
    name: h.string(),
    email: h.string(),
    created_at: h.string(),
  },
  
  // User payment plan change event
  user_payment_plan_changed: {
    id: h.string(),
    plan: h.enums(["FREE", "PAID", "ENTERPRISE"]),
    billing_cycle: h.enums(["MONTHLY", "YEARLY"]),
    changed_at: h.string(),
  },
  
  // User deletion event
  user_deleted: {
    id: h.string(),
    soft_delete: h.boolean(),
    deleted_by: h.string(),
    deleted_at: h.string(),
  },
});

// TypeScript type inference
type EventType = h.Infer<typeof Event>;

// Example of valid events
const userCreatedEvent: EventType = {
  type: "user_created",
  id: "user-123",
  name: "John Doe",
  email: "john@example.com",
  created_at: "2024-01-15T10:30:00Z",
};

const paymentPlanChangedEvent: EventType = {
  type: "user_payment_plan_changed",
  id: "user-456",
  plan: "PAID",
  billing_cycle: "MONTHLY",
  changed_at: "2024-01-15T11:45:00Z",
};

const userDeletedEvent: EventType = {
  type: "user_deleted",
  id: "user-789",
  soft_delete: true,
  deleted_by: "admin-001",
  deleted_at: "2024-01-15T12:00:00Z",
};

// Validate the events
console.log("Validating user created event...");
h.assert(userCreatedEvent, Event);
console.log("✓ Valid user created event");

console.log("Validating payment plan changed event...");
h.assert(paymentPlanChangedEvent, Event);
console.log("✓ Valid payment plan changed event");

console.log("Validating user deleted event...");
h.assert(userDeletedEvent, Event);
console.log("✓ Valid user deleted event");

// Example of validation with better error messages
console.log("\nTesting invalid events...");

try {
  const invalidEvent = {
    type: "invalid_event_type",
    id: "user-999",
    name: "Test User",
  };
  h.assert(invalidEvent, Event);
} catch (error) {
  console.log("❌ Invalid event type:", error.message);
}

try {
  const missingPropertiesEvent = {
    type: "user_created",
    id: "user-999",
    // Missing required properties: name, email, created_at
  };
  h.assert(missingPropertiesEvent, Event);
} catch (error) {
  console.log("❌ Missing properties:", error.message);
}

try {
  const wrongPropertyTypeEvent = {
    type: "user_payment_plan_changed",
    id: "user-999",
    plan: "INVALID_PLAN", // Invalid enum value
    billing_cycle: "MONTHLY",
    changed_at: "2024-01-15T11:45:00Z",
  };
  h.assert(wrongPropertyTypeEvent, Event);
} catch (error) {
  console.log("❌ Wrong property type:", error.message);
}

// Function to process events with type safety
function processEvent(event: unknown) {
  try {
    // Validate and get typed event
    const validEvent = h.create(event, Event);
    
    switch (validEvent.type) {
      case "user_created":
        console.log(`New user created: ${validEvent.name} (${validEvent.email})`);
        break;
      case "user_payment_plan_changed":
        console.log(`User ${validEvent.id} changed to ${validEvent.plan} plan`);
        break;
      case "user_deleted":
        console.log(`User ${validEvent.id} deleted ${validEvent.soft_delete ? "(soft)" : "(hard)"}`);
        break;
    }
  } catch (error) {
    console.error("Invalid event:", error.message);
  }
}

console.log("\nProcessing events with type safety:");
processEvent(userCreatedEvent);
processEvent(paymentPlanChangedEvent);
processEvent(userDeletedEvent);
processEvent({ type: "invalid", id: "test" });