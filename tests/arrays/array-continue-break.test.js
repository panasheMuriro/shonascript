import { ArrayOperations } from "../../Operations/arrayOperations";
import { VariableOperations } from "../../Operations/variables";

const strings = [
    `buda`,
    `jamb`,
    `jamba`,
    `#jamba`
];

const validAddedStrings = [];

const validWrittenStrings = [
    `buda`,
    `jamba`,
];

// is break or continue -- jamba, buda
test('is array break or continue function', ()=> {
    let shouldBeFalse = [1,3];
    for(let i = 0; i < strings.length; i++){

        let string = strings[i];
        let isBreakOrContinue = ArrayOperations.isBreakOrContinue(string);

        if(!shouldBeFalse.includes(i)){
            expect(isBreakOrContinue).toBe(true);
            validAddedStrings.push(string)
        }else{
            expect(isBreakOrContinue).toBe(false)
        }   
    }

    let x = JSON.stringify(validAddedStrings).replace(/\\/g,"");
    let y = JSON.stringify(validWrittenStrings).replace(/\\/g, "");
    expect(x).toBe(y)
});


// is break or continue written properly, on a new line
