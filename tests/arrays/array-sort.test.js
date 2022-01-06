import { ArrayOperations } from "../../Operations/arrayOperations";
import { VariableOperations } from "../../Operations/variables";


const strings = [
    `vanhu.ronga()`,
    `vanhu.ronga(name)`,
    `vanhu.ronga( )`,
    `"vanhu".ronga()`,
    `x = vanhu.ronga()`

];

const validAddedStrings = [];

const validWrittenStrings = [
    `vanhu.ronga()`,
    `vanhu.ronga(name)`,
    `vanhu.ronga( )`,
    `"vanhu".ronga()`,
    `x = vanhu.ronga()`


];


// identify array sort operation
test("is array sort function",()=>{
    let shouldBeFalse = [];
    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let isSort = ArrayOperations.isSortFunction(string);

        if (!shouldBeFalse.includes(i)) {
            expect(isSort).toBe(true);
            validAddedStrings.push(string)
        } else {
            expect(isSort).toBe(false)
        }
    }

    let x = JSON.stringify(validAddedStrings).replace(/\\/g, "");
    let y = JSON.stringify(validWrittenStrings).replace(/\\/g, "");
    expect(x).toBe(y)
})

// is sort function written properly?
test('is sort function written properly', ()=> {
    let shouldBeFalse = [1,2];

    for(let i=0; i< validWrittenStrings.length; i++){
        let string =validWrittenStrings[i];
        let isCorrect = ArrayOperations.isSortFunctionWrittenProperly(string);

        if(!shouldBeFalse.includes(i)){
            expect(isCorrect).toBe(true);
        }else{
            expect(isCorrect).toBe(false)
        }   
    }
})

// validate the array name
test('is sort array name valid', () => {
    let shouldBeFalse = [1,2,3];
    for(let i=0; i< validWrittenStrings.length; i++){
        let string = validWrittenStrings[i];
        let arrayName = ArrayOperations.getSortArray(string);
   
        let isValid = VariableOperations.isVariableValid(arrayName) == "checkVariable";
        if(!shouldBeFalse.includes(i)){
            expect(isValid).toBe(true);
        }else{
            expect(isValid).toBe(false)
        }   

    }

    
});



