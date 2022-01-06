# Files
```
Operations/inputOperations.js
```

# Identify
```
/\bt[e]+rera\s*mhinduro\s*[\w"']*/ -- listen to inputs

/\btora\s*mhinduro\s*[\w"']*/ -- use inputs

```
listen to the terminal inputs using `teerera mhinduro x`
take the user input from the terminal and use it with `tora mhinduro x{`

# Validation
`teerera mhinduro x`, x is the name of the input and it should be a valid variable name

`tora mhinduro x{`, x should be defined by `teerera mhinduro`, and there should be an opening bracket on the same line 

# Conversion

```
teerera mhinduro x --> 

let promisex = new Promise(function(resolve, reject) {
prompt.start({ message: "mhinduro" });
prompt.get(x, function (err, result) {
    if(typeof Number(result.x) == "number" && !isNaN(Number(result.x))){
      resolve(Number(result.x))
    }else{
      resolve(result.x)
    }
    });
  });`



tora mhinduro x { -->

promisex.then((x) =>`

```

