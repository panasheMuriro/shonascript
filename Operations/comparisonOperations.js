/**
 * Comparison operations
 * equal, less than, greater than
 */

import { ErrorOperations } from "./errorOperations.js";
import { VariableOperations } from "./variables.js";

export const ComparisonOperations = {
  // matchers for the comparison operations
  equalMatcher: /[^\=\(]*\w*kaenzana\s*n[ae][^\)\{}]*|[^\=\(]*\w*kafanana\s*n[ae][^\)\{}]*/,
  lessMatcher: /[^\=\(]*\s*(?:\w*ri| )*s*\w*diki\s*pan[ae]\s*[^\)\{}]*/,
  moreMatcher: /[^\=\(]*\s*(?:\w*ri| )*\s*\w*hombe\s*\w*(?:kudarika|kupfuura|pan[ae])\s*[^\)\{}]*/,

  isComparison: (arg) => { // identify any of the 3 comparisons
    return (
      ComparisonOperations.equalMatcher.test(arg) ||
      ComparisonOperations.lessMatcher.test(arg) ||
      ComparisonOperations.moreMatcher.test(arg)
    );
  },

  isEqualComparison: (arg) => {
    return ComparisonOperations.equalMatcher.test(arg);
  },

  isLessComparison: (arg) => {
    return ComparisonOperations.lessMatcher.test(arg);
  },

  isMoreComparison: (arg) => {
    return ComparisonOperations.moreMatcher.test(arg);
  },

  extractWorkString: (arg) => { // get part of the line of interest to work on

    if (ComparisonOperations.isMoreComparison(arg)) {
      arg = arg.match(ComparisonOperations.moreMatcher)[0];
    }
    else if (ComparisonOperations.isLessComparison(arg)) {
      arg = arg.match(ComparisonOperations.lessMatcher)[0];
    }
    else if (ComparisonOperations.isEqualComparison(arg)) {
      arg = arg.match(ComparisonOperations.equalMatcher)[0]
    }

    let kanaMatcher = /\bkana\b/g // if the comparison has an if statement, ignore it
    arg = arg.replace(kanaMatcher, "");
    return arg
  },

  getComparisonArgs: (arg) => {

    let equalSplit = /\w*kaenzana\s*n[ae]|\w*kafanana\s*n[ae]\b/g;
    let lessSplit = /\s*(?:\w*ri| )+s*\w*diki\s*pan[ae]\s*\b/g;
    let moreSplit = /\s*(?:\w*ri| )*\s*\w*hombe\s*\w*(?:kudarika|kupfuura|pan[ae])\s*\b/g

    arg = ComparisonOperations.extractWorkString(arg);
    var args;
    if (ComparisonOperations.isEqualComparison(arg)) {
      args = arg.split(equalSplit);
    } else if (ComparisonOperations.isLessComparison(arg)) {
      args = arg.split(lessSplit);
    } else if (ComparisonOperations.isMoreComparison(arg)) {
      args = arg.split(moreSplit);
    }
    let firstVariable = args[0].trim();
    var secondVariable = args[1].replace(/\{.*/, "").trim(); // ignore anything that comes after the bracket {
    return { firstVariable: firstVariable, secondVariable: secondVariable };
  },

  convertToComparison: (arg) => {
    let { firstVariable, secondVariable } = ComparisonOperations.getComparisonArgs(arg);
    let workString = ComparisonOperations.extractWorkString(arg).trim();
    let kanaMatcher = /\bkana\b/ // if there was an if statement, put brackets on the conversion;

    // helper --> converts the operations
    let equal = "==";
    let greaterThan = ">";
    let lessThan = "<";
    const convert = (replacer, first, second) => {
      if (kanaMatcher.test(arg)) { // if there is an if statement, then put brackets during conversion
        let newWorkString = `(${first} ${replacer} ${second})`;
        arg = arg.replace(workString, newWorkString);
        return arg
      } else { // don't put in the brackets
        let newWorkString = `${first} ${replacer} ${second}`;
        arg = arg.replace(workString, newWorkString);
        return arg
      }
    }

    if (ComparisonOperations.isEqualComparison(arg)) {
      return convert(equal, firstVariable, secondVariable);
    } else if (ComparisonOperations.isLessComparison(arg)) {
      return convert(lessThan, firstVariable, secondVariable);
    } else if (ComparisonOperations.isMoreComparison(arg)) {
      return convert(greaterThan, firstVariable, secondVariable);
    }
  },
};

//----------- Comparison Operations ---------------
export const runComparisonOperations = (readLinesOriginal, readLines, errors, definedVariables) => {
  readLines = readLines.map((x) => {
    if (ComparisonOperations.isComparison(x)) {

      let { firstVariable, secondVariable } = ComparisonOperations.getComparisonArgs(x);
      let shouldProceed = { firstVariable: false, secondVariable: false }; // will proceed to convert if the both are true

      // helper --> validates the arguments
      const validateArguments = (variable, number) => { // should be a string, number, or a defined variable
        if (VariableOperations.isVariableValid(variable) == "isInValid") {
          ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, variable);
        } else if (VariableOperations.isVariableValid(variable) == "isValidNumber" || VariableOperations.isVariableValid(variable) == "isValid") {
          // pass
          if (number == 1) { // if argument number 1 is valid, set the should proceed first variable to true
            shouldProceed.firstVariable = true;
          } else if (number == 2) {
            shouldProceed.secondVariable = true;
          }
        }

        else if (VariableOperations.isVariableValid(variable) == "checkVariable") {
          if (!definedVariables.includes(variable)) {
            ErrorOperations.variableUnknown(readLinesOriginal, errors, x, variable);
          } else {
            if (number == 1) {
              shouldProceed.firstVariable = true;
            } else if (number == 2) {
              shouldProceed.secondVariable = true;
            }

          }
        } else { // else is valid string or number so proceed
          shouldProceed[variable] = true;
        }
      }

      validateArguments(firstVariable, 1); // validate the first variable
      validateArguments(secondVariable, 2); // validate the second variable

      if (shouldProceed.firstVariable && shouldProceed.secondVariable) { // only proceed if both arguments are valid
        return ComparisonOperations.convertToComparison(x);
      } else { // in case anything falls through the cracks
        ErrorOperations.operationNotWrittenProperly(readLinesOriginal, errors, x); // throw error
      }
    } else {
      return x;
    }
  });
  return readLines;
}