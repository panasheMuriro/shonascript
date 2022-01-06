/**
 * Tests to do with strings in here
 */

import { StringOperations } from "../../Operations/stringOperations";



const strings = [
    `message.tsemuraMashoko()`,
    `message.tsemuraMa()`,
    `message.tsemura()`,
    `message.tsemuraMavara()`,
    `message.batanidza`,
    `message.batanidza()`,
    `"message yangu".tsemuraMashoko()` // only allow variables
];


// added from the valid strings above
const validAddedStrings = [
];

const validWrittenStrings = [
    `message.tsemuraMashoko()`,
    `message.tsemuraMa()`,
    `message.tsemura()`,
    `message.tsemuraMavara()`,
    `message.batanidza`,
    `message.batanidza()`,
    `"message yangu".tsemuraMashoko()`
];

// strings which are written correctly
const correctlyWrittenStringsAdded = [
];

const correctlyWrittenStringsWritten = [
    `message.tsemuraMashoko()`,
    `message.tsemuraMavara()`,
    `message.batanidza()`,
];


// identify the split and join functions
test('is split or join string function', () => {
    let shouldBeFalse = [];

    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let isSplit = StringOperations.isSplit(string);
        let isJoin = StringOperations.isJoin(string);
        let isValid = isSplit || isJoin;
        if (!shouldBeFalse.includes(i)) {
            expect(isValid).toBe(true);
            validAddedStrings.push(string)
        } else {
            expect(isValid).toBe(false)
        }

        let isCorrectlyWrittenSplit = StringOperations.isSplitFunctionWrittenProperly(string);
        let isCorrectlyWrittenJoin = StringOperations.isJoinFunctionProperlyWritten(string);
        let isCorrect = isCorrectlyWrittenJoin || isCorrectlyWrittenSplit;

        if (isCorrect) {
            correctlyWrittenStringsAdded.push(string);
        }
    }

    let x = JSON.stringify(validAddedStrings).replace(/\\/g, "");
    let y = JSON.stringify(validWrittenStrings).replace(/\\/g, "");
    expect(x).toBe(y);

    let a = JSON.stringify(correctlyWrittenStringsAdded).replace(/\\/g, "");
    let b = JSON.stringify(correctlyWrittenStringsWritten).replace(/\\/g, "");
    expect(a).toBe(b);
});


// get the work string and variables and then check them with the Variable operations




