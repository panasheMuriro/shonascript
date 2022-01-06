/**
 * String operations includes 2 of the most important ones:
 * Split - tsemuraMashoko, tsemuraMavara
 * Join - batanidza - will join where there are commas
 */

import { ErrorOperations } from "./errorOperations.js";
import { VariableOperations } from "./variables.js";

export const StringOperations = {
  tsemuraMatcher: /\.tsemura/,
  batanidzaMatcher: /\.batanidza/,

  isSplit: (arg) => {
    return StringOperations.tsemuraMatcher.test(arg); // match .tsemura and .batanidza
  },

  getWorkStringSplit: (arg) => {
    let matcher = /\b\w*.tsemura(?:Mashoko|Mavara)\(.*\)/g;
    try { // try to get the work string, if this is not possible, then there is a problem
      return arg.match(matcher)[0];
    } catch (e) {
      return undefined // work string cannot be created so it is undefined
    }
  },

  isSplitFunctionWrittenProperly: (arg) => {
    let workString;
    try {
      workString = StringOperations.getWorkStringSplit(arg).trim();// only look at the work string
    } catch (e) {
      // do nothing
    }
    let matcher = /.tsemura(?:Mashoko|Mavara)\(\s*\)/; //match tsemuraMashoko() and tsemuraMavara()
    if (workString == undefined) { // no work string
      return false
    } else { // there is a valid work string
      return matcher.test(workString);
    }
  },


  getStringSplit: (arg) => { // get the string to be split into words or letters
    arg = StringOperations.getWorkStringSplit(arg)
    let matcher = /.tsemura(?:Mashoko|Mavara)\(\s*\)/;
    return arg.split(matcher)[0];
  },

  convertWorkStringToSplit: (arg) => {

    arg = StringOperations.getWorkStringSplit(arg);
    let matcherWords = /.tsemuraMashoko\s*\(\s*\)/;
    let matcherChars = /.tsemuraMavara\s*\(\s*\)/;

    if (matcherWords.test(arg)) {
      return arg.replace(matcherWords, `.split(" ")`); // will split into words
    } else if (matcherChars.test(arg)) {
      return arg.replace(matcherChars, `.split("")`); // will split into letters
    }
  },

  convertToSplit: (arg) => {
    let workString = StringOperations.getWorkStringSplit(arg).trim();
    let workStringConverted = StringOperations.convertWorkStringToSplit(arg)
    return arg.replace(workString, workStringConverted)
  },



  // ------  Join ------------
  isJoin: (arg) => {
    return StringOperations.batanidzaMatcher.test(arg);
  },

  getWorkStringJoin: (arg) => {
    let matcher = /\b\w*.batanidza\s*\(\s*\)/g;
    try {
      return arg.match(matcher)[0]
    }
    catch (e) {
      return undefined
    }
  },

  isJoinFunctionProperlyWritten: (arg) => {
    let matcher = /.batanidza\(\s*\)/g;
    let workString;
    try {
      workString = StringOperations.getWorkStringJoin(arg).trim();
    } catch (e) {
      // do nothing
    }

    if (!workString) {
      return false
    } else {
      return matcher.test(arg);
    }
  },

  getStringJoin: (arg) => { // get the string to be joined
    let matcher = /.batanidza\(\s*\)/;
    arg = StringOperations.getWorkStringJoin(arg)
    return arg.split(matcher)[0];
  },

  convertWorkStringToJoin: (arg) => {
    let matcher = /.batanidza\(\)/;
    let workString = StringOperations.getWorkStringJoin(arg).trim()
    return workString.replace(matcher, `.join("")`)
  },

  convertToJoin: (arg) => {
    let workString = StringOperations.getWorkStringJoin(arg).trim();
    let workStringConverted = StringOperations.convertWorkStringToJoin(arg);
    return arg.replace(workString, workStringConverted);
  }
};


// TODO: merge the split and join operations so as to reduce code redudancy. These operations are almost the same

export const runStringOperations = (readLinesOriginal, readLines, errors, definedVariables) => {
  readLines = readLines.map((x) => {
    if (StringOperations.isSplit(x) || StringOperations.isJoin(x)) {
      if (StringOperations.isSplit(x)) { // identify the split function
        if (StringOperations.isSplitFunctionWrittenProperly(x)) { // is written correctly
          let splitStringVariable = StringOperations.getStringSplit(x); // get the string to be split, is has to be a defined variable

          if (VariableOperations.isVariableValid(splitStringVariable) == "checkVariable") {// it should be a vdalid variable
            if (definedVariables.includes(splitStringVariable)) { // variable is correct and is defined

              return StringOperations.convertToSplit(x); // proceed with conversion
            } else { // variable is not defined
              ErrorOperations.variableUnknown(readLinesOriginal, errors, x, splitStringVariable);// throw erros
            }

          } else { // it has to be a correct variable
            ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, splitStringVariable); // throw error
          }
        } else {
          ErrorOperations.operationNotWrittenProperly(readLinesOriginal, errors, x)
        }
      }

      if (StringOperations.isJoin(x)) { // identify join string function
        if (StringOperations.isJoinFunctionProperlyWritten(x)) {
          var joinStringVariable = StringOperations.getStringJoin(x); // get the string, or array to be joined
          if (VariableOperations.isVariableValid(joinStringVariable) == "checkVariable") {// it should be a vdalid variable
            if (definedVariables.includes(joinStringVariable)) { // variable is correct and is defined

              return StringOperations.convertToJoin(x); // proceed with conversion
            } else { // variable is not defined
              ErrorOperations.variableUnknown(readLinesOriginal, errors, x, joinStringVariable);// throw erros
            }

          } else { // it has to be a correct variable
            ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, joinStringVariable); // throw error
          }
        } else {
          ErrorOperations.operationNotWrittenProperly(readLinesOriginal, errors, x); // throw error
        }
      }
    }
    else {
      return x
    }
   
  });

  return readLines
};

