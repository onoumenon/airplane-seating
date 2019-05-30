export function isNonNegativeSafeInteger(input) {
  return Number.isSafeInteger(input) && input >= 0;
}

export function isLessThan(input, maxNum) {
  return input < maxNum;
}

export function isValid2dArray(input, optCondition, optConParam) {
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
  if (optCondition && optConParam) {
    return input.every(
      arr =>
        arr.length === 2 &&
        arr.every(number => optCondition(number, optConParam))
    );
  }
  return input.every(
    arr =>
      arr.length === 2 && arr.every(number => isNonNegativeSafeInteger(number))
  );
}
