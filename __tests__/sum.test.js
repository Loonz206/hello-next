import sum from "../utils/sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 1 + 2 to not equal 4", () => {
  expect(sum(1, 2)).not.toBe(4);
});
