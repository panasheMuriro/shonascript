/***
 * Test the argument that are being compared
 */

import { ComparisonOperations } from "../../Operations/comparisonOperations";
import { VariableOperations } from "../../Operations/variables";


 const equalMatcherStringsWritten = [
    `x y akafanana na y`,
    `x rakafanana ne y`,
    `23 chakaenzana na t'`,
    `kana x akafanana na #y`,
    `nyora(x rakafanana ne y)`
];

const lessMatcherStringsWritten = [
    `x mudiki pana y`,
    `"x" mudiki pane y`,
    `nyora(x idiki pana #23)`,
    `x ari mudiki pana y`,
];

const moreMatcherStringsWritten = [
    `kana x ari muhombe pana y`,
    `x yz ihombe kupfuura a` ,
    `nyora(#23 ihombe kudarika %23)`
];


test('are the equal comparison arguments valid', ()=> {

    let shouldBeFalseFirstVariable = [0];
    let shouldBeFalseSecondVariable = [2,3];

    for (let i = 0; i < equalMatcherStringsWritten.length; i++){
        let string = equalMatcherStringsWritten[i];
        let {firstVariable, secondVariable} = ComparisonOperations.getComparisonArgs(string);
        let isValidVariable1 = VariableOperations.isVariableValid(firstVariable) == "checkVariable" 
        let isValidString1 = VariableOperations.isVariableValid(firstVariable) =="isValid";
        let isValidNumber1 = VariableOperations.isVariableValid(firstVariable) =="isValidNumber";
        let isValid1 = isValidVariable1 || isValidString1 || isValidNumber1;
        
        if(!shouldBeFalseFirstVariable.includes(i)){
            expect(isValid1).toBe(true);
        }else{
            expect(isValid1).toBe(false);
        }

        // deal with the second argument
        let isValidVariable2 = VariableOperations.isVariableValid(secondVariable) == "checkVariable" 
        let isValidString2 = VariableOperations.isVariableValid(secondVariable) =="isValid";
        let isValidNumber2 = VariableOperations.isVariableValid(secondVariable) =="isValidNumber";
        let isValid2 = isValidVariable2 || isValidString2 || isValidNumber2;
        
        if(!shouldBeFalseSecondVariable.includes(i)){
            expect(isValid2).toBe(true);
        }else{
            expect(isValid2).toBe(false);
        }
        
      
    }
})

// deal with the less comparison arguments
test('are the less comparison arguments valid', ()=> {

    let shouldBeFalseFirstVariable = [];
    let shouldBeFalseSecondVariable = [2];

    for (let i = 0; i < lessMatcherStringsWritten.length; i++){
        let string = lessMatcherStringsWritten[i];
        let {firstVariable, secondVariable} = ComparisonOperations.getComparisonArgs(string);
        let isValidVariable1 = VariableOperations.isVariableValid(firstVariable) == "checkVariable" 
        let isValidString1 = VariableOperations.isVariableValid(firstVariable) =="isValid";
        let isValidNumber1 = VariableOperations.isVariableValid(firstVariable) =="isValidNumber";
        let isValid1 = isValidVariable1 || isValidString1 || isValidNumber1;
        
        if(!shouldBeFalseFirstVariable.includes(i)){
            expect(isValid1).toBe(true);
        }else{
            expect(isValid1).toBe(false);
        }

        // deal with the second argument
        let isValidVariable2 = VariableOperations.isVariableValid(secondVariable) == "checkVariable" 
        let isValidString2 = VariableOperations.isVariableValid(secondVariable) =="isValid";
        let isValidNumber2 = VariableOperations.isVariableValid(secondVariable) =="isValidNumber";
        let isValid2 = isValidVariable2 || isValidString2 || isValidNumber2;
        
        if(!shouldBeFalseSecondVariable.includes(i)){
            expect(isValid2).toBe(true);
        }else{
            expect(isValid2).toBe(false);
        }
        
      
    }
});

// deal with the more comparison arguments
test('are the more comparison arguments valid', ()=> {

    let shouldBeFalseFirstVariable = [1,2];
    let shouldBeFalseSecondVariable = [2];

    for (let i = 0; i < moreMatcherStringsWritten.length; i++){
        let string = moreMatcherStringsWritten[i];
        let {firstVariable, secondVariable} = ComparisonOperations.getComparisonArgs(string);
        let isValidVariable1 = VariableOperations.isVariableValid(firstVariable) == "checkVariable" 
        let isValidString1 = VariableOperations.isVariableValid(firstVariable) =="isValid";
        let isValidNumber1 = VariableOperations.isVariableValid(firstVariable) =="isValidNumber";
        let isValid1 = isValidVariable1 || isValidString1 || isValidNumber1;
        
        if(!shouldBeFalseFirstVariable.includes(i)){
            expect(isValid1).toBe(true);
        }else{
            expect(isValid1).toBe(false);
        }

        // deal with the second argument
        let isValidVariable2 = VariableOperations.isVariableValid(secondVariable) == "checkVariable" 
        let isValidString2 = VariableOperations.isVariableValid(secondVariable) =="isValid";
        let isValidNumber2 = VariableOperations.isVariableValid(secondVariable) =="isValidNumber";
        let isValid2 = isValidVariable2 || isValidString2 || isValidNumber2;
        
        if(!shouldBeFalseSecondVariable.includes(i)){
            expect(isValid2).toBe(true);
        }else{
            expect(isValid2).toBe(false);
        }
        
      
    }
})



