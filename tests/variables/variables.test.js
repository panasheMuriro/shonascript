import {VariableOperations} from "../../Operations/variables.js"

/**
 * RULES
 * 
 * -- Left Side of the Variable Declaration --:
 * 1. should not be a string
 * 2. should not be a number
 * 3. should not start with a special character 
 * 
 * -- Right Side of the Variable Declaration --:
 * 1. should be a valid string
 * 2. a number without any special characters
 * 3. a valid operation known in ShonaScript
 */


//TODO: Add More tests

const variableStringsDeclaration = [
    `name = "Panashe"`,
    `message = "My name is Panashe"`,
    `name of me=Panashe jansjdn`,
    `1name==Panashe`,
    `$count+=12`, 
    `"count"-=24`,
    `24=sdfsdf`,
    `zitaRangu = "Panashe"`,
    `zita-rangu = "Panashe"`,
    `x =y`,
    `z=2021`,
    `z = 20 21`,
    `@name = Panashe`,
    `y = 4+=7`
];


// const variableStringsIncorrectlyWritten = 
const validVariables = [];

test('is it a variable definition', () => {
  for (let i = 0; i < variableStringsDeclaration.length; i++){
    let string = variableStringsDeclaration[i];
    var shouldBeFalse = [3,4,5];
    if(shouldBeFalse.includes(i)){
      expect(VariableOperations.isVariableDeclaration(string)).toBe(false);
    } else {
      expect(VariableOperations.isVariableDeclaration(string)).toBe(true);
      validVariables.push(string)
    }
  }
});

// is name of variable valid, the left side of equal sign
test('is name of variable valid', ()=> {
  let shouldBeFalse = [2,3,5,9]
  for (let i = 0; i < validVariables.length; i++){
    let string = validVariables[i];
    let nameOfVariable = VariableOperations.getNameOfVariable(string);
    if(shouldBeFalse.includes(i)){
      expect(VariableOperations.isVariableValid(nameOfVariable) == "checkVariable").toBe(false)
    }else{
      expect(VariableOperations.isVariableValid(nameOfVariable) == "checkVariable").toBe(true)
    }
  }
});

// is the right side of the variable declaration correct, ignore the other functions for now
// this one is checking whether the right side has a valid string or number, 
test('is variable value valid no special functions', ()=> {
  let shouldBeFalse = [2,8];
  for (let i = 0; i < validVariables.length; i++){
    let string = validVariables[i];
    let rightSideVal = VariableOperations.isRightSideValid(string);
    if(shouldBeFalse.includes(i)){
      expect(rightSideVal).toBe(false)
    }else{
      expect(rightSideVal).toBe(true)
    }
  }

});







