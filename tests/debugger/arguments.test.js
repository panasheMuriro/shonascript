

import { DebuggerOperations } from "../../Operations/debuggerOperations.js";
import { VariableOperations } from "../../Operations/variables.js";

const strings = [
    `nyora()`,
    `nyora("zita",zita,23)`,
    `nyora("zita rangu , ne zita rake ",zita#,23)`
];

// count args
test('count debugger args', () => {
    expect(DebuggerOperations.getArgs(strings[0]).length).toBe(0);
    expect(DebuggerOperations.getArgs(strings[1]).length).toBe(3);
    expect(DebuggerOperations.getArgs(strings[2]).length).toBe(3);
});

// validate arguments
test('are arguments valid', () => {

    // helper -->  returns the booleans for the validity of arguments
    const validateArgs = (string) => {
        let args = DebuggerOperations.getArgs(string);
        let resultValidation = [] // push true/false for every tested argument in this array
        for (let i = 0; i < args.length; i++) { 
            let arg = args[i];
            let isValidVariable = VariableOperations.isVariableValid(arg) == "checkVariable" 
            let isValidNumber = VariableOperations.isVariableValid(arg) == "isValidNumber";
            let isValidString = VariableOperations.isVariableValid(arg) == "isValid";
            let isValid = isValidString || isValidNumber || isValidVariable;
            resultValidation.push(isValid);
        }
        return resultValidation
    }

    // test -- `nyora("zita",zita,23)` -- strings[1]
    let string1 = strings[1];
    let args1 = validateArgs(string1);
    expect(args1[0]).toBe(true); // "zita"
    expect(args1[1]).toBe(true); // zita
    expect(args1[2]).toBe(true); //23

    // test --     `nyora("zita rangu , ne zita rake ",zita#,23)` -- strings[2]

    let string2 = strings[2];
    let args2 = validateArgs(string2);
    expect(args2[0]).toBe(true); // "zita rangu , ne zita rake "
    expect(args2[1]).toBe(false); // zita#
    expect(args2[2]).toBe(true); //23
    
});


