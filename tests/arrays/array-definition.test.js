import { ArrayOperations } from "../../Operations/arrayOperations";
import { VariableOperations } from "../../Operations/variables";



const strings = [
    `x = []`,
    `y = [`,
    `x y = []`,
    `x = {}`,
    `!name = []`,
    `23 = []`
];

const validAddedStrings = [];

const validWrittenStrings = [
    `x = []`,
    `y = [`,
    `x y = []`,
    `!name = []`,
    `23 = []`
];

// test array definition
test('is array definition', ()=> {
    let shouldBeFalse = [3];
    for(let i=0; i< strings.length; i++){
        let string = strings[i];
        let isArray = ArrayOperations.isArrayDefinition(string);

        if(!shouldBeFalse.includes(i)){
            expect(isArray).toBe(true);
            validAddedStrings.push(string)
        }else{
            expect(isArray).toBe(false)
        }   
    }

    let x = JSON.stringify(validAddedStrings).replace(/\\/g,"");
    let y = JSON.stringify(validWrittenStrings).replace(/\\/g, "");
    expect(x).toBe(y)
});

// array missing closing bracket
// ShonaScript in VS Code auto closes the brackets, but we are doing this as a safety precaution
test ('is array missing a closing bracket', ()=> {
    let shouldBeFalse = [0,2,3,4];

    for(let i=0; i< validWrittenStrings.length; i++){
        let string = validWrittenStrings[i];
        let isMissingClosingBracket  = ArrayOperations.isArrayMissingClosingBracket(string);

        if(!shouldBeFalse.includes(i)){
            expect(isMissingClosingBracket).toBe(true);
        }else{
            expect(isMissingClosingBracket).toBe(false)
        }   
    }

});


/**
 * Validate the name of he array, it should be a valid variable
 */
test('is name of the array valid', ()=> {
    let shouldBeFalse = [2,3,4];

    for(let i=0; i< validWrittenStrings.length; i++){
        let string = validWrittenStrings[i];
        let arrayName = ArrayOperations.getArrayVariableName(string);
        let isValid = VariableOperations.isVariableValid(arrayName) == "checkVariable"

        if(!shouldBeFalse.includes(i)){
            expect(isValid).toBe(true);
        }else{
            expect(isValid).toBe(false)
        }   
    }
})