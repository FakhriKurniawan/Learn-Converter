// import App from './core/App';
// const   app = new App();
//         app.start();

let myarray =  [1,10,20,30,404,7,2,9];


let buffer = [];
for(var i=0;i<myarray.length;i++)
{
    let ketemu = false;
    for(var j=0; j<buffer.length;j++)
    {

      if (buffer[j]===myarray[i]) {
          ketemu = true;
      }
    }
    if (!ketemu) {
        buffer.push(i);
    }
}

console.log(buffer, myarray)
