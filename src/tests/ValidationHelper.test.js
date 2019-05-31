import {
  isNonNegativeSafeInteger,
  isRowsAndColsLessThan,
  isValid2dArray
} from "./../helpers/ValidationHelper";

describe("isNonNegativeSafeInteger", () => {
  it("should return false if input is not a non-negative safe int", () => {
    expect(isNonNegativeSafeInteger(-1)).toBe(false);
    expect(isNonNegativeSafeInteger("a")).toBe(false);
    expect(isNonNegativeSafeInteger("")).toBe(false);
    expect(isNonNegativeSafeInteger(2 ** 53)).toBe(false);
  });
  it("should return true if input is non-negative safe int", () => {
    expect(isNonNegativeSafeInteger(1)).toBe(true);
    expect(isNonNegativeSafeInteger(2 ** 53 - 1)).toBe(true);
  });
});

describe("isRowsAndColsLessThan", () => {
  it("should return false if rows and columns are more than limits", () => {
    const rows = 2;
    const cols = 2;
    const maxRows = 1;
    const maxCols = 2;
    expect(isRowsAndColsLessThan(rows, cols, maxRows, maxCols)).toBe(false);
  });
  it("should return true if rows and columns are less than limits", () => {
    const rows = 2;
    const cols = 2;
    const maxRows = 3;
    const maxCols = 3;
    expect(isRowsAndColsLessThan(rows, cols, maxRows, maxCols)).toBe(true);
  });
});

describe("isValid2dArray", () => {
  it("should return false if input is not a valid 2d array", () => {
    expect(isValid2dArray([2, 3])).toBe(false);
    expect(isValid2dArray([[2, 3], [2, "3"]])).toBe(false);
  });
  it("should return true if input is a valid 2d array", () => {
    expect(isValid2dArray([[2, 3]])).toBe(true);
    expect(isValid2dArray([[2, 3], [2, 3]])).toBe(true);
  });
});
