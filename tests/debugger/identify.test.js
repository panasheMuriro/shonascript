/**
 * Debugger is the nyora function
 */

import { DebuggerOperations } from "../../Operations/debuggerOperations.js";


const strings = [
    `nyora()`,
    `nyor()`,
    `nyora("zita",zita,23)`,
    `nyora("zita rangu , ne zita rake ",zita#,23)`,

];

const debuggerStringsAdded = [];

const debuggerStringsWritten = [
    `nyora()`,
    `nyora("zita",zita,23)`,
    `nyora("zita rangu , ne zita rake ",zita#,23)`,

];


// identify the debbuger operation
test('is debugger operation',()=> {
    let shouldBeFalse = [1];

    for (let i =0 ; i< strings.length; i++){
        let string = strings[i];
        let isDebbuger = DebuggerOperations.isDebuggerOperation(string);
        if(!shouldBeFalse.includes(i)){
            expect(isDebbuger).toBe(true);
            debuggerStringsAdded.push(string)
        }else{
            expect(isDebbuger).toBe(false)
        }
        
    }

    let x = JSON.stringify(debuggerStringsWritten).replace(/\\/g, "");
    let y = JSON.stringify(debuggerStringsAdded).replace(/\\/g, "");
    expect(x).toBe(y);
});


