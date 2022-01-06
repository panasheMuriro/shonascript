/**
 * Function call tests
 */

import {FunctionOperations} from "../../Operations/functionOperations";
import { VariableOperations } from "../../Operations/variables";


const strings = [
    `tangabasa.mhoresaMunhu(){`,
    `tangabas.mhoresaMunhu(){`,
    `tangabasamhoresaMunhu(){`,
    `tangaBasa.mhoresa(munhu)`,
    `tangabasa.mhoresa(munhu1, munhu2)`,
    `tangaBasa.munhu(x,y,z)`,

];

const validAddedStrings = [];

const validWrittenStrings = [
    `tangabasa.mhoresaMunhu(){`,
    `tangabasamhoresaMunhu(){`,
    `tangaBasa.mhoresa(munhu)`,
    `tangabasa.mhoresa(munhu1, munhu2)`,
    `tangaBasa.munhu(x,y,z)`,

];

const validFunctionCallStrings = [
]
// has `tangaBasa.mhoresa(munhu)`,  `tangaBasa.munhu(x,y,z)`,

// identify function calls

test('is function call', () => {
    let shouldBeFalse = [1];

    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let isFunctionCall = FunctionOperations.isFunctionCall(string);
        if (!shouldBeFalse.includes(i)) {
            expect(isFunctionCall).toBe(true);
            validAddedStrings.push(string);
        } else {
            expect(isFunctionCall).toBe(false)
        }
    }

    let x = JSON.stringify(validAddedStrings).replace(/\\/g, "");
    let y = JSON.stringify(validWrittenStrings).replace(/\\/g, "");
    expect(x).toBe(y)


});

// check if function call written properly
test('is function call written properly', () => {
    let shouldBeFalse = [0, 1, 3];

    for (let i = 0; i < validWrittenStrings.length; i++) {
        let string = validWrittenStrings[i];
        let isCorrect = FunctionOperations.isFunctionCallWrittenProperly(string);

        if (!shouldBeFalse.includes(i)) {
            expect(isCorrect).toBe(true);
            validFunctionCallStrings.push(string)
        } else {
            expect(isCorrect).toBe(false)
        }
    }
});

// is function name valid
test('validate the function name', () => {
    let shouldBeFalse = [];
    for (let i = 0; i < validFunctionCallStrings.length; i++) {
        let string = validFunctionCallStrings[i];

        let fName = FunctionOperations.getFunctionCallNameAndArgs(string).fName;
        let isValid = VariableOperations.isVariableValid(fName) == "checkVariable";

        if (!shouldBeFalse.includes(i)) {
            expect(isValid).toBe(true);
        } else {
            expect(isValid).toBe(false)
        }
    }
});


// count the number of function call inputs, in the valid Function call Strings created
test('count the number of inputs', () => {
    
    for (let i = 0; i < validFunctionCallStrings.length; i++) {
        let string = validFunctionCallStrings[i];
        let hasInputs = FunctionOperations.hasArgs(string);
        if(hasInputs){ // there is now a new array with all functions that have inputs
            expect(FunctionOperations.getFunctionCallNameAndArgs(validFunctionCallStrings[0]).fArgs.length).toBe(1);
            expect(FunctionOperations.getFunctionCallNameAndArgs(validFunctionCallStrings[1]).fArgs.length).toBe(3);
        }
    }
});
