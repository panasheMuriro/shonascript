/**
 * This is responsible for showing the errors made by the user upon running `node shona.js`
 */


export const ErrorOperations = {
  // General errors
  operationNotWrittenProperly: (readLinesOriginal, errors, line) => {
    errors.push(`Manyorero awaita ${line} haasiriwo pa line ${readLinesOriginal.indexOf(line) + 1}`)
  },

  // Variable Errors
  variableUnknown: (readLinesOriginal, errors, line, variable) => { // variable not defined
    errors.push(
      `'${variable}' haasi kuzivikanwa paline ${readLinesOriginal.indexOf(line) + 1
      }`
    );
  },

  variableWronglyWritten: (readLinesOriginal, errors, line, variable) => { // variable not written properly
    errors.push(
      `manyorero awaita '${variable}'  haasiriwo paline ${readLinesOriginal.indexOf(line) + 1}`
    );
  },

  // Math Errors
  mathOperationArgumentsInvalid: (readLinesOriginal, errors, line, args) => {
    errors.push(`Manyorero awaita ma nhamba e maths ${args} paline ${readLinesOriginal.indexOf(line) + 1}`)
  },

  // Array Errors
  arrayMissingAClosingBracket: (readLinesOriginal, errors, line) => { // no closing bracket on the array definition
    errors.push(`List rawanyora paline ${readLinesOriginal.indexOf(line) + 1} harina bracket ']' rekuvhara`)
  },

  missingOpeningCurlyBracket: (readLinesOriginal, errors, line) => { // no opening curly brack on the loop operation
    errors.push(`Hauna kuisa curly bracket '{' paline ${readLinesOriginal.indexOf(line) + 1}`)
  },

  // functions
  numberOfArgumentsNotMatching: (readLinesOriginal, errors, fArgs, functionArgCounter, fName, line) => {
    errors.push(
      `basa rinonzi '${fName}' rinofana kupihwa ma variables ${functionArgCounter[fName] == undefined
        ? 0
        : functionArgCounter[fName]
      }, asi iwewe waisa mavariables ${fArgs.length} paline ${readLinesOriginal.indexOf(line) + 1
      }`
    );
  }
}


//------------ Error Operations ---------------
export const runErrorOperations = (readLines, errors, fs, chalk) => {
  if (errors.length > 0) {
    console.log(chalk.red("                  Paita Problem "));
    console.log(
      chalk.red("----------------------------------------------------")
    );
    errors.map((x) => { // write all the present errors to thhe terminal
      console.log(chalk.red(x));
    });
    console.log(
      chalk.red("----------------------------------------------------")
    );
  } else {
    readLines.map((x) => {
      fs.appendFileSync("index-test.js", `${x}\n`, (err, result) => { // if not errors, write the converted ShonaScript to JavaScript strings to the index.js file 
        if(err){
          console.error(err)
        }
      });
    });
  }
}