# Files 
1. `Operations/commentOperations.js`

# Identifier
``` 
/\/\/.*/g 
```
- this will match any line, or part of a line that starts with forward slashes `//`and then anything that comes after `.*`

# Conversion
- ignore comments
- comment are being replace by empty strings and totally ignored during conversion to JavaScript

### Example
```
zita = "Panashe" // ndiro zita rangu
```
- The comment matcher will match the substring `// ndiro zita rangu`, and then replace it with an empty string 