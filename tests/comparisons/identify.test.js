/**
 * 
 * These tests are for indentifying comparison operations
 */

import { ComparisonOperations } from "../../Operations/comparisonOperations";


const strings = [
    `x akafanana na y`,
    `x rakafanana ne y`,
    `23 chakaenzana na t`,
    `x mudiki pana y`,
    `"x" mudiki pane y`,
    `x idiki pana y`,
    `x ari mudiki pana y`,
    `x pana y`,
    `kana x akafanana na y`,
    `kana x ari muhombe pana y`,
    `x yz ihombe kupfuura a`,
    `nyora(x mudiki pane 23)`
];

// equal operation strings
const equalMatcherStringsAdded = [
];
// words has -akafanana na/ne and -akaenzana na/ne
const equalMatcherStringsWritten = [
    `x akafanana na y`,
    `x rakafanana ne y`,
    `23 chakaenzana na t`,
    `kana x akafanana na y`
];

// less comparison strings 
const lessMatcherStringsAdded = [];

const lessMatcherStringsWritten = [
    `x mudiki pana y`,
    `"x" mudiki pane y`,
    `x idiki pana y`,
    `x ari mudiki pana y`,
    `nyora(x mudiki pane 23)`
];


// more comparison string 
const moreMatcherStringsAdded = [];

const moreMatcherStringsWritten = [
    `kana x ari muhombe pana y`,
    `x yz ihombe kupfuura a` 
]

// test the equal comparison
test('is equal comparison', () => {
    let shouldBeFalse = [3,4,5,6,7,9,10,11];

    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let isEqualComparison = ComparisonOperations.isEqualComparison(string)
        if (!shouldBeFalse.includes(i)) {
            expect(isEqualComparison).toBe(true);
            equalMatcherStringsAdded.push(string)
        } else {
            expect(isEqualComparison).toBe(false)
        }
    }

    let x = JSON.stringify(equalMatcherStringsWritten).replace(/\\/g, "");
    let y = JSON.stringify(equalMatcherStringsAdded).replace(/\\/g, "");
    expect(x).toBe(y)


});

// test the less comparison
test('is less comparison', ()=> {
    let shouldBeFalse = [0,1,2,7,8,9,10];

    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let isLessComparison = ComparisonOperations.isLessComparison(string);
        if (!shouldBeFalse.includes(i)) {
            expect(isLessComparison).toBe(true);
            lessMatcherStringsAdded.push(string)
        } else {
            expect(isLessComparison).toBe(false)
        }
    }

    let x = JSON.stringify(lessMatcherStringsWritten).replace(/\\/g, "");
    let y = JSON.stringify(lessMatcherStringsAdded).replace(/\\/g, "");
    expect(x).toBe(y);
});

// test the more comparison

test('is more comparison', ()=> {
    let shouldBeFalse = [0,1,2,3,4,5,6,7,8, 11];

    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let isMoreComparison = ComparisonOperations.isMoreComparison(string)
        if (!shouldBeFalse.includes(i)) {
            expect(isMoreComparison).toBe(true);
            moreMatcherStringsAdded.push(string)
        } else {
            expect(isMoreComparison).toBe(false)
        }
    }

    let x = JSON.stringify(moreMatcherStringsWritten).replace(/\\/g, "");
    let y = JSON.stringify(moreMatcherStringsAdded).replace(/\\/g, "");
    expect(x).toBe(y);
});

