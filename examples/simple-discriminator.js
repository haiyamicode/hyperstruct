"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const h = __importStar(require("../dist/index.js"));
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
// Example shapes
const circle = {
    kind: "circle",
    radius: 5,
};
const rectangle = {
    kind: "rectangle",
    width: 10,
    height: 8,
};
const triangle = {
    kind: "triangle",
    base: 6,
    height: 4,
};
// Function to calculate area with type safety
function calculateArea(shape) {
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
}
catch (error) {
    console.log("Error:", error.message);
}
try {
    calculateArea({ kind: "circle", diameter: 10 }); // Wrong property name
}
catch (error) {
    console.log("Error:", error.message);
}
