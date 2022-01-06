/**
 * Identify Operations which prompt the user to input something into the terminal
 */

import { InputOperations } from "../../Operations/inputOperations";
import { VariableOperations } from "../../Operations/variables";

const strings = [
    `teerera mhinduro zita`,
    `terera mhinduro zita`,
    `tora mhinduro zita`,
    `teerera mhinduro #zita`,
    `teerera mhindur #zita`,
    `teerera mhinduro 23`,
    `tora mhinduro zita[]`,
    `tora mhinduro zita{}`,
];

const validAddedStrings = [];

const validWrittenStrings = [
    `teerera mhinduro zita`,
    `tora mhinduro zita`,
    `teerera mhinduro #zita`,
    `teerera mhinduro 23`,
    `tora mhinduro zita[]`,
    `tora mhinduro zita{}`,
];

// detect the input operations
test('is input operation', () => {
    let shouldBeFalse = [1, 4];
    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let isInputTake = InputOperations.isInput(string);
        let isInputUse = InputOperations.isGetInputResult(string);
        let isInput = isInputUse || isInputTake;
        if (!shouldBeFalse.includes(i)) {
            expect(isInput).toBe(true);
            validAddedStrings.push(string)
        } else {
            expect(isInput).toBe(false);
        }
    }
    let x = JSON.stringify(validAddedStrings).replace(/\\/g, "");
    let y = JSON.stringify(validWrittenStrings).replace(/\\/g, "");
    expect(x).toBe(y)

    // terera mhinduro is not correctly written
    let string = strings[1];
    let isCorrectlyWritten = InputOperations.isInputOperationWrittenProperly(string);
    expect(isCorrectlyWritten).toBe(false)

});

// validate the input argument
test('is input variable valid', () => {
    let shouldBeFalse = [2, 3, 4];

    for (let i = 0; i < validWrittenStrings.length; i++) {
        let string = validWrittenStrings[i];
        let variable = InputOperations.getInputVariable(string);
        let isValid = VariableOperations.isVariableValid(variable) == "checkVariable";
        if (!shouldBeFalse.includes(i)) {
            expect(isValid).toBe(true)
        } else {
            expect(isValid).toBe(false)
        }
    }
});


// check the missing open curly bracket for "tora mhinduro"
test('is curly bracket missing', () => {
    expect(InputOperations.missingCurlyBracket(validWrittenStrings[1])).toBe(true); // tora mhinduro zita
    expect(InputOperations.missingCurlyBracket(validWrittenStrings[4])).toBe(true); // tora mhinduro zita[]
    expect(InputOperations.missingCurlyBracket(validWrittenStrings[5])).toBe(false); // tora mhinduro zita{}
});