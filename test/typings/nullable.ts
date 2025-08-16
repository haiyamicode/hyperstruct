import { assert, enums, nullable, object, string } from "../../src";
import { test } from "..";

test<string | null>((x) => {
  assert(x, nullable(string()));
  return x;
});

test<{ a: string | null }>((x) => {
  assert(x, object({ a: nullable(string()) }));
  return x;
});

test<{
  a: "a";
  b: "b";
}>(() => {
  return nullable(enums(["a", "b"])).schema;
});
