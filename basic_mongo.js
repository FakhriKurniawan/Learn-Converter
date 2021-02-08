import DotEnv from 'dotenv';
import Mongoose from 'mongoose';
import fs from 'fs';

////
let contohSchema = new  Mongoose.Schema(
  { 
    username:{type: String, required:true, minlength:3 },
    email:{type: String},
    aliasField: {
      type: String,
      alias: 'dodo'
    }
  },
  {
    timestamps: true
  }
)

// ingat jangan gunakan arrow disini
contohSchema.virtual('komplit').get( function(){
  console.log('vvv',this);
     return this.username + '@' + this.email;
});

// custom method for schema
contohSchema.methods.customMethod = function(ob) {
   console.log('hallo::'+ ob, this);
  
}

// custom static methods
contohSchema.statics.customStaticMethod = function(ob) {
  console.log('static', ob, this)
}


// schema option



let contohModel = Mongoose.model('contohkoleksi', contohSchema);

DotEnv.config();
let url = process.env.DB_URL+ `/${process.env.DB_DATABASE}`;

// cara pertama untuk connect ke mongoose
Mongoose.connect(url,{useUnifiedTopology:true, useCreateIndex:true, useNewUrlParser:true},(err)=>{
  if (err)
  {
    // has error
    console.log(err.message);
  }
  else {
    // finally
    console.log(`Terhubung ke ${url}`);
  }
})
let connection = Mongoose.connection;
// server connected
// on error happening
connection.on('error',(param)=>{
  console.log('gagal broxxx');
});




connection.on('open', ()=>{
  console.log('Connected');
  // gunakan promise
  TambahkanData();  

  // async function always return a promise
  // TambahDataSync().then((item)=>{ console.log('item',item)  }).catch((error)=>{
  //    console.log('gagal dddd', error);
  // });
});




// menggunakan promise
function TambahkanData() {
    let databaru = new contohModel({
      username:'data 1',
      email:'data1@mail.net',
      dodo:'baasdfsdf'
    });
    databaru.save()
      .then((item)=>{
        // panggil custom method
        item.customMethod('hahaha');

        // panggil custom static 
        contohModel.customStaticMethod('bobok');
        console.log('data',item);
        console.log('data si item', item.komplit);
        console.log('to object', item.toObject({virtuals:true}));
        
      })
      .catch((error) =>{
         console.log('terjadi kesalahan' + error);
      })
}

// async function
async function TambahDataSync() {
    try 
    {

      let databaru = new contohModel({
        username:'data 3',
        email:'data123@mail.net'
      });

      //databaru.customMethod('dodol yak');
      let user = await databaru.save();
      return user;
    }
    catch (error) {
       throw 'gagal bro ya tidak bisa tambahkan' +error
    }
    
  
}

// SCHEMA - MODEL - DOCUMENTS




// cara kedua untuk connect ke mongoose umumnya digunakan untuk multiple host
// let connection = Mongoose.createConnection(); //
//     connection.openUri(url,{useUnifiedTopology:true, useCreateIndex:true, useNewUrlParser:true}, (error) =>{
//     if (error) {
//         // has error
//         console.log(err.message);
//     }
//     else {
//         console.log('Connected to db')
//     }
// } );