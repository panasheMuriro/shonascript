/**
 * Array Length operations  
 */

import { ArrayOperations } from "../../Operations/arrayOperations";
import { VariableOperations } from "../../Operations/variables";


const strings = [
    `vanhu.vangani()`,
    `vanhuvangani()`,
    `mabhuku.mangani()`,
    `zvinhu.zvingani`,
    `vanhu.vangani{}`,
    `"vanhu".vangani()`,
    `23.zvingani()`,
    `tangaBasa.sanganisa()`
];
const validAddedStrings = [];

const validWrittenStrings = [
    `vanhu.vangani()`,
    `mabhuku.mangani()`,
    `zvinhu.zvingani`,
    `vanhu.vangani{}`,
    `"vanhu".vangani()`,
    `23.zvingani()`


]


// is array length function
test('is array length function', () => {
    let shouldBeFalse = [1, 7];
    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let islengthFunction = ArrayOperations.islengthFunction(string);

        if (!shouldBeFalse.includes(i)) {
            expect(islengthFunction).toBe(true);
            validAddedStrings.push(string)
        } else {
            expect(islengthFunction).toBe(false)
        }
    }

    let x = JSON.stringify(validAddedStrings).replace(/\\/g, "");
    let y = JSON.stringify(validWrittenStrings).replace(/\\/g, "");
    expect(x).toBe(y)
});


// is array leght definition written correctly
test('is array length function written correctly', () => {
    let shouldBeFalse = [2, 3];

    for (let i = 0; i < validWrittenStrings.length; i++) {
        let string = validWrittenStrings[i];
        let isCorrect = ArrayOperations.islengthFunctionProperlyWritten(string);

        if (!shouldBeFalse.includes(i)) {
            expect(isCorrect).toBe(true);
        } else {
            expect(isCorrect).toBe(false)
        }

    }
})

// check array name variable, only if the funciton is defined properly
test('is array name valid', () => {

    let shouldBeFalse = [4, 5];

    for (let i = 0; i < validWrittenStrings.length; i++) {
        let string = validWrittenStrings[i];
       
        let arrayName = ArrayOperations.getArrayNameLength(string);
        let isValid = VariableOperations.isVariableValid(arrayName) == "checkVariable";

        if (!shouldBeFalse.includes(i)) {
            expect(isValid).toBe(true);
        } else {
            expect(isValid).toBe(false)
        }

    }
})



