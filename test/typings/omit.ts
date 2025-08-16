import { assert, number, object, omit, string, type } from "../../src";
import { test } from "..";

test<{
  b: string;
}>((x) => {
  assert(x, omit(object({ a: number(), b: string() }), ["a"]));
  return x;
});

test<{
  b: string;
}>((x) => {
  assert(x, omit(type({ a: number(), b: string() }), ["a"]));
  return x;
});
