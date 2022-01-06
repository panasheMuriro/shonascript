/**
 * Array operations
 * These should identify the debugger, infact, all the operations should identify the debugger
 *
 */

import { ErrorOperations } from "./errorOperations.js";
import { VariableOperations } from "./variables.js";


export const ArrayOperations = {
  identifyArray: /=\s*\[/,
  lengthMatcher: /\.\w*ngani\b[\(\)]*/,
  pushMatcher: /\bisa\b/,
  removeMatcher: /\b[\.]*bvisa\b/,
  includesMatcher: /.muna/,
  sortMatcher: /\.ronga/,
  loopMatcher: /\bpane\b[\s\w"']*\bmu\b[\s\w]*/,
  breakContinueMatcher: /\b(?:buda|jamba)\b/g,

  isArrayDefinition: (arg) => {
    return ArrayOperations.identifyArray.test(arg);
  },

  isArrayMissingClosingBracket: (arg) => {
    let matcher = /\]/g;
    return !matcher.test(arg)
  },

  getArrayVariableName: (arg) => {
    arg = arg.split(ArrayOperations.identifyArray);
    arg = arg.map(x => x.trim());
    return arg[0]
  },

  // Array Loop operation
  isArrayLoop: (arg) => {
    return ArrayOperations.loopMatcher.test(arg);
  },

  isArrayLoopMissingCurlyBracket: (arg) => { // loop array missing an opening curly bracket
    let matcher = /\{/g;
    return !matcher.test(arg)
  },

  getLoopVariableAndArrayNames: (arg) => { // get the loop variable and loop array name
    let matcher = /(?:\bpane|mu\b)/g;
    arg = arg.split(matcher).map(x => x.replace(/[{}()]/g, "")).map(x => x.trim()).filter(x => x != "");

    return { loopVariable: arg[0], arrayName: arg[1] }
  },

  convertToLoop: (arg, arrayName, loopVariable) => {
    let matcher = /\bpane\b\s+\w+\s+\bmu\b\s+\w+/g;
    let conv = `for (let ${loopVariable} of ${arrayName})`
    return arg.replace(matcher, conv)
  },

  // ----- Array Length Operation -------
  islengthFunction: (arg) => {
    return ArrayOperations.lengthMatcher.test(arg);
  },

  extractLengthWorkString: (arg) => { // in case the leght function is being assigned as a variable
    let matcher = /\b\w*.\.\w*ngani[\(\) ]*/g;
    return arg.match(matcher)[0];
  },

  islengthFunctionProperlyWritten: (arg) => {
    let matcher = /\b\w*.\.\w*ngani[\(\) ]+/g
    let workString = ArrayOperations.extractLengthWorkString(arg).trim();
    return matcher.test(workString);
  },

  // to check if the array is defined
  getArrayNameLength: (arg) => {
    let workString = ArrayOperations.extractLengthWorkString(arg);

    return workString.replace(ArrayOperations.lengthMatcher, "").trim();
  },

  convertToLength: (arg) => {
    let workString = ArrayOperations.extractLengthWorkString(arg).trim();
    let result = workString.replace(ArrayOperations.lengthMatcher, ".length");
    return arg.replace(workString, result)
  },


  // ------- Push function ---------

  isPushWithoutBrackets: (arg) => {
    let matcher = /\bisa\b/;
    return matcher.test(arg);
  },

  isPushWithBrackets: (arg) => {
    let matcher = /\b\.isa\b/;
    return matcher.test(arg);
  },

  isPushFunctionWrittenProperly: (arg) => {
    let matcher1 = /\bisa\s+[ '"\w\d]*\s+mu\s+[\w\d]*\b/g; // for the one without brackets
    let matcher2 = /.isa\(.*\)/g; // for the one with the brackets
    if (ArrayOperations.isPushWithBrackets(arg)) {
      return matcher2.test(arg)
    } else {
      return matcher1.test(arg);
    }
  },

  getPushVariableAndArray: (arg) => {
    let matcher = /\b(?:\[\.isa\(]|\)|isa|mu)\b/g;
    var args = arg.split(matcher) // split to get args
    let bracketsMatcher = /[\(\)\.]/g; // this will remove the brackets and the period
    args = args.map(x => x.replace(bracketsMatcher, "").trim()).filter(x => x != ""); // remove the brackets, and trim, then remove empty strings

    if (ArrayOperations.isPushWithBrackets(arg)) { // array and variable are reversed for push with brackets and puch without brackewts
      return { variable: args[1], array: args[0] };
    } else {
      return { array: args[1], variable: args[0] };
    }
  },

  convertToPush: (arg) => {
    if (ArrayOperations.isPushWithBrackets(arg)) {
      return arg.replace(".isa", ".push");
    } else {
      let { array, variable } = ArrayOperations.getPushVariableAndArray(arg);
      return `${array}.push(${variable})`;
    }
  },


  // -------- Remove ----------

  isRemoveWithBrackets: (arg) => { // with brackets
    let matcher = /\b\.bvisa\b/g;
    return matcher.test(arg);
  },

  isRemoveWithoutBrackets: (arg) => {
    let matcher = /\bbvisa\b/;
    return matcher.test(arg);
  },

  isRemoveFunctionWrittenProperly: (arg) => {
    let matcher1 = /\bbvisa\s+[' "\w\d]*\s+mu\s+[\w\d ]*\b/g // for the one without brackets
    let matcher2 = /\.bvisa\(.*\)/g; // for the one with the brackets
    if (ArrayOperations.isRemoveWithBrackets(arg)) {
      return matcher2.test(arg)
    } else {
      return matcher1.test(arg);
    }
  },

  getRemoveVariableAndArray: (arg) => {
    let matcher = /\b(?:\[\.bvisa\(]|\)|bvisa|mu)\b/;

    var args = arg.split(matcher) // split to get args
    let bracketsMatcher = /[\(\)\.]/g; // this will remove the brackets and the period
    args = args.map(x => x.replace(bracketsMatcher, "").trim()).filter(x => x != ""); // remove the brackets, and trim, then remove empty strings

    if (ArrayOperations.isRemoveWithBrackets(arg)) {
      return { variable: args[1], array: args[0] };
    } else {
      return { array: args[1], variable: args[0] };
    }
  },

  convertToRemove: (variable, array) => {
    return `let value = ${variable} \n${array} = ${array}.filter(item => item !== value)`;
  },

  // --------- Includes function -----------
  isIncludesWithoutBrackets: (arg) => {
    let matcher = /\birimu\b/g; // x irimu y
    return matcher.test(arg);
  },

  isIncludesWithBrackets: (arg) => {
    let matcher = /\.muna\(.*\)/g; //y.muna(x)
    return matcher.test(arg);
  },

  isIncludesFunctionWrittenProperly: (arg) => {
    let matcher = /\b[' "\w\d]*\s+irimu\s+[\w\d ]*\b/; // testing a new regex, // TODO: thoroughly test this
    let matcher2 = /\.muna\(.*\)/g;
    if (ArrayOperations.isIncludesWithBrackets(arg)) {
      return matcher2.test(arg)
    } else {
      return matcher.test(arg)
    }
  },

  getIncludesWorkString: (arg) => {
    let matcher = /\s*[\w\d]+\.muna[\s]*\(.*\)/g;
    let matcher2 = /[\w" '\d]+\s*irimu\s*.+/g;
    if (matcher2.test(arg)) {
      return arg.match(matcher2)[0]
    } else {
      return arg.match(matcher)[0]
    }
  },


  getIncludesVariableAndArray: (arg) => {
    arg = ArrayOperations.getIncludesWorkString(arg)

    if (ArrayOperations.isIncludesWithBrackets(arg)) { // is .muna()
      let matcher = /\.muna/g;
      var args = arg.split(matcher) // split to get args
      let bracketsMatcher = /[\(\)\.]/g; // this will remove the brackets and the period
      args = args.map(x => x.replace(bracketsMatcher, "").trim()).filter(x => x != ""); // remove the brackets, and trim, then remove empty strings
      return { variable: args[1], array: args[0] };
    } else {// is irimu 
      let matcher = /\birimu\b/g;
      var args = arg.split(matcher) // split to get args
      let bracketsMatcher = /[\(\)\.]/g; // this will remove the brackets and the period
      args = args.map(x => x.replace(bracketsMatcher, "").trim()).filter(x => x != ""); // remove the brackets, and trim, then remove empty strings
      return { variable: args[0], array: args[1] };
    }
  },

  convertToIncludes: (arg) => {
    // let irimuMatcher = /\birimu\b/
    let workString = ArrayOperations.getIncludesWorkString(arg).trim();
    let kanaMatcher = /\bkana\b/; // 'if' statement matcher

    if (kanaMatcher.test(arg)) {
      if (ArrayOperations.isIncludesWithoutBrackets(arg)) {
        workString = workString.replace(kanaMatcher, "");
        let replacer = `(${ArrayOperations.getIncludesVariableAndArray(workString).array}.includes(${ArrayOperations.getIncludesVariableAndArray(workString).variable}))`;
        return arg.replace(workString, replacer);
      } else {
        let replacer = `(${ArrayOperations.getIncludesVariableAndArray(arg).array}.includes(${ArrayOperations.getIncludesVariableAndArray(arg).variable}))`;
        return arg.replace(workString, replacer);
      }



    } else {
      let replacer = `${ArrayOperations.getIncludesVariableAndArray(arg).array}.includes(${ArrayOperations.getIncludesVariableAndArray(arg).variable})`;
      return arg.replace(workString, replacer)
    }

  },

  // --------- Sort ---------
  isSortFunction: (arg) => {
    return ArrayOperations.sortMatcher.test(arg);
  },

  extractSortWorkString: (arg) => { // in case the leght function is being assigned as a variable
    let matcher = /\b\w*.\.ronga[\(\) ]*/g;
    return arg.match(matcher)[0];
  },

  isSortFunctionWrittenProperly: (arg) => {
    arg = ArrayOperations.extractSortWorkString(arg);
    let matcher = /.ronga\(\)/
    return matcher.test(arg)
  },


  getSortArray: (arg) => {
    arg = ArrayOperations.extractSortWorkString(arg);
    return arg.split(/\.ronga\(\)/)[0]
  },
  convertToSort: (arg) => {
    return arg.replace(/\.ronga/, ".sort")
  },

  // break and continue
  // rule, the continue, and break should be on new lines 
  isBreakOrContinue: (arg) => {
    return ArrayOperations.breakContinueMatcher.test(arg); // match jamba or buda
  },

  isBreakOrContinueWrittenProperly: (arg) => { // jamba or buda should be on a new line 
    arg = arg.match(ArrayOperations.breakContinueMatcher).map(x => x.trim()).filter(x => x != "");
    return arg.length == 1;
  },

  convertToBreakOrContinue: (arg) => {
    let breakMatcher = /\bbuda\b/g;
    let continueMatcher = /\bjamba\b/g;
    if (breakMatcher.test(arg)) {
      return arg.replace("buda", "break");
    }
    else if (continueMatcher.test(arg)) {
      return arg.replace("jamba", "continue")
    }
  }
};


export const runArrayOperations = (readLinesOriginal, readLines, errors, definedVariables, definedArrays) => {
  readLines = readLines.map((x) => {

    if (ArrayOperations.isArrayDefinition(x)) { // is array definition
      if (!ArrayOperations.isArrayMissingClosingBracket) { // missing closing bracket, throw erros
        ErrorOperations.arrayMissingAClosingBracket(readLines, errors, x); // throw the relevant error
      }

      let arrayName = ArrayOperations.getArrayVariableName(x); // get the name of the array
      let isValid = VariableOperations.isVariableValid(arrayName) == "checkVariable";

      if (isValid) {
        definedVariables.push(arrayName);
        definedArrays.push(arrayName);
        return `var ${x}` // convert to JavaScript array definition
      } else {
        ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, arrayName) // throw Error
      }
    }

    //------ Loop ---------
    if (ArrayOperations.isArrayLoop(x)) { // is an array definition taking place?
      if (!ArrayOperations.isArrayLoopMissingCurlyBracket(x)) {

        let { arrayName, loopVariable } = ArrayOperations.getLoopVariableAndArrayNames(x); // get the variable and array names
        let shouldProceed = { arrayName: false, loopVariable: false }; // will proceeed to convert if both variable and arrayare defined correctly

        if (VariableOperations.isVariableValid(arrayName) !== "checkVariable") { // if array name not variable, it is wrong        
          ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, arrayName) // throw the relevant error
        } else {
          if (definedArrays.includes(arrayName)) { // is array in the defined Arrays?
            shouldProceed.arrayName = true; // array is valid
          } else {
            ErrorOperations.variableUnknown(readLinesOriginal, errors, x, arrayName) // array not in the defined arrays
          }
        }

        // loop variable
        if (VariableOperations.isVariableValid(loopVariable) !== "checkVariable") {
          ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, loopVariable) // throw relevant error
        } else {

          definedVariables.push(loopVariable);
          shouldProceed.loopVariable = true;
        }


        if (shouldProceed.loopVariable && shouldProceed.arrayName) {

          return ArrayOperations.convertToLoop(x, arrayName, loopVariable);
        } else {
          // TODO: check some edge cases
        }
      }
      else {
        ErrorOperations.missingOpeningCurlyBracket(readLinesOriginal, errors, x)
      }
    }

    //---------- Length ---------
    if (ArrayOperations.islengthFunction(x)) {
      if (!ArrayOperations.islengthFunctionProperlyWritten(x)) { // length function not properly written
        ErrorOperations.operationNotWrittenProperly(readLinesOriginal, errors, x)
      }

      var nameOfArray = ArrayOperations.getArrayNameLength(x); // name of array

      if (VariableOperations.isVariableValid(nameOfArray) !== "checkVariable") {
        ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, nameOfArray)
      } else {
        if (definedArrays.includes(nameOfArray)) { // array is valid
          return ArrayOperations.convertToLength(x);
        } else {
          ErrorOperations.variableUnknown(readLinesOriginal, errors, x, nameOfArray);
        }
      }
    }

    // --------- Push ------------
    if (ArrayOperations.isPushWithBrackets(x) || ArrayOperations.isPushWithoutBrackets(x)) {
      if (!ArrayOperations.isPushFunctionWrittenProperly(x)) {
        ErrorOperations.operationNotWrittenProperly(readLinesOriginal, errors, x);
      } else {

        let { array, variable } = ArrayOperations.getPushVariableAndArray(x) // get variable and array
        let isArrayValid = VariableOperations.isVariableValid(array) == "checkVariable";
        let isVariableValid = VariableOperations.isVariableValid(variable) !== 'isInValid';
        let shouldProceed = { array: false, variable: false };

        // deal with the array
        if (isArrayValid) { // array name is valid
          if (definedArrays.includes(array)) {
            shouldProceed.array = true;
          } else {
            ErrorOperations.variableUnknown(readLinesOriginal, errors, x, array)
          }
        } else {
          ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, array)
        }

        // deal with the variable
        if (isVariableValid) { // array name is valid
          if (VariableOperations.isVariableValid(variable) == "checkVariable") {
            if (definedVariables.includes(variable)) { // check if variable if defined
              shouldProceed.variable = true
            } else {
              ErrorOperations.variableUnknown(readLinesOriginal, errors, x, variable) // variable not defined
            }
          }
          else { // it is a string or a number, so proceed
            shouldProceed.variable = true
          }
        } else {
          ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, variable)
        }

        if (shouldProceed.array && shouldProceed.variable) {
          return ArrayOperations.convertToPush(x)
        } else {
          return x
        }
      }
    }

    // ---------- Remove ---------
    // similar to the push
    if (ArrayOperations.isRemoveWithBrackets(x) || ArrayOperations.isRemoveWithoutBrackets(x)) {
      if (!ArrayOperations.isRemoveFunctionWrittenProperly(x)) {
        ErrorOperations.operationNotWrittenProperly(readLinesOriginal, errors, x);
      } else {

        let { array, variable } = ArrayOperations.getRemoveVariableAndArray(x) // get variable and array
        let isArrayValid = VariableOperations.isVariableValid(array) == "checkVariable";
        let isVariableValid = VariableOperations.isVariableValid(variable) !== 'isInValid';
        let shouldProceed = { array: false, variable: false };

        // deal with the array
        if (isArrayValid) { // array name is valid
          if (definedArrays.includes(array)) {
            shouldProceed.array = true;
          } else {
            ErrorOperations.variableUnknown(readLinesOriginal, errors, x, array)
          }
        } else {
          ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, array)
        }

        // deal with the variable
        if (isVariableValid) { // array name is valid

          if (VariableOperations.isVariableValid(variable) == "checkVariable") {

            if (definedVariables.includes(variable)) { // check if variable if defined
              shouldProceed.variable = true
            } else {
              ErrorOperations.variableUnknown(readLinesOriginal, errors, x, variable) // variable not defined
            }

          } else { // it is a string or number, so proceed
            shouldProceed.variable = true;
          }
        } else {
          ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, variable)
        }

        if (shouldProceed.array && shouldProceed.variable) {
          return ArrayOperations.convertToRemove(variable, array)
        } else {
          return x
        }
      }
    }

    // Includes check

    if (ArrayOperations.isIncludesWithBrackets(x) || ArrayOperations.isIncludesWithoutBrackets(x)) {
      if (!ArrayOperations.isIncludesFunctionWrittenProperly(x)) {
        ErrorOperations.operationNotWrittenProperly(readLinesOriginal, errors, x);
      } else {

        let { array, variable } = ArrayOperations.getIncludesVariableAndArray(x) // get variable and array
        let isArrayValid = VariableOperations.isVariableValid(array) == "checkVariable";
        let isVariableValid = VariableOperations.isVariableValid(variable) !== 'isInValid';
        let shouldProceed = { array: false, variable: false };

        // deal with the array
        if (isArrayValid) { // array name is valid
          if (definedArrays.includes(array)) {
            shouldProceed.array = true;
          } else {
            ErrorOperations.variableUnknown(readLinesOriginal, errors, x, array)
          }
        } else {
          ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, array)
        }

        // deal with the variable
        if (isVariableValid) { // array name is valid
          if (VariableOperations.isVariableValid(variable) == "checkVariable") {
            if (definedVariables.includes(variable)) { // check if variable if defined
              shouldProceed.variable = true
            } else {
              ErrorOperations.variableUnknown(readLinesOriginal, errors, x, variable) // variable not defined
            }
          } else { // it is string, or number, so proceed
            shouldProceed.variable = true
          }
        } else {
          ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, variable)
        }

        if (shouldProceed.array && shouldProceed.variable) {

          return ArrayOperations.convertToIncludes(x)
        } else {
          return x
        }
      }
    }

    // Sort Check
    if (ArrayOperations.isSortFunction(x)) {
      if (!ArrayOperations.isSortFunctionWrittenProperly(x)) { // length function not properly written
        ErrorOperations.operationNotWrittenProperly(readLinesOriginal, errors, x)
      }

      var nameOfArray = ArrayOperations.getSortArray(x); // name of array

      if (VariableOperations.isVariableValid(nameOfArray) !== "checkVariable") {
        ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, nameOfArray)
      } else {
        if (definedArrays.includes(nameOfArray)) { // array is valid
          return ArrayOperations.convertToSort(x);
        } else {
          ErrorOperations.variableUnknown(readLinesOriginal, errors, x, nameOfArray);
        }

      }
    }

    // break and continue
    if (ArrayOperations.isBreakOrContinue(x)) {
      if (ArrayOperations.isBreakOrContinueWrittenProperly(x)) {
        return ArrayOperations.convertToBreakOrContinue(x);
      } else {
        ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, x)
      }
    } else {
      return x;
    }
  });
  return readLines
}
