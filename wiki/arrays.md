# Files
`Operations/arrayOperations.js`

# Identify

#### definition 
```
/=\s*\[/
```
- matches an equal sign and an opening  sqaure bracket `[`

#### length
```
/\.\w*ngani\b[\(\)]*/
```
matches where there is `.-ngani`, like .`.vangani()`, `.zvingani()`

#### push
```
/\bisa\b/  -- without brackets
/b\.isa/b -- with brackets
```
matches strings like `isa x mu list`, and `list.isa(x)`

#### remove
```
/\bbvisa\b/  -- without brackets
/b\.bvisa/b -- with brackets
```
matches strings like `bvisa x mu list`, and `list.bvisa(x)`
#### sort
```
\b\.ronga\b
```
matches strings like `list.ronga()`

# Validation

#### array name
- should be valid variable


#### arguments 
- should be valid strings, numbers, or defined variable

# Conversion

#### length
```
y.vangani() --> y.length
```
#### push
```
y.isa(x) --> y.push(x)
isa x mu y --> y.push(x)
```
#### remove
```
y.bvisa(x) --> y.filter(z=> z !== x)
bvisa x mu y --> y.filter(z=> z !== x)
```
#### sort
```
y.ronga() = y.sort()
```