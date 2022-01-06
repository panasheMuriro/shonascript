/**
 * Variable Operations
 */

import { ArrayOperations } from "./arrayOperations.js";
import { ComparisonOperations } from "./comparisonOperations.js";
import { FunctionOperations } from "./functionOperations.js";
import { MathOperations } from "./math.js";
import { TimeOperations } from "./timeOperations.js";
import { ErrorOperations } from "./errorOperations.js";
import { StringOperations } from "./stringOperations.js";

export const VariableOperations = {

  isVariableDeclaration: (arg) => {

    var varMatcher = /=/; // matcher with an equal sign, with the exceptions of math operations and comparison operations
    let promiseId = /promise/; // this exception comes from inputs operations when a promise is created to read the user inputs
    let exceptionalOperator = /[+=-]+=/g; // this is for the math | comparison operations exceptions

    if (exceptionalOperator.test(arg)) {
      let newArg = arg.replace(exceptionalOperator, "");// remove the exceptional operations
      return varMatcher.test(newArg); // if we still have a var identifier, there must be a variable being declared
    }
    else {
      return varMatcher.test(arg) && !promiseId.test(arg) // if not operator, and not a javascript promise, then it must be a variable
    }
  },

  getNameOfVariable: (arg) => { // get the name of the variable
    var expToBe = arg.split("=")[0]; // name on the left of the equal sign
    return expToBe.trim(); // get rid of trailing whitespaces
  },

  isVariableValid: (arg) => { // check whether the variable name is valid
    let validStringMatcher = /["']+.*["']+/g; // is string
    let specialCharacterMatcher = /[^A-Za-z0-9_]/; // contains a special character
    let notNumberMatcher = /[^0-9]/; // not a number
    let numberMatcher = /[\d\.]+/; // matcher integers and floats

    arg = arg.trim(); // get rid of the trailing whitespaces

    // run the tests on the argument 
    let isValidString = validStringMatcher.test(arg); 
    let isNumber = numberMatcher.test(arg);
    let hasSpecialCharacter = specialCharacterMatcher.test(arg);
    let hasNotANumber = notNumberMatcher.test(arg);
    let firstCharIsNumber = numberMatcher.test(arg[0]);

    if (!isValidString && isNumber && !hasNotANumber) { // it is not a string, and is a number without a special character
      return "isValidNumber";
    }
    else if (isValidString) { // is a valid string -- may need to rename the output
      return "isValid";
    } else if (hasSpecialCharacter || !isValidString && firstCharIsNumber && hasNotANumber) { 
      // is not a string, the first character is not a number, does not have a special character
      return "isInValid";
    } else { // must be a valid variable
      return "checkVariable";
    }
  },

  getRightSide: (arg) => { // get the right side of the equal sign
    return arg.split(/=/)[1].trim();
  },

  isRightSideValid: (arg) => { // check the right side 
    if (VariableOperations.isVariableDeclaration(arg)) {
      let rightSide = VariableOperations.getRightSide(arg); // get the right side
      if (
        FunctionOperations.isFunctionCall(rightSide) || // is a functinon call which is returning something to be assigned to a variable
        ArrayOperations.isArrayDefinition(rightSide) || // is array
        ArrayOperations.isIncludesWithBrackets(rightSide) || // returns a boolean of existence of an item in the array
        ArrayOperations.isIncludesWithoutBrackets(rightSide) || 
        ArrayOperations.islengthFunction(rightSide) || // returns length of an array
        ComparisonOperations.isComparison(rightSide) || // returns boolean of comparison
        MathOperations.isMathOperation(rightSide) || // returns a number
        MathOperations.isRandomNumberGenerator(rightSide) || // returns random number operation
        TimeOperations.isDate(rightSide) || // returns date
        TimeOperations.isTime(rightSide) || // returns time
        VariableOperations.isVariableValid(rightSide) == "isValid" || 
        VariableOperations.isVariableValid(rightSide) == "checkVariable" ||
        VariableOperations.isVariableValid(rightSide) == "isValidNumber" ||
        StringOperations.isJoin(rightSide) || // returns a string from array
        StringOperations.isSplit(rightSide) //returns array from string
      ) {
        return true;
      } else {
        return false;
      }
    }
  },

  convertToVar: (arg) => {
    return `var ${arg}`; // just add a var word at the beginning of the line
  },
};


//--------------  Variable Operations -----------

export const runVariableOperations = (readLinesOriginal, readLines, definedVariables, errors) => {
  readLines = readLines.map((x) => {
    if (VariableOperations.isVariableDeclaration(x) && !ArrayOperations.isArrayDefinition(x)) { // ignore array definition, it will be handled in the array operations
      let rightSide = VariableOperations.getRightSide(x); // get the right side of the equal sign
      if (VariableOperations.isRightSideValid(x)) {
        let shouldCheckVariable = VariableOperations.isVariableValid(rightSide); // if right side had a variable, check if it is defined
        if (shouldCheckVariable == "checkVariable") {
          if (!definedVariables.includes(rightSide) && !VariableOperations.isRightSideValid(x)) {
            ErrorOperations.variableUnknown(readLinesOriginal, errors, x, rightSide);
          }
        }
      } else { // right side is not valid
        ErrorOperations.variableUnknown(readLinesOriginal, errors, x, rightSide); // throw error
      }
      let nameOfVariable = VariableOperations.getNameOfVariable(x) // get the left side of the equal sign
      if (VariableOperations.isVariableValid(nameOfVariable) == "checkVariable") {
        if (definedVariables.includes(nameOfVariable)) { // already defined, so skip the conversion
          return x;
        } else {
          definedVariables.push(nameOfVariable); // add it to the defined variables
          return VariableOperations.convertToVar(x); // proceed to convert
        }
      } else { // not a valid variable
        ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, nameOfVariable) // throw error
      }
    } else {
      return x;
    }
  });
  return readLines; //return the new lines 
};
