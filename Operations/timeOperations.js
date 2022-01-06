/**
 * built in time and date
 * 
 */

export const TimeOperations = {
    timeMatcher: /\bNguva\b/g,
    dateMatcher: /\bZuva\b/g,

    isTime: (arg)=> {
        return  TimeOperations.timeMatcher.test(arg)
    },

    getWorkString: (arg) => {
        let matcher = /\b(?:Nguva|Zuva)\b/g;
        return arg.match(matcher)[0];
    },

    convertWorkStringToTime: (arg) => {
        let workString = TimeOperations.getWorkString(arg);
        return workString.replace(workString, "new Date().toLocaleTimeString()")
    },

    convertToTime: (arg) => {
        let workString = TimeOperations.getWorkString(arg);
        let convertString = "new Date().toLocaleTimeString()"
        return arg.replace(workString,convertString);
    },

    // Date
   
    isDate: (arg)=> {
        return TimeOperations.dateMatcher.test(arg)
    },
  
    convertToDate: (arg) => {
        let workString = TimeOperations.getWorkString(arg);
        let convertString = "new Date().toLocaleDateString()"
        return arg.replace(workString,convertString);
    },
}


export const runTimeOperations = (readLines) => {
    readLines = readLines.map((x) => {
        if (TimeOperations.isTime(x)) {
            return TimeOperations.convertToTime(x);
        }
        else if (TimeOperations.isDate(x)) {
            return TimeOperations.convertToDate(x)
         
        } else {
          return x;
        }
      });
      return readLines

}