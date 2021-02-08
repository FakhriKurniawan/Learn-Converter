/* MEMAHAMI STATEMENT BLOCK */
/* Hello everybody ! today we're gonna learn about basic programming in javascript
and we will use visual studio code and node js 
*/


/*
 in any programming language
 a program are build as a group of statements which we call it as statement block
 in javascript we mark a statement block within a curly braces {}
 Here are the example
*/

/* 
    This is a comments in multiline
*/

// an here are a comments in a single line
// comments are peace of information which are not executed by javascript interpreter
// on for clarity i will use comments for each of the code



// Below is a sample block - lets call it level 01 block
{
    let x = 10;
    var data = 1;
    let y = "this is just a data";
    const kb = 60;
    let myDate = new Date();
    let mySentence = "this is just an operation example " +  " this is to show you the string operation";
    console.log(x, data, y, kb);
    {
        let y = 500;
        let k;
        const kb = 90;
        function alert(msg) {    // this is how we define a function
            console.log(msg)
        }

        class myclass {   // this is how we define a class

        }

        for(var i = 0 ; i < 10; i++)
        {
            console.log(i);
            if (i === 3) {
                console.log("i value are 3")
            }

        } // this is one statement
        // and lets throw and catch an error
        try 
        {
            throw "this will throw an intended error";
            console.log('this one will not be executed')
        }
        catch (error) {
            console.log('this is the value of error '+ error)
        }  / this is one statment a sub block
        console.log(x, data, y);  // call a function log
    }
    console.log(x, data, y, kb);
}

/*
 1. statement block are a group of statement 
 2. each statement block when you define a variable using name same with its parent, then  the variable are only available within its block we call its contained in block scope level
 3. each statement are separated with ; or newline
 4. statement can be 
    a. a definition for variable, function, class
    b. a sub block 
    c. an operation  of variabel, data etc
    d. a call of a function
*/

// THats a program block or statement block or sometimes others call it as a compound statment
