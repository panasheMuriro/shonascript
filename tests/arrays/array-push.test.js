import { ArrayOperations } from "../../Operations/arrayOperations";
import { VariableOperations } from "../../Operations/variables";


const strings = [
    `isa munhu mu vanhu`,
    `vanhu.isa(munhu)`,
    `isa "panashe" mu vanhu`,
    `isa "panashe" mu 23`,
    `vanhu.isa("panashe")`,
    `23.isa("panashe")`,
    `5.isa(#panashe)`,
    `isa x y mu #vanhu`

];

const validAddedStrings = [];

const validWrittenStrings = [
    `isa munhu mu vanhu`,
    `vanhu.isa(munhu)`,
    `isa "panashe" mu vanhu`,
    `isa "panashe" mu 23`,
    `vanhu.isa("panashe")`,
    `23.isa("panashe")`,
    `5.isa(#panashe)`,
    `isa x y mu #vanhu`
];


// identify array push function
test('is array push function', ()=> {
    let shouldBeFalse = [];
    for(let i=0; i< strings.length; i++){
        let string = strings[i];
        let isPushFunction = ArrayOperations.isPushWithBrackets(string) || ArrayOperations.isPushWithoutBrackets(string);

        if(!shouldBeFalse.includes(i)){
            expect(isPushFunction).toBe(true);
            validAddedStrings.push(string)
        }else{
            expect(isPushFunction).toBe(false)
        }   
    }

    let x = JSON.stringify(validAddedStrings).replace(/\\/g,"");
    let y = JSON.stringify(validWrittenStrings).replace(/\\/g, "");
    expect(x).toBe(y)
});


// validate the arguments
test('is variable and array name valid', ()=> {
    let shouldBeFalseArray = [3,5,6,7];
    let shouldBeFalseVariable = [6,7];

    for(let i=0; i< validWrittenStrings.length; i++){
        let string =validWrittenStrings[i];

        let {array, variable} = ArrayOperations.getPushVariableAndArray(string); // get the variable and the array name
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