/**
 * This is responsible for managing the user input
 * @dependency - prompt - npm i prompt
 * called with teerera mhinduro {mhinduroName}
 */

import { ErrorOperations } from "./errorOperations.js";
import { VariableOperations } from "./variables.js";

export const InputOperations = {
  inputMatcher: /\bt[e]+rera\s*mhinduro\s*[\w"']*/g,

  isInput: (arg) => {   // is 'teerera mhinduro x'
    return InputOperations.inputMatcher.test(arg);
  },

  isInputOperationWrittenProperly: (arg) => {   // should have a valid variable
    let matcher = /\bteerera\s+mhinduro\s+[\w]*\b/g;
    return matcher.test(arg);
  },
  
  getInputVariable: (arg) => { // get the variable name from 'tora/teerera mhinduro'
    let eraser = /\b(?:teerera|mhinduro|tora)\b/g; 
    arg = arg.replace(eraser, "").replace(/[\{\}]/g, "").trim();
    return arg;
  },

  convertToInput: (arg) => {   // convert to the input operation with the npm prompt dependency
    let inputVariable = InputOperations.getInputVariable(arg);
    return `
let promise${inputVariable} = new Promise(function(resolve, reject) {
prompt.start({ message: "mhinduro" });
prompt.get('${inputVariable}', function (err, result) {
    if(typeof Number(result.${inputVariable}) == "number" && !isNaN(Number(result.${inputVariable}))){
      resolve(Number(result.${inputVariable}))
    }else{
      resolve(result.${inputVariable})
    }
    });
  });`;
  },


  isGetInputResult: (arg) => {   // is 'tora mhinduro'
    let matcher = /\btora\s*mhinduro\s*[\w]*/g;
    return matcher.test(arg);
  },

  missingCurlyBracket: (arg) => { // there should be a curly bracket when using tora mhinduro
    return !/{/.test(arg)
  },

  // if get tora mhinduro has been detected, start counting the open and closing brackets using the stack,
  detectLastClosingBracket: (args) => {
    let stack = []; // use the stack method, if you see an opening bracket, add it, if it is a closing one, remove one opening bracket from the stack
    let matcher = /\{|\}/g;
    var index = 0
    args.map((x) => {
      if (x.match(matcher)) {
        x.match(matcher).map((y) => {
          if (y == "{") {
            stack.push(y);
          } else {
            if (stack.length == 0) {
              return index;
            }
            stack.pop();
          }
          if (stack.length == 0) {
            index = args.indexOf(x) // last closing bracket index
          }
        });
      }
    });
    return index
  },

  // helper -->  counts the open and closing brackets after detecting 'tora mhinduro' so as to close the right bracket with a ')'
  countBrackets: (args, index) => {
    let readLinesSlice = args.slice(index, args.length);
    let lastBracket = InputOperations.detectLastClosingBracket(readLinesSlice);
    return lastBracket + index + 1;
  },

  
  convertToInputPromise: (arg, inputVar) => { // convert to the JS promise result input operation 
    let matcher = /\btora\s*mhinduro\s*[\w"']*/g;
    arg = arg.replace(matcher, `
      promise${inputVar}.then((${inputVar}) =>`);
    return arg
  }

};


//----------- Input Operations -----------

export const runInputOperations = (readLinesOriginal, readLines, errors, definedVariables, definedInputVariables, linesWithLastBracketsForPrompt) => {
  readLines = readLines.map((x) => {
    if (InputOperations.isInput(x)) {
      if (InputOperations.isInputOperationWrittenProperly(x)) {
        let inputVar = InputOperations.getInputVariable(x); // get the name of the input
        if (VariableOperations.isVariableValid(inputVar) !== "checkVariable") { // is the variable name written correctly
          ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, inputVar) // throw error
        } else { // it is a variable
          definedVariables.push(inputVar); // save the variable to all variables
          definedInputVariables.push(inputVar); // save the variable to defined input variables
          return InputOperations.convertToInput(x);
        }
      } else { // input operation is not written correctly
        ErrorOperations.operationNotWrittenProperly(readLinesOriginal, errors, x); // throw relevant error
      }
    } else if (InputOperations.isGetInputResult(x)) { // is the 'tora mhinduro' operation

      if(InputOperations.missingCurlyBracket(x)){ // should have an opening curly bracket on the smae line
        ErrorOperations.missingOpeningCurlyBracket(readLinesOriginal, errors,x) // borrowing from the related array Errors 
      }

      let inputVar = InputOperations.getInputVariable(x); // get the tora mhinduro variable
      if (VariableOperations.isVariableValid(inputVar) == "checkVariable") { // should be a variabl
        if (!definedInputVariables.includes(inputVar)) { // should be defined as an input variables
          ErrorOperations.variableUnknown(readLinesOriginal, errors, x, inputVar); // throw error
        } else {
          let lineWithLastBracket = InputOperations.countBrackets(readLines, readLines.indexOf(x)); // get the line with the last closing '}' after 'tora mhinduro' so as to close it with '})'
          linesWithLastBracketsForPrompt.push(lineWithLastBracket); // push all these last lines into an array
    
          return InputOperations.convertToInputPromise(x, inputVar);// proceed with conversion
        }
      } else { // is not a variable 
        ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, inputVar); // throw error
      }
    } else {
      return x;
    }
  });
  return readLines;
}