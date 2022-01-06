
import { ErrorOperations } from "./errorOperations.js";
import { VariableOperations } from "./variables.js";

/**
 * Debugger Operations
 *  - nyora()
 */

export const DebuggerOperations = {
    isDebuggerOperation: (arg) => {
        return /\bnyora\b/g.test(arg) // match where there is the nyora keyword
    },

    getArgs: (arg) => {
        let args = []
        arg = arg.replace("nyora(", "").replace(")", ""); // strip the outer nyora function and it's bracker
        let stringMatcher = /['"].*['"]/g; // get the strings and count them
        let strings = arg.match(stringMatcher);
        if (strings) {
            strings.map(x => {
                args.push(x);
                arg = arg.replace(x, "").trim();
            });
        }
        // after removing the strings, split the args where there are commas
        let nonStrings = arg.split(",");
        if (nonStrings) {
            nonStrings.map(x => {
                args.push(x.trim())
            });
        }
        args = args.filter(x => x != ""); // get rid of the empty strings
        return args;
    },

    getOriginalArg: (arg) => {
        arg = arg.replace("nyora(", "").replace(")", "");
        return arg
    },

    convertToConsoleLog: (arg) => {
        if (/\bnyora\b/g.test(arg)) {
            return arg.replace(/\bnyora\b/g, "console.log");
        } else {
            return arg
        }
    }
}


export const runDebuggerOperations = (readLinesOriginal, readLines, errors, definedVariables, definedArrays, definedInputVariables) => {
    readLines = readLines.map((x) => {
        if (DebuggerOperations.isDebuggerOperation(x)) {
            let args = DebuggerOperations.getArgs(x);
            // validate args
            args.map((y) => {
                let isVariable = VariableOperations.isVariableValid(y) == "checkVariable";
                let isValidNumber = VariableOperations.isVariableValid(y) == "isValidNumber";
                let isValidString = VariableOperations.isVariableValid(y) == "isValid";

                if (isValidNumber || isValidString) {
                    // pass
                } else if (isVariable) {
                    if (definedVariables.includes(y) || definedInputVariables.includes(y) || definedArrays.includes(y)) {
                        // pass
                    } else { // variable unknown
                        ErrorOperations.variableUnknown(readLinesOriginal, errors, x, y);
                    }
                } else {
                    ErrorOperations.variableWronglyWritten(readLinesOriginal, errors, x, y)
                }
            });
            return DebuggerOperations.convertToConsoleLog(x);
        } else {
            return x;
        }
    });
    return readLines
}
