# Identifers
```
1. /=/
2. /promise/
3. /[+=-]+=/
```

_What they do_
1. Identifier matches any line that has an equal sign `=`
2. Identifier matches the word `promise` that comes up when the input operation `teerera mhinduro x` is converted to a promise in JavaScript. This should just be skipped
3. Identifier matches math operations such as `+=` and comparison operation `==`. This should be replaced with an empty string before testing for the variable declaration

# Validation
#### left side of the equal sign
The name of the variable is valid if it is correctly written variable without:
1. a special character like `name#`
2. a number at the beginning like `20x`, the variable name can be `x20` 

#### right side of the equal sign
Right side is considered valid if it is:
1. a string
2. a number
3. a defined variable
4. one of these operations:
```
- FunctionOperations.isFunctionCall(rightSide)
- ArrayOperations.isArrayDefinition(rightSide)
- ArrayOperations.isIncludesWithBrackets(rightSide)
- ArrayOperations.isIncludesWithoutBrackets(rightSide)
- ArrayOperations.islengthFunction(rightSide)
- ComparisonOperations.isComparison(rightSide)
- MathOperations.isMathOperation(rightSide)
- MathOperations.isRandomNumberGenerator(rightSide)
- TimeOperations.isDate(rightSide)
- TimeOperations.isTime(rightSide)
- VariableOperations.isVariableValid(rightSide) == "isValid"
- VariableOperations.isVariableValid(rightSide) == "checkVariable"
- VariableOperations.isVariableValid(rightSide) == "isValidNumber"
- StringOperations.isJoin(rightSide)
- StringOperations.isSplit(rightSide)
```

# Conversion
if a line is a valid variable definition, it will just be attached a `var` keyword at the beginning of it to be the variable definition in JavaScript 