import { assert, bigint } from "../../src";
import { test } from "..";

test<bigint>((x) => {
  assert(x, bigint());
  return x;
});
