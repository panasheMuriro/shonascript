import { ConditionalOperations } from "../../Operations/conditionals";

const strings = [
    `kana x`,
    `kanax`,
    `!kana`, 
    `zvimwe y`,
    `zvimwey `,
    `#zvimwe`
];


const validWrittenStrings = [
    `kana x`,
    `!kana`,
    `zvimwe y`,
    `#zvimwe`
];

const validAddedStrings = [];


// is if statement
test('identified the if | else statement', () => {
    let shouldBeFalse = [1,4];
    for(let i = 0; i< strings.length; i++){
        let string = strings[i];
        let isIF = ConditionalOperations.isConditionalIF(string);
        let isElse = ConditionalOperations.isConditionalElse(string);
        let isConditional = isIF || isElse;

        if(!shouldBeFalse.includes(i)){
            validAddedStrings.push(string)
            expect(isConditional).toBe(true);
          
        }else{
            expect(isConditional).toBe(false)
        }
    }

    let x = JSON.stringify(validAddedStrings).replace(/\\/g, "");
    let y = JSON.stringify(validWrittenStrings).replace(/\\/g, "");
    expect(x).toBe(y)
});

// conditional has a special character
test('conditional has a special character', () => {
    let shouldBeFalse = [0];
    for(let i=0; i< validWrittenStrings; i++){
        let string = strings[i];
        let hasNoSpecialCharacter = ConditionalOperations.conditionalHasNoSpecialCharacters(string);

        if(!shouldBeFalse.includes(i)){
            expect(hasNoSpecialCharacter).toBe(true)
        }

        else {
            expect(hasNoSpecialCharacter).toBe(false)    
        }
    }
})