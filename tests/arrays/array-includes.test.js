import { ArrayOperations } from "../../Operations/arrayOperations";
import { VariableOperations } from "../../Operations/variables";




const strings = [
    `vanhu.muna("panashe")`,   
    `vanhu.mune(23)`,
    `vanhumuna(23)`,
    `vanhu.muna(`,
    `name irimu "vanhu"`,
    `23 irimu 22`,
    `20.muna(zita)`,
    `y = vanhu.muna(#name)`,
    `x y = vanhu.muna("23")`,
    `vanhu vese.muna(23) `,
    `kana vanhu.muna("Tanaka")`
];

const validAddedStrings = [];

const validWrittenStrings = [
    `vanhu.muna("panashe")`,
    `name irimu "vanhu"`,
    `23 irimu 22`,
    `20.muna(zita)`,
    `y = vanhu.muna(#name)`,
    `x y = vanhu.muna("23")`,
    `vanhu vese.muna(23) `, // should be checked in the operations
    `kana vanhu.muna("Tanaka")`


];

// identify the includes function
test('is includes function', () => {

    let shouldBeFalse = [1,2,3];
    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let isIncludesWithBrackets = ArrayOperations.isIncludesWithBrackets(string);
        let isIncludesWithoutBrackets = ArrayOperations.isIncludesWithoutBrackets(string);
        let isIncludes = isIncludesWithBrackets || isIncludesWithoutBrackets

        if (!shouldBeFalse.includes(i)) {
            expect(isIncludes).toBe(true);
            validAddedStrings.push(string)
        } else {
            expect(isIncludes).toBe(false)
        }
    }

    let x = JSON.stringify(validAddedStrings).replace(/\\/g, "");
    let y = JSON.stringify(validWrittenStrings).replace(/\\/g, "");
    expect(x).toBe(y)
});

// validate the variable and array
test('is variable and array name valid', ()=> {
    let shouldBeFalseArray = [1,2,3];
    let shouldBeFalseVariable = [4];

    for(let i=0; i< validWrittenStrings.length; i++){
        let string =validWrittenStrings[i];

        let {array, variable} = ArrayOperations.getIncludesVariableAndArray(string); // get the variable and the array name
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
})




