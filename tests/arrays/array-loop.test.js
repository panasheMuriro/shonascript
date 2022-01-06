import { ArrayOperations } from "../../Operations/arrayOperations";
import { VariableOperations } from "../../Operations/variables";

const strings = [
    `pane x mu z y {`,
    `panes x mu y`,
    `pane "r" mu y`,
    `pana f mu r`,
    `pane 23 mu "list"`,
    `pane munhu mu "list" {}`
];

const validAddedStrings = [];

const validWrittenStrings= [
    `pane x mu z y {`,
    `pane "r" mu y`,
    `pane 23 mu "list"`,
    `pane munhu mu "list" {}`
];

// identify array loop
test('is array loop', ()=> {
    let shouldBeFalse = [1,3];
    for(let i=0; i< strings.length; i++){
        let string = strings[i];
        let isArray = ArrayOperations.isArrayLoop(string);

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

// TODO: More tests needed for the incorrectly written loops line `#pane x mu y`

// identify the missing open curly bracket
test ('is missing open curly bracket', ()=> {
    let shouldBeFalse = [0,3];
    for(let i=0; i< validWrittenStrings.length; i++){
        let string =validWrittenStrings[i];
        let isArray = ArrayOperations.isArrayLoopMissingCurlyBracket(string);

        if(!shouldBeFalse.includes(i)){
            expect(isArray).toBe(true);
        }else{
            expect(isArray).toBe(false)
        }   

    }
});


// validate the loop variable and the array name
test('is loop variable and array name valid', ()=> {
    for(let i=0; i< validWrittenStrings.length; i++){
        let shouldBeFalseVariable  = [1,2];
        let shouldBeFalseArray =[0,2,3];
        let string =validWrittenStrings[i];
        let { loopVariable, arrayName } = ArrayOperations.getLoopVariableAndArrayNames(string);
        let isValidVariable = VariableOperations.isVariableValid(loopVariable) == "checkVariable";
        let isValidArray = VariableOperations.isVariableValid(arrayName) == "checkVariable";
        // check 
        if(!shouldBeFalseVariable.includes(i)){
            expect(isValidVariable).toBe(true)
        }else{
            expect(isValidVariable).toBe(false)
        }


        // check array name
        if(!shouldBeFalseArray.includes(i)){
            expect(isValidArray).toBe(true)
        }else{
            expect(isValidArray).toBe(false)
        }
    }
})
