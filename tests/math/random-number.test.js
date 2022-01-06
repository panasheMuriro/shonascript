import { MathOperations } from "../../Operations/math";
import { VariableOperations } from "../../Operations/variables";

const strings = [
  `nhamba.chero()`,
  `nhamb.chero`,
  `nhamba.cher`,
  `nhamba.chero`,
  `nhamba.chero(`,
  `nhamba.chero{}`,
  `nhamba.chero(20)`,
  `nhamba.chero(num)`,
  `nhamba.chero("23")`

];

/**
 * if there are no brackets at the end, it is valid, but incorrectly written
 */
const validRandomGeneratorStringsWritten = [
  `nhamba.chero()`,
  `nhamba.chero`,
  `nhamba.chero(`,
  `nhamba.chero{}`,
  `nhamba.chero(20)`,
  `nhamba.chero(num)`,
  `nhamba.chero("23")`

];


const correctlyWrittenStrings = [
  `nhamba.chero(20)`,
  `nhamba.chero(num)`,

]
const validRandomGeneratorStringsAdded = [];

// // identify random number generator
test("is random number generator", () => {
  let shouldBeFalse = [1, 2];

  for (let i = 0; i < strings.length; i++) {
    let string = strings[i];
    let isRandomNumberOperation = MathOperations.isRandomNumberGenerator(string);
    if (shouldBeFalse.includes(i)) {
      expect(isRandomNumberOperation).toBe(false);
    } else {
      expect(isRandomNumberOperation).toBe(true);
      validRandomGeneratorStringsAdded.push(string) // push to valid strings array
    }
  }
  let validRandomGeneratorArrayStringWritten = JSON.stringify(validRandomGeneratorStringsWritten).replace(/\\/g, "");
  let validRandomGeneratorArrayStringAdded = JSON.stringify(validRandomGeneratorStringsAdded).replace(/\\/g, "");
  expect(validRandomGeneratorArrayStringAdded).toBe(validRandomGeneratorArrayStringWritten)
});

// is the random number generator operation written correctly?
test('is random number generator written correctly', () => {

  let shouldBeFalse = [1, 2, 3,6];
  for (let i = 0; i < validRandomGeneratorStringsWritten.length; i++) {
    let string = validRandomGeneratorStringsWritten[i];
    let isCorrectlyWritten = MathOperations.isRandomNumberGeneratorWrittenCorrectly(string);
  
    if (!shouldBeFalse.includes(i)) {
      expect(isCorrectlyWritten).toBe(true)
    } else {
      expect(isCorrectlyWritten).toBe(false)
    }
  }
});

// TODO: The arguments are failing, something to do with the work string
test('is random number argument valid', () => {
  let shouldBeFalse = [];

  for (let i = 0; i < correctlyWrittenStrings.length; i++) {
    let string = correctlyWrittenStrings[i];
    let arg = MathOperations.getRandomNumberArg(string);

    // check of the argument is a number or correctly wriiten variable
    let isNumber = VariableOperations.isVariableValid(arg) == "isValidNumber";
    let isVariable = VariableOperations.isVariableValid(arg) == "checkVariable"; 
    let isValid = isNumber || isVariable

    if (!shouldBeFalse.includes(i)) {
      expect(isValid).toBe(true)
    } else {
      expect(isValid).toBe(false)
    }


  }
})


