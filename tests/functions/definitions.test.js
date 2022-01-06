/**
 * Test the regular functions definitions
 */

import {FunctionOperations} from "../../Operations/functionOperations";
import { VariableOperations } from "../../Operations/variables";


const strings = [
    `basa mhoresaMunhu(){`,
    `basa dzokorora 1 second mhoresaMunhu(){`,
    `basa dzokorora 1 seco mhoresaMunhu(){`,
    `basa sanganisa( ){}`,
    `basa mhoresaMunhu(23,23){`,
    `basa mhoresa Munhu(){`,
    `basa mirira 2 seconds mhoresa(munhu){}`,
    `basa mirira 1 second mhoresa(){}`,
    `basa dzokorora 1 second mhoresaMunhu(x,y){`,
    `basa mhoresaMunhu(x,y,z){`,
];


const validAddedStrings = [];

const validWrittenStrings = [
    `basa mhoresaMunhu(){`,
    `basa sanganisa( ){}`,
    `basa mhoresaMunhu(23,23){`,
    `basa dzokorora 1 second mhoresaMunhu(){`,
    `basa mirira 2 seconds mhoresa(munhu){}`,
    `basa mirira 1 second mhoresa(){}`,
    `basa dzokorora 1 second mhoresaMunhu(x,y){`,
    `basa mhoresaMunhu(x,y,z){`,
];


let validFunctionsWithInputs = [];

// identify a regular function
test('is regular function definition', () => {
    let shouldBeFalse = [1, 2, 5, 6, 7, 8];

    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let isRegularFunction = FunctionOperations.typeOfFunction(string) == "regular"
        if (!shouldBeFalse.includes(i)) {
            expect(isRegularFunction).toBe(true);
            validAddedStrings.push(string)
        } else {
            expect(isRegularFunction).toBe(false)
        }
    }
});

// identify a interval function
test('is interval function definition', () => {
    let shouldBeFalse = [0, 2, 3, 4, 5, 6, 7, 9];

    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let isIntervalFunction = FunctionOperations.typeOfFunction(string) == "interval"

        if (!shouldBeFalse.includes(i)) {
            expect(isIntervalFunction).toBe(true);
            validAddedStrings.push(string)
        } else {
            expect(isIntervalFunction).toBe(false)
        }
    }
});

// identify a regular function
test('is timeout function definition', () => {
    let shouldBeFalse = [0, 1, 2, 3, 4, 5, 8, 9];

    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let isTimeoutFunction = FunctionOperations.typeOfFunction(string) == "timeout"
        if (!shouldBeFalse.includes(i)) {
            expect(isTimeoutFunction).toBe(true);
            validAddedStrings.push(string)
        } else {
            expect(isTimeoutFunction).toBe(false)
        }
    }
});

// identify inputs
test('has inputs', () => {
    let shouldBeFalse = [0, 1, 3, 5];

    for (let i = 0; i < validWrittenStrings.length; i++) {
        let string = validWrittenStrings[i];
        let hasArgs = FunctionOperations.hasArgs(string);

        if (!shouldBeFalse.includes(i)) {
            validFunctionsWithInputs.push(string);
            expect(hasArgs).toBe(true);
        } else {
            expect(hasArgs).toBe(false);
        }
    }
});

// count inputs in the function's brackets
test('count the number of inputs', () => {
    for (let i = 0; i < validFunctionsWithInputs.length; i++) {
        let string = validFunctionsWithInputs[i];
        let hasInputs = FunctionOperations.hasArgs(string);

        if(hasInputs){ // there is now a new array with all functions that have inputs
            expect(FunctionOperations.getFunctionNameAndArgs(validFunctionsWithInputs[0]).fArgs.length).toBe(2);
            expect(FunctionOperations.getFunctionNameAndArgs(validFunctionsWithInputs[1]).fArgs.length).toBe(1);
            expect(FunctionOperations.getFunctionNameAndArgs(validFunctionsWithInputs[2]).fArgs.length).toBe(2);
            expect(FunctionOperations.getFunctionNameAndArgs(validFunctionsWithInputs[3]).fArgs.length).toBe(3);
        }
    }
});





