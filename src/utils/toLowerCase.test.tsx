import { toLowerCase } from "./toLowerCase";

describe("toLowerCase", () => {
  it("should lowercase a string", () => {
    const myValue = "hello world";
    // write a unit test for toLowerCase()

    expect(toLowerCase("Hello World")).toBe(myValue);
  });
});
