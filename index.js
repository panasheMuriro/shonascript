import fs, { read } from "fs";
import chalk from "chalk";
import { runDebuggerOperations } from "./Operations/debuggerOperations.js";
import { runVariableOperations } from "./Operations/variables.js";
import { runMathOperations } from "./Operations/math.js";
import { runComparisonOperations } from "./Operations/comparisonOperations.js";
import { runConditionalOperations } from "./Operations/conditionals.js";
import { runArrayOperations } from "./Operations/arrayOperations.js";
import { runStringOperations } from "./Operations/stringOperations.js";
import { runFunctionOperations } from "./Operations/functionOperations.js";
import { runTimeOperations } from "./Operations/timeOperations.js";
import { runInputOperations } from "./Operations/inputOperations.js";
import { runErrorOperations } from "./Operations/errorOperations.js";
import { runCommentOperations } from "./Operations/commentOperations.js";

// Main function --> runs all the operations of shonascript
const tangaBasa = () => {
    const errors = []; // collect errors
    const definedVariables = []; // collect defined variables
    const definedFunctions = []; // collect defined function names
    const definedFunctionArgs = []; // collect defined function arg
    const definedArrays = []; // collect defined array names
    const functionArgCounter = {}; // coolect the number of arguments requored by a function
    const functionType = {}; // collect the types of functions -- regular | interval | timeout 
    const definedInputVariables = []; // collect teh variables of created terminal input operations by 'teerera mhinduro'
    const linesWithLastBracketsForPrompt = []; // collect the lines to be closed by a '})' for the 'tora mhinduro' operation

    fs.readFile("index.shona", "utf-8", (err, result) => { // read data from the 'index.shona' file

        // read text from the index.shona file separate them by the new line, so as to read each and every line separately
        var readLines = result.split(/[\n]/);

        // keep the original lines from the index.shona to reeference when throwing errors
        let readLinesOriginal = readLines; 

        // remove the empty strings
        readLines = readLines.filter(x =>x.replace("\r","") !== "");

        // ignore the comments
        readLines = runCommentOperations(readLines);

        // Deal with variable decalrations here
        readLines = runVariableOperations(readLinesOriginal, readLines, definedVariables, errors);

        //------------ Input Operations using the NPM Prompt -----------------
        readLines = runInputOperations(readLinesOriginal, readLines, errors, definedVariables, definedInputVariables, linesWithLastBracketsForPrompt);

        // close the input promise bracket with '})' 
        linesWithLastBracketsForPrompt.map((x) => {
            readLines[x - 1] = readLines[x - 1].replace(/(})(?!.*\1)/g, "})");
          });

        // Math Operations
        readLines = runMathOperations(readLinesOriginal, readLines, definedVariables, errors)

        // Array Operations
        readLines = runArrayOperations(readLinesOriginal, readLines, errors, definedVariables, definedArrays)

        // Comparison Operations
        readLines = runComparisonOperations(readLinesOriginal, readLines, errors, definedVariables);

        //------------ Conditional Operations -----------
        // Should come after comparisons
        readLines = runConditionalOperations(readLinesOriginal, readLines, errors)

        // ---------- String Operations ------------
        readLines = runStringOperations(readLinesOriginal, readLines, errors, definedVariables);

        //------------- Function Operations ------------
        readLines = runFunctionOperations(readLinesOriginal, readLines, errors, definedFunctions, definedVariables, definedFunctionArgs, functionArgCounter, functionType)

        // ------------ Time and Date Operations   -----------
        readLines = runTimeOperations(readLines)

        // close the matching bracket for the promise from the prompt
       

        // Debugger Operations
        readLines = runDebuggerOperations(readLinesOriginal, readLines, errors, definedVariables, definedArrays, definedInputVariables);

        // clear the document first
        fs.writeFile("index-test.js", "", (err, result) => {
            // do nothing
        });

        // add the needed packages -- prompt and chalk
        fs.appendFileSync(
            "index-test.js",
            `import chalk from "chalk" \nimport prompt from 'prompt' \n `,
            (err, result) => {
                if (err) {
                    console.error(err)
                } else {
                    // do nothing
                }
            }
        );

        // check for errors
       runErrorOperations(readLines, errors, fs, chalk)

    });

    // ignore the empty strings
    const ignoreEmptyStrings = (array) => {
        var returnArray = [];
        array.map((x) => {
            x !== "" && returnArray.push(x.replace("\r", ""));
        });
        return returnArray;
    };
};

export default tangaBasa;
