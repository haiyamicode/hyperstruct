import * as h from "../dist/index.js";

// Define a simple discriminated union for different shapes
const Shape = h.discriminator("kind", {
  circle: {
    radius: h.number(),
  },
  rectangle: {
    width: h.number(),
    height: h.number(),
  },
  triangle: {
    base: h.number(),
    height: h.number(),
  },
});

// TypeScript type inference
type ShapeType = h.Infer<typeof Shape>;

// Example shapes
const circle: ShapeType = {
  kind: "circle",
  radius: 5,
};

const rectangle: ShapeType = {
  kind: "rectangle",
  width: 10,
  height: 8,
};

const triangle: ShapeType = {
  kind: "triangle",
  base: 6,
  height: 4,
};

// Function to calculate area with type safety
function calculateArea(shape: unknown): number {
  // Validate the shape first
  const validShape = h.create(shape, Shape);
  
  switch (validShape.kind) {
    case "circle":
      return Math.PI * validShape.radius ** 2;
    case "rectangle":
      return validShape.width * validShape.height;
    case "triangle":
      return (validShape.base * validShape.height) / 2;
  }
}

// Calculate areas
console.log("Circle area:", calculateArea(circle));
console.log("Rectangle area:", calculateArea(rectangle));
console.log("Triangle area:", calculateArea(triangle));

// Test with invalid data
try {
  calculateArea({ kind: "square", side: 5 }); // Invalid shape kind
} catch (error) {
  console.log("Error:", error.message);
}

try {
  calculateArea({ kind: "circle", diameter: 10 }); // Wrong property name
} catch (error) {
  console.log("Error:", error.message);
}