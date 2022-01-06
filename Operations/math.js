/**
 * Math operations
 * get random number
 */

import { ErrorOperations } from "./errorOperations.js";
import { VariableOperations } from "./variables.js";

export const MathOperations = {

  workStringMatcher: /nhamba.chero\([\w\d]*\)/g,   // check if the function is the random number generator
  invalidMathArgs: [], // collect the invalid math arguments of math operations

  isRandomNumberGenerator: (arg) => { // is 'nhamba.chero'
    var randomRegex = /nhamba.chero[ (\w)]*/g;
    return randomRegex.test(arg);
  },

  isRandomNumberGeneratorWrittenCorrectly: (arg) => {
    let matcher = /nhamba.chero\([\w\d]*\)/g; // should have the brackets
    return matcher.test(arg);
  },

  extractTheWorkString: (arg) => { // get part of the line of interest
    return arg.match(MathOperations.workStringMatcher)[0];
  },

  // get the arguments inside the brackets if the functions
  getRandomNumberArg: (arg) => {
    let x = /nhamba.chero[ (]*/g;
    arg = MathOperations.extractTheWorkString(arg);
    arg = arg.replace(x, "");
    arg = arg.replace(")", "");
    arg = arg.trim();
    return arg;
  },

  convertToRandomFunc: (arg) => { // proceed with the conversion
    let workString = MathOperations.extractTheWorkString(arg).trim();
    if (!MathOperations.getRandomNumberArg(workString)) {
      arg = arg.replace(workString, "Math.floor(Math.random()*10)");
      return arg;
    } else {
      arg = arg.replace(
        workString,
        `Math.floor(Math.random()*${MathOperations.getRandomNumberArg(
          workString
        )})`
      );
      return arg;
    }
  },

  isMathOperation: (arg) => { // regular known math - + | - | / | *
    return /[-+/*]+/g.test(arg);
  },
  
  getMathArgs: (arg) => { // get the math operation arguments
    let splitter = /[-+/*]+[=]*/g;
    let args = arg.split(splitter);
    args = args.map((x) => x.trim());
    return args;
  },

  // math args should be numbers, or correctly written variables
  areMathArgsValid: (arg) => {
    let args = MathOperations.getMathArgs(arg);
    let isValid = true;
    args.map((x) => {
      
      x = x.trim()
      let isValidNumber =
        VariableOperations.isVariableValid(x) == "isValidNumber";
      let isCorrectlyWrittenVariable =
        VariableOperations.isVariableValid(x) == "checkVariable"

      if (isValidNumber || isCorrectlyWrittenVariable) {
        // is Valid just remains true
      } else {
        // is Valid should become false
        isValid = false;
        MathOperations.invalidMathArgs.push(x); // push to the invalid args, we will need to display these in errors
      }
    });
    return isValid;
  },

};

export const runMathOperations = (readLinesOriginal, readLines, definedVariables, errors) => {
  readLines = readLines.map((x) => {
    // identify Math Operations
    if (MathOperations.isMathOperation(x)) {
      // if a variable is being defined as a Math operation, get the right side of the Variable Declaration where there is the Math Operation
      if (VariableOperations.isVariableDeclaration(x)) {
        x = VariableOperations.getRightSide(x);
      }

      let argsAreValid = MathOperations.areMathArgsValid(x); // check if the arguments are valid
      let invalidArgs = MathOperations.invalidMathArgs; // get the identified wrong args
      if (!argsAreValid) {
        ErrorOperations.mathOperationArgumentsInvalid(
          readLinesOriginal,
          errors,
          x,
          invalidArgs
        ); // throw error for the invalid args
      }
    }
    if (MathOperations.isRandomNumberGenerator(x)) {
      // is it written properly?
      if (!MathOperations.isRandomNumberGeneratorWrittenCorrectly(x)) {
        ErrorOperations.operationNotWrittenProperly(readLinesOriginal, errors, x);
      } else {
        let arg = MathOperations.getRandomNumberArg(x);
        if (arg) {
          if (VariableOperations.isVariableValid(arg) == "checkVariable") {
            if (!definedVariables.includes(arg)) {
              ErrorOperations.variableUnknown(readLinesOriginal, errors, x, arg);
            }
          }
        }
        return MathOperations.convertToRandomFunc(x);
      }
    } else {
      return x;
    }
  });
  return readLines
};

