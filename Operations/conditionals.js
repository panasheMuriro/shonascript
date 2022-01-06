/**
 * conditional operations
 *  starts with kana 
 * This highly depend on comparisons
 * should run before the comparisons
 * 2 or more if statements should not be in the same line
 */

import { ErrorOperations } from "./errorOperations.js";


export const ConditionalOperations = {
    isConditionalIF: (arg) => {
        var kanaMatcher = /\bkana\b/;
        return kanaMatcher.test(arg);
    },
    conditionalMissingCurlyBracket: (arg) => { // opening curly bracket is required
        return !/{/.test(arg)
    },

    isConditionalElse: (arg) => {
        var zvimwe = /\bzvimwe\b/;
        return zvimwe.test(arg)
    },

    convertToIf: (arg) => {
        return arg.replace(/\bkana\b/, "if");
    },
    convertToElse: (arg) => {
        return arg.replace(/\bzvimwe\b/, "else");
    }
}

// ------------ Conditional Operations ---------------
// TODO: work on the edge cases of this
export const runConditionalOperations = (readLinesOriginal, readLines, errors) => {
    readLines = readLines.map((x) => {
        if (ConditionalOperations.isConditionalIF(x)) {
            if (ConditionalOperations.conditionalMissingCurlyBracket(x)) {
                ErrorOperations.missingOpeningCurlyBracket(readLinesOriginal, errors, x) // borrowing the error from the similar array loop error
            } else {
                return ConditionalOperations.convertToIf(x)
            }
        }
        if (ConditionalOperations.isConditionalElse(x)) {
            return ConditionalOperations.convertToElse(x)
        }
        else {
            return x;
        }
    });
    return readLines;
}