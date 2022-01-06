/**
 * Test the seconds from the interval and timeout functions
 * Functions are taken from the definitions.test.js
 */

import {FunctionOperations} from "../../Operations/functionOperations";


// these strings are from the definitions.test.js, they are already tested for validity
const strings = [
    `basa dzokorora 1 second mhoresaMunhu(){`,
    `basa mirira 2 second mhoresa(munhu){}`,
    `basa mirira 1 second mhoresa(){}`,
];


// count get the number of seconds
// if the number of seconds is wrongly written, it doesn't pass the definitions.test.js
test('is number of seconds valid', ()=> {
    expect(FunctionOperations.getIntervalSeconds(strings[0])).toBe(1)
    expect(FunctionOperations.getTimeoutSeconds(strings[1])).toBe(2)
    expect(FunctionOperations.getTimeoutSeconds(strings[2])).toBe(1)
});






