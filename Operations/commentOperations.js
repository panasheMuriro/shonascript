/**
 * Comments
 */


export const CommentOperations = {
    matcher: /\/\/.*/, // match any line or part of line which contains two forward slashes and everything that comes after
    isComment: (arg)=> {
        return CommentOperations.matcher.test(arg);
    },
    ignoreComment: (arg) => { // ignore comment by replacing with an empty string
        arg = arg.replace(/\/\/.*/g, "");
        return arg;
    }
}

export const runCommentOperations = (readLines) => {
    readLines = readLines.map(x=> {
        if(CommentOperations.isComment(x)){
            return CommentOperations.ignoreComment(x)
        }else{
            return x
        }
    });
    return readLines;
}



