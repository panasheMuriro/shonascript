/**
 * Functions
 * regular - Identified by basa keyword
 * timed - mirira or dzokorora
 */

import { ErrorOperations } from "./errorOperations.js";
import { VariableOperations } from "./variables.js";

export const FunctionOperations = {
  basaMatcher: /\bbasa\b/,

  // Function Definition
  isFunction: (arg) => {
    return FunctionOperations.basaMatcher.test(arg);
  },

  typeOfFunction: (arg) => {
    let regular = /\bbasa[\s]*\w*\s*\(.*\)/;
    let timeout = /\bbasa[\s]+mirira\s+\d+\s+second[s]*\s+\w*\s*\(.*\)/g;
    let interval =
      /\bbasa[\s]+dzokorora\s+\d+\s+second[s]*\s+\w*\s*\(.*\)/g;
    if (regular.test(arg)) {
      return "regular";
    } else if (interval.test(arg)) {
      return "interval";
    } else if (timeout.test(arg)) {
      return "timeout";
    } else {
      return "unknown"
    }
  },

  hasArgs: (arg) => {
    let matcher = /\(.*\)/; // match any character inside the brackets
    // if brackets only has a space like ( ), it doesn't have args
    let args = arg.match(matcher)[0];
    args = args.replace(/[\(\)]+/g, "").trim(); // ignore the brackets
    if (args !== "") { // then it wasn't only a whitespace
      return true
    }
    else {
      return false
    }
  },


  getFunctionNameAndArgs: (arg) => {  // get the function name and variables if any
    let regularSplitter = /(?:\bbasa|\(|\))/; // get the args of the regular function
    let timeoutMatcher = /\bbasa[\s]*mirira*\s*\d+\s*second[s]*\s*/g;
    let intervalMatcher = /\bdzokorora\s+\d+\s+second[s]*/g;

    var args = 0; // number of args

    const getFunctionNameAndArgs = (arg) => {
      let functionNameAndArgs = arg
        .split(regularSplitter)
        .filter((x) => x != "")
        .map((x) => x.trim());
      return functionNameAndArgs
    }

    const getArgs = (args) => { // get args if present 
      if (FunctionOperations.hasArgs(arg)) {
        args = getFunctionNameAndArgs(arg)[1].split(","); // args will be separated by commas
        args = args.map((x) => x.trim()); // remove whitespace
        return args
      }
    }

    if (FunctionOperations.typeOfFunction(arg) == "regular") { // deal with the regular function
      var fName = getFunctionNameAndArgs(arg)[0]; // get regular function name
      args = getArgs(arg);
    }

    if (FunctionOperations.typeOfFunction(arg) == "timeout") {
      let workArg = arg.replace(timeoutMatcher, ""); // get rid of the "mirira 2 seconds" part
      var fName = getFunctionNameAndArgs(workArg)[0]; //timeout function name
      args = getArgs(arg);
    }

    if (FunctionOperations.typeOfFunction(arg) == "interval") {
      let workArg = arg.replace(intervalMatcher, ""); // get rid of the 'dzokorora x seconds' part
      var fName = getFunctionNameAndArgs(workArg)[0]; // interval function name
      args = getArgs(args);
    }
    return { fName: fName, fArgs: args };    // return the function name and args object
  },

  convertToFunction: (arg) => {
    if (FunctionOperations.typeOfFunction(arg) == "regular") {
      return arg.replace(/\bbasa/, "function");
    } else if (FunctionOperations.typeOfFunction(arg) == "timeout") {
      let matcher = /\bbasa[\s]*mirira*\s*\d+\s*second[s]*\s*/g;
      return arg.replace(matcher, "function ");
    } else if (FunctionOperations.typeOfFunction(arg) == "interval") {
      let matcher = /\bbasa[\s]*dzokorora*\s*\d+\s*second[s]*\s*/g;
      return arg.replace(matcher, "function ");
    }
  },

  // Funtion Call 
  // called by tangaBasa.FunctionName()
  isFunctionCall: (arg) => {
    let matcher = /\btanga[bB]asa/g; // incase the user doesn't use capital B as needed
    return matcher.test(arg);
  },


  extractFunctionCallWorkString: (arg) => { // get the work string , in the case that the function is assigned as a variable
    let matcher = /\btanga[bB]asa[\.]*.*\(.*\)/g
    return arg.match(matcher)[0];
  },

  isFunctionCallWrittenProperly: (arg) => {
    let matcher = /tangaBasa.[^ ]+\(.*\)/g; // should have a capital B and some parenthesis 
    let workString = FunctionOperations.extractFunctionCallWorkString(arg).trim();
    return matcher.test(workString);
  },

  getFunctionCallNameAndArgs: (arg) => {
    let workString = FunctionOperations.extractFunctionCallWorkString(arg).trim();
    let fNameMatcher = /tangaBasa.*\(.*\)/g;
    let fName = arg.match(fNameMatcher)[0].replace(/tangaBasa\./g, "").replace(/\(.*\)/g, "");
    let argsMatcher = /\(.*\)/g;

    let args = workString
      .match(argsMatcher)[0]
      .replace(/(?:\(|\))/g, "")
      .split(",") // arguments are separate by commas
      .filter((x) => x != "")
      .map(x => x.trim());
    return { fName: fName, fArgs: args }; // return the function name and arguments object
  },

  convertToFunctionCall: (arg) => {
    return arg.replace("tangaBasa.", "");
  },

  getTimeoutSeconds: (arg) => {
    let matcher = /\bmirira\s*\d*\s*second[s]*/;
    let x = arg.match(matcher)[0].match(/\d+/)[0]; // timeout seconds is a number
    return Number(x)
  },

  convertToFunctionCallTimeout: (arg, time) => {
    arg = arg.replace("tangaBasa.", "");
    return `setTimeout(()=>${arg},${time * 1000})`
  },

  getIntervalSeconds: (arg) => {
    let matcher = /\bdzokorora\s*\d*\s*second[s]*/;
    let x = arg.match(matcher)[0].match(/\d+/)[0];
    return Number(x)
  },

  convertToFunctionCallInterval: (arg, time, intervalName) => {
    arg = arg.replace(/tangaBasa\./, "");
    return `var ${intervalName} = setInterval(()=>${arg},${time * 1000});`
  },

  isStopInterval: (arg) => {// is stop interval for the interval function which repeats forever
    let matcher = /\bmisa[bB]asa/g;
    return matcher.test(arg);
  },

  isStopIntervalWrittenProperly: (arg) => {
    let matcher = /\bmisaBasa\.\w*\([\s]*\)/g;
    return matcher.test(arg);
  },

  getStopIntervalName: (arg) => {
    let splitter = /\b(?:misaBasa\.|\()/g
    return arg.split(splitter)[1].trim();
  },

  convertToStopInterval: (arg) => {
    return `clearInterval(${arg}Interval)`;
  },

  containsDzosa: (arg) => { // dzosa is the 'return' keyword of ShonaScript
    let matcher = /\bdzosa\b/g;
    return matcher.test(arg);
  },


  //TODO: work on the dzosa, to get the arguments and validate them
  convertToReturn: (arg) => {
    let matcher = /\bdzosa\b/g;
    return arg.replace(matcher, "return");
  }

};


export const runFunctionOperations = (readLinesOriginal, readLines, errors, definedFunctions, definedVariables, definedFunctionArgs, functionArgCounter, functionType) => {
  readLines = readLines.map((x) => {
    if (FunctionOperations.isFunction(x)) {
      if (FunctionOperations.typeOfFunction(x) == "unknown") {
        ErrorOperations.operationNotWrittenProperly(readLinesOriginal, errors, x);
      } else {
        let fName = FunctionOperations.getFunctionNameAndArgs(x).fName;// name of the regular function
        let fArgs = FunctionOperations.getFunctionNameAndArgs(x).fArgs; // get the arguments

        //Helper --> counts and validates the number of inputs given a function
        const countAndValidateArgs = (fArgs) => {
          let argsCount = 0; // counter for the number of arguments

          fArgs.map((y) => {
            let isArgValid = VariableOperations.isVariableValid(y) == "checkVariable"; // arguments should variables, during the function definition
            if (!isArgValid) {
              ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, y); // variable not valid
            }
            definedFunctionArgs.push(x);
            argsCount += 1;
          });
          functionArgCounter[fName] = argsCount; // set the number of arguments for the name of the function
        }

        // Helper  --> validates the function name
        const validateFunctionName = () => {
          let isFunctionNameValid = VariableOperations.isVariableValid(fName) == "checkVariable"; // should be a variable
          if (!isFunctionNameValid) {
            ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, fName);
          }
        }

        if (FunctionOperations.typeOfFunction(x) == "regular") {
          validateFunctionName();// check if the function name is valid, will throw error if not valid
          functionType[fName] = "regular";

          if (FunctionOperations.hasArgs(x)) { // check inputs
            countAndValidateArgs(fArgs);
          }

          definedFunctions.push(fName); // add the function name to the defined functions 
          return FunctionOperations.convertToFunction(x); // proceed with the conversion to a function

        } else if (FunctionOperations.typeOfFunction(x) == "timeout") { // deal with the timeout functions
          validateFunctionName();
          functionType[fName] = "timeout";

          if (FunctionOperations.hasArgs(x)) {
            countAndValidateArgs(fArgs);
          }

          functionType[`${fName}Time`] = FunctionOperations.getTimeoutSeconds(x); // get the timeout seconds
          definedFunctions.push(fName);
          return FunctionOperations.convertToFunction(x);

        } else if (FunctionOperations.typeOfFunction(x) == "interval") {
          validateFunctionName();
          functionType[fName] = "interval"; // type of function
          functionType[`${fName}IntervalName`] = `${fName}Interval`; // name of interval that could be used in stopping the timer using misaBasa
          functionType[`${fName}Time`] = FunctionOperations.getIntervalSeconds(x); // interval seconds

          if (FunctionOperations.hasArgs(x)) {
            countAndValidateArgs(fName);
          }

          definedFunctions.push(fName);
          return FunctionOperations.convertToFunction(x);
        }
      }

    } else if (FunctionOperations.isFunctionCall(x)) {

      const validateArgs = (fArgs) => {
        fArgs.map((y) => { // can be a number, string, or valid variable
          let isVariable = VariableOperations.isVariableValid(y) == "checkVariable";
          let isNumber = VariableOperations.isVariableValid(y) == "isValidNumber";
          let isString = VariableOperations.isVariableValid(y) == "isValid";

          // if variable, check if it is defined
          if (isVariable) {
            if (!definedVariables.includes(y)) {
              ErrorOperations.variableUnknown(readLinesOriginal, errors, x, y)
            }
          } else if (isNumber || isString) {
            // pass
          } else { // not number, variable, string
            ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, y)
          }
        });
      }

      if (!FunctionOperations.isFunctionCallWrittenProperly(x)) {
        ErrorOperations.operationNotWrittenProperly(readLinesOriginal, errors, x)
      } else {
        // now validate the arg
        var fName = FunctionOperations.getFunctionCallNameAndArgs(x).fName; // get function name
        let fArgs = FunctionOperations.getFunctionCallNameAndArgs(x).fArgs; // get function arguments
        if (definedFunctions.includes(fName) && functionType[fName] == "regular") { //function call for regular
          if (functionArgCounter[fName] != fArgs.length && !(functionArgCounter[fName] == undefined && fArgs.length == 0)) { // the number of args of function definition and that of function cal should match
            ErrorOperations.numberOfArgumentsNotMatching(readLinesOriginal, errors, fArgs, functionArgCounter, fName, x)
          }
          validateArgs(fArgs) // we don't need to count here, just validate
          return FunctionOperations.convertToFunctionCall(x);

        } else if (definedFunctions.includes(fName) && functionType[fName] == "timeout") { // function call for timeout function
          let fTime = functionType[`${fName}Time`]; // get the timeout seconds

          if (functionArgCounter[fName] != fArgs.length) {
            if (functionArgCounter[fName] == undefined && fArgs.length == 0) { // indetifined number of arguments and zero is just the same
              validateArgs(fArgs);
              return FunctionOperations.convertToFunctionCallTimeout(x, fTime); // then convert to the timeout function
            } else {
              ErrorOperations.numberOfArgumentsNotMatching(readLinesOriginal, errors, fArgs, functionArgCounter, fName, x)
            }
          } else {
            countAndValidateArgs(fArgs);
            return FunctionOperations.convertToFunctionCallTimeout(x, fTime);
          }
        } else if (definedFunctions.includes(fName) && functionType[fName] == "interval") {// function call for the interval function
          let fTime = functionType[`${fName}Time`]; // get args
          let fIntervalName = functionType[`${fName}IntervalName`]; // the function interval name

          if (functionArgCounter[fName] != fArgs.length) { // number of args not the same 
            if (functionArgCounter[fName] == undefined && fArgs.length == 0) {
              validateArgs(fArgs);
              return FunctionOperations.convertToFunctionCallInterval(x, fTime, fIntervalName); // then convert to the timeout function
            } else {
              ErrorOperations.numberOfArgumentsNotMatching(readLinesOriginal, errors, fArgs, functionArgCounter, fName, x)
            }
          } else {
            countAndValidateArgs(fArgs);
            return FunctionOperations.convertToFunctionCallTimeout(x, fTime);
          }
        } else {
          ErrorOperations.variableUnknown(readLinesOriginal, errors, x, fName);
        }
      }

    } else if (FunctionOperations.isStopInterval(x)) { // is 'misaBasa'
      if (FunctionOperations.isStopIntervalWrittenProperly(x)) {
        let fIntervalName = FunctionOperations.getStopIntervalName(x); // the name of the interval
        if (functionType[`${fIntervalName}IntervalName`]) {
          return FunctionOperations.convertToStopInterval(fIntervalName); // stop the correct interval name
        } else {
          ErrorOperations.variableUnknown(readLinesOriginal, errors, x, fIntervalName);
        }
      } else {
        ErrorOperations.operationNotWrittenProperly(readLinesOriginal, errors, x);
      }
    } else if (FunctionOperations.containsDzosa(x)) {
      return FunctionOperations.convertToReturn(x);
    }
    else {
      return x;
    }
  });

  return readLines
}


