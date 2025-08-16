import { assert, number, object, pick, string } from "../../src";
import { test } from "..";

test<{
  b: string;
}>((x) => {
  assert(x, pick(object({ a: number(), b: string() }), ["b"]));
  return x;
});
