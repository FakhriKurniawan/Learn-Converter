
/*  Menggunakan File System */
/* import dulu  librarynya */
import fs from 'fs';

/* Untuk Menulis Ke dalam file ada dua cara yaitu secara asynchronous ataupun synchronous */


/* Cara synchronous */
 let student = { 
                name: 'Mike',
                age: 23, 
                gender: 'Male',
                department: 'English',
                car: 'Honda' 
};
let data = JSON.stringify(student);
fs.writeFileSync('student-2.json', data);


/* Cara asynchronouse */
fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
  if (err) return console.log(err);
  console.log('Hello World > helloworld.txt');
});


/* Untuk membaca  file ada dua cara yaitu secara asynchronous ataupun synchronous */

/* Cara synchronous */
let data1 = fs.readFileSync("student-2.json");
console.log(JSON.parse(data1));

/* Cara asynchronous */
fs.readFile("student-3.json",(err,data)=>{
  if(err) return console.log(err);
  console.log(JSON.parse(data));
});


/* Create Folder  dengan filesystem */
fs.mkdir("./dodol", (err)=>{
    if (err) return console.log(err);
    console.log('folder created');
});

fs.rmdir("./dodol",(err)=>{
  if (err) return console.log(err);
    console.log('folder remove');
})


/* Copy File ada async dan sync */
fs.copyFile("student-2.json","student-4.json",(err)=>{
  if (err) return console.log(err);
    console.log('file copied');
});

fs.copyFileSync("student-2.json","student-5.json",fs.constants.COPYFILE_EXCL);