import { MathOperations, runMathOperations } from "../../Operations/math";

/**
 * Section 1
 * Math Operation identifiers
 */
const strings = [
  `2+4`,
  `12-23`,
  `x-y`,
  `xy`,
  `x+=y`,
  `"a"-23`,
  `w-=34`,
  `w-"12"`,
  "w===12",
  "w+=20 21",
  "r+20d"
];

let validMathOperationsStrings = [
  "2+4",
  "12-23",
  "x-y",
  "x+=y",
  '"a"-23',
  "w-=34",
  'w-"12"',
  "w+=20 21",
  "r+20d"
];

let validMathOperations = [];
// identify a math operation
test("is math operation", () => {
  let shouldBeFalse = [3, 8];
  for (let i = 0; i < strings.length; i++) {
    let arg = strings[i];
    let isMathOperation = MathOperations.isMathOperation(strings[i]);
    if (shouldBeFalse.includes(i)) {
      expect(isMathOperation).toBe(false);
    } else {
      validMathOperations.push(arg);
      expect(isMathOperation).toBe(true);
    }
  }

  let stringifiedValidMathOperationsCreated = JSON.stringify(
    validMathOperations
  ).replace(/\\/g, "");
  let stringifiedValidMathOperationsWritten = JSON.stringify(
    validMathOperationsStrings
  ).replace(/\\/g, "");
  expect(stringifiedValidMathOperationsCreated).toBe(
    stringifiedValidMathOperationsWritten
  );
});

// the args given to a math operation should be numbers, or correctly written variables
test("are the arguments for operations valid", () => {
  let shouldBeFalse = [4,6,7,8];
  for (let i = 0; i < validMathOperations.length; i++) {
    let arg = validMathOperations[i];
    let isValid = MathOperations.areMathArgsValid(arg);
    if (shouldBeFalse.includes(i)) {
      expect(isValid).toEqual(false);
    } else {
      expect(isValid).toBe(true);
    }
  }
});

