# Files
```
Operations/functionOperations.js
```

# Identify
#### Regular
```
/\bbasa[\s]*\w*\s*\(.*\)/
```
matches string like:
```
basa mhoresaMunhu(){
```
#### Inteval
```
/\bbasa[\s]+mirira\s+\d+\s+second[s]*\s+\w*\s*\(.*\)/
```
matches strings like:
```
basa dzokorora 2 seconds mhoresaMunhu(){
```
#### Timeout
```
/\bbasa[\s]+dzokorora\s+\d+\s+second[s]*\s+\w*\s*\(.*\)/
```
matches strings like 
```
basa mirira 2 seconds mhoresaMunhu(){
```
#### Function Call
```
/tangaBasa\./
```
matches string like:
```
tangaBasa.mhoresaMunhu()
```

# Validation
#### Regular
all fucntions should be given correctly written variables as inputs like so:
```
basa mhoresaMunhu(zita){
```
#### Interval and Timeout
The seconds should be a number 

#### Function call
number of inputs expected should be the same as that of function definition

# Conversion
#### All
```
basa mhoresaMunhu(){ 
basa mirira 2 seconds mhoresaMunhu(){ 
basa dzokorora 2 seconds mhoresaMunhu(){ -->
function mhoresaMunhu(){
```

#### Function Call
a function is called by `tangaBasa.FunctionName()`

```
basa mhoresaMunhu(){ -->
mhoresaMunhu()

basa mirira 2 seconds mhoresaMunhu(){ -->
setTimeout(()=> function mhoresaMunhu(){}, 2000)

basa mirira 2 seconds mhoresaMunhu(){ -->
let interval = setInterval(()=> function mhoresaMunhu(){}, 2000)

```

misaBasa  stops the interval
```
misaBasa.mhoresaMunhu() -->  clearInterval(interval)
```








