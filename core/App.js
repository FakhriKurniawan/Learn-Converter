import DotEnv from 'dotenv';
import Express from 'express';
import Mongoose from 'mongoose';
import {helper} from './utilities/helper';
import * as Schema from './../models/schema/Schema';
import UserManager from './handle/UserManager';
import {User} from './../models/models/User';
import fs from 'fs';


export default class App {
    constructor() {
        DotEnv.config();
        this.config = {
            APPLICATION_NAME        : helper.getConfig('APP_NAME','My Application'),
            APPLICATION_VERSION     : helper.getConfig('APP_VERSION', '1.0.0'),
            APPLICATION_URL         : helper.getConfig('APP_URL', 'http://localhost:3000'),
            CONNECTION_STRING       : helper.getConfig('DB_URL', 'mongodb://localhost:27017/crms'),
            APPLICATION_PORT        : helper.getConfig('APP_PORT',3000),
            APPLICATION_PUBLICPATH  : helper.getConfig('APP_PUBLICPATH','public')
        }
    }

    initializeWebServer() {
        this.server = Express();
        // initialize base middleware
        this.server.use(Express.urlencoded({extended:true}));
        this.server.use(Express.json());
        this.server.use(Express.raw());
        this.server.use(Express.text());
        this.server.use(Express.static(this.config.APPLICATION_PUBLICPATH));

    }

    initializeWebServerRoute() {
        let app = this.server;
        app.get("/", (req, res)=>{

            let userMgr = new UserManager();
            // let userdata = {
            //      username            : 'administrator',
            //      email               : 'admin@mail.net',
            //      phone               : '081293728732',
            //      password            : 'password',
            //      status              : 'pending',
            //      ///
            //     title                : 'Mr.',
            //     firstName            : 'System Administrator',
            //     lastName             : 'Administrator',
            //     genderType           : '-',
            //     maritalStatus        : '-',
            //     birthDate            : null,
            //     birthPlace           : '-',
                
            //     banks               : [
            //         {
            //             bankAccountNumber : '049303940234',
            //             bankName          : 'Bank Mandiri',
            //             bankAccountType   : 'Tabungan'
            //         },
            //         {
            //             bankAccountNumber : '049303940232',
            //             bankName          : 'Bank Tabungan Negara',
            //             bankAccountType   : 'Tabungan'
            //         }

            //     ],
            //     addresses           : [
            //         {
            //             streetAddress       : 'Perumahan Bilabong Blok D5D No 6',
            //             city                : 'Kab. Bogor',
            //             province            : 'Jawa Barat',
            //             country             : 'Indonesia',
            //             postalCode          : '16920',
            //             addressType         : 'home'
            //         }
            //     ],
            // }
            // userMgr.RegisterNewUser(userdata);

            userMgr.ListUser().then(
                (item) => {
                    console.log('hahaha',item);
                    for(var it in item.banks) {
                        console.log(item.banks[it])
                    }
                    //console.log(new User(item).toJSON({virtuals:true}));
                    
                }
            )

            let result = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <h1>Hello World !!!!!!!!!!</h1>
</body>
</html>`;
            res.status(200).send(result);
        })
    }

    startWebServer() {
        this.server.listen(this.config.APPLICATION_PORT,()=>{
            console.log(`${this.config.APPLICATION_NAME} listening on Port ${this.config.APPLICATION_PORT}`);
        });
    }


    initializeDatabaseConnection() {
        this.DB = {};
        Mongoose.connect(this.config.CONNECTION_STRING, {useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true });
        this.DB.connection = Mongoose.connection;
        this.DB.connection.once('open', ()=>{
            console.log('Connected to Database Server');
        })

        
    }

    welcomeScreen() {
        function getMessage(msg) {
            let teks = `|| ${msg}`;
            teks = teks + " ".padStart(95-teks.length-2) + '||';
            console.log(teks);
        }
        console.log('===============================================================================================');
        getMessage(`APPLICATION NAME : ${this.config.APPLICATION_NAME}`)
        getMessage(`APPLICATION VERSION : ${this.config.APPLICATION_VERSION}`)
        getMessage(`APPLICATION URL : ${this.config.APPLICATION_URL}`)
        console.log('===============================================================================================');
    }

    start() {
        this.welcomeScreen();
        // Database Connection
        this.initializeDatabaseConnection();

        // Web Server
        this.initializeWebServer();
        this.initializeWebServerRoute();

        this.startWebServer();
    }
}