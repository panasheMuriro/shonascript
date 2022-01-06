import { TimeOperations } from "../../Operations/timeOperations";




const strings  = [
    `Nguva`,
    `zuva`,
    `nguva`,
    `Nguva`,    
];


test('is time operation', ()=> {
    let shouldBeFalse = [1,2]
    for(let i =0; i< strings.length; i++){
        let string = strings[i];
        let isTime = TimeOperations.isTime(string);
        let isDate = TimeOperations.isDate(string);
        let isValid = isTime || isDate;
        
        if(!shouldBeFalse.includes(i)){
            expect(isValid).toBe(true);
        }else{
            expect(isValid).toBe(false)
        }
        
    }
})