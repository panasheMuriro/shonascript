import { ArrayOperations } from "../../Operations/arrayOperations";
import { VariableOperations } from "../../Operations/variables";

// remove operation is very similar to the remove

const strings = [
    `bvisa munhu mu vanhu`,
    `vanhu.bvisa(munhu)`,
    `bvisa "panashe" mu vanhu`,
    `bvisa "panashe" mu 23`,
    `vanhu.bvisa("panashe")`,
    `23.bvisa("panashe")`,
    `5.bvisa(#panashe)`,
    `bvisa x y mu #vanhu`

];

const validAddedStrings = [];

const validWrittenStrings = [
    `bvisa munhu mu vanhu`,
    `vanhu.bvisa(munhu)`,
    `bvisa "panashe" mu vanhu`,
    `bvisa "panashe" mu 23`,
    `vanhu.bvisa("panashe")`,
    `23.bvisa("panashe")`,
    `5.bvisa(#panashe)`,
    `bvisa x y mu #vanhu`
];


// identify array remove function
test('is array remove function', ()=> {
    let shouldBeFalse = [];
    for(let i=0; i< strings.length; i++){
        let string = strings[i];
        let isRemoveFunction = ArrayOperations.isRemoveWithBrackets(string) || ArrayOperations.isRemoveWithoutBrackets(string);

        if(!shouldBeFalse.includes(i)){
            expect(isRemoveFunction).toBe(true);
            validAddedStrings.push(string)
        }else{
            expect(isRemoveFunction).toBe(false)
        }   
    }

    let x = JSON.stringify(validAddedStrings).replace(/\\/g,"");
    let y = JSON.stringify(validWrittenStrings).replace(/\\/g, "");
    expect(x).toBe(y)
});


// validate the arguments
test('is variable and array name valid', ()=> {
    let shouldBeFalseArray = [3,5,6,7];
    let shouldBeFalseVariable = [6,7];

    for(let i=0; i< validWrittenStrings.length; i++){
        let string =validWrittenStrings[i];

        let {array, variable} = ArrayOperations.getRemoveVariableAndArray(string); // get the variable and the array name
        let isArrayValid = VariableOperations.isVariableValid(array) == "checkVariable";
        let isVariableValid = VariableOperations.isVariableValid(variable) !== 'isInValid';

        if(!shouldBeFalseArray.includes(i)){ // deal with the array
            expect(isArrayValid).toBe(true);
        }else{
            expect(isArrayValid).toBe(false)
        }   

        if(!shouldBeFalseVariable.includes(i)){ // deal with the variable
            expect(isVariableValid).toBe(true);
        }else{
            expect(isVariableValid).toBe(false)
        }   

    }
});







// if (ArrayOperations.isRemove(x)) {
//     // is not regular
//     if (!ArrayOperations.isRegularRemoveFunction(x)) {
//       if (!ArrayOperations.isOtherRemoveFunctionProperlyWritten(x)) {
//         errors.push(`manyorero awaita '${x}' hassiriwo`);
//       }
//     }

//     // it is properly written, so get the variables
//     let removeVar = ArrayOperations.getVariableAndArrayRemove(x).variable;
//     let removeArray = ArrayOperations.getVariableAndArrayRemove(x).array;
//     var shouldProceed = { variable: false, array: false };

//     if (VariableOperations.isVariableValid(removeVar) == "isValid") {
//       shouldProceed.variable = true;
//     }

//     if (
//       !VariableOperations.isVariableValid(removeArray) == "checkVariable"
//     ) {
//       errors.push(
//         `manyorero awaita ${removeArray} haasiriwo paline ${readLines.indexOf(x) + 1
//         }`
//       );
//     }
//     if (VariableOperations.isVariableValid(removeArray) == "isInValid") {
//       errors.push(
//         `manyorero awaita ${removeArray} haasiriwo paline ${readLines.indexOf(x) + 1
//         }`
//       );
//     }

//     if (VariableOperations.isVariableValid(removeVar) == "isInValid") {
//       errors.push(
//         `manyorero awaita ${removeVar} haasiriwo paline ${readLines.indexOf(x) + 1
//         }`
//       );
//     }

//     if (
//       VariableOperations.isVariableValid(removeArray) == "checkVariable"
//     ) {
//       if (definedArrays.includes(removeArray)) {
//         // proceed
//         shouldProceed.array = true;
//       } else {
//         errors.push(
//           `'${removeArray}' haasi kuzivikanwa paline ${readLines.indexOf(x) + 1
//           }`
//         );
//       }
//     }

//     if (VariableOperations.isVariableValid(removeVar) == "checkVariable") {
//       if (definedVariables.includes(removeVar)) {
//         // proceed
//         shouldProceed.variable = true;
//       } else {
//         errors.push(
//           `'${removeVar}' haasi kuzivikanwa paline ${readLines.indexOf(x) + 1
//           }`
//         );
//       }
//     }
//     if (shouldProceed.variable && shouldProceed.array) {
//       return `let value = ${removeVar} \n${removeArray} = ${removeArray}.filter(item => item !== value)`;
//     }
//   }
