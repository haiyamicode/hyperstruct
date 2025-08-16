import { array, assert, number } from "../../src";
import { test } from "..";

test<Array<unknown>>((x) => {
  assert(x, array());
  return x;
});

test<Array<number>>((x) => {
  assert(x, array(number()));
  return x;
});
