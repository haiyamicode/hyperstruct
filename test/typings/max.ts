import { assert, max, number } from "../../src";
import { test } from "..";

test<number>((x) => {
  assert(x, max(number(), 0));
  return x;
});
