import { describe, it, expect } from "vitest";
import { getFieldBorderClass } from "./helpers";

const NORMAL = "border-gray-300 focus-within:ring-2 focus-within:ring-blue-400";
const ERROR = "border-red-500 ring-2 ring-red-200";

describe("getFieldBorderClass", () => {
  it("koi error field na ho to normal class", () => {
    expect(getFieldBorderClass("", "name")).toBe(NORMAL);
  });

  it("error field match kare to red class", () => {
    expect(getFieldBorderClass("mobile_no", "mobile_no")).toBe(ERROR);
  });

  it("error kisi aur field ka ho to normal class", () => {
    expect(getFieldBorderClass("mobile_no", "name")).toBe(NORMAL);
  });
});