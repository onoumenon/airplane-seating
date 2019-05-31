export function isNonNegativeSafeInteger(input) {
  return Number.isSafeInteger(input) && input >= 0;
}

export function isRowsAndColsLessThan(rows, cols, rowNumber, colNumber) {
  if (rows && cols) {
    return rows < rowNumber && cols < colNumber;
  }
  return false;
}

export function isValid2dArray(input, optCondition, ...optConParams) {
  if (
    !(
      input.length > 0 &&
      input.constructor === Array &&
      input[0][0] &&
      input[0].constructor === Array
    )
  ) {
    return false;
  }
  if (optCondition) {
    return input.every(
      arr =>
        arr.length === 2 &&
        arr.every(number => isNonNegativeSafeInteger(number)) &&
        optCondition(arr[0], arr[1], ...optConParams)
    );
  }
  return input.every(
    arr =>
      arr.length === 2 && arr.every(number => isNonNegativeSafeInteger(number))
  );
}
