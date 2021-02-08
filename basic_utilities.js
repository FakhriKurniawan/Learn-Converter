// import App from './core/App';
// const   app = new App();
//         app.start();



/* By Irfansjah */

function ConvertFromBase(aNumber,baseNumber) {
    let data =`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]\{}|;'",./<>?`;
    if (baseNumber > data.length) throw `Maksimum baseNumber : ${data.length}`
    let angka = (aNumber+'').split("").reverse().join("");
    let result =0;
    for(var i=0;i<angka.length;i++){result += parseInt(data.indexOf(angka[i]))*(Math.pow(baseNumber,i));}
    return result;
    
}

function ConvertToBase(aNumber,baseNumber) {
    let data =`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]\{}|;'",./<>?`;
    if (baseNumber > data.length) throw `Maksimum baseNumber : ${data.length}`
    let result = [];
    let angka = aNumber;
    let counter = true;
    while(counter)
    {
        let sisa =  angka % baseNumber;
        angka = Math.floor(angka / baseNumber);
        result.push(data[sisa]);
        if (angka == 0)
            counter=false
    }
    return result.reverse().join('');
}

function Terbilang(aNumber) {
    let result = "";
    let angkaTeks = aNumber+'';
    if (angkaTeks.length> 21) throw `${aNumber} terlalu besar dari range yang diijinkan`;
    let counter = 0;
    // pisah sebagai array, balik dan gabungkan kembali sebagai string;
    angkaTeks = angkaTeks;
    let kata = ["nol","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan"];
    let spuluhan = ['','ribu','juta','milyar','bilyun','trilyun','kuardiliun','kuintiliun'];
    result = [];
    while(angkaTeks.length > 0){
        let reverseAngka = angkaTeks.split("").reverse().join("");
        let kata1 = reverseAngka.substr(0,3).split("").reverse().join("");
        angkaTeks = reverseAngka.substr(3).split("").reverse().join("");
        let satuan = "";
        let puluhan = "";
        let ratusan = "";
        let unitSatuan = "";
        let unitPuluhan = "";
        let unitRatusan = "";

        switch( kata1.length){
            case 1:
                //if (counter<=3)
                {

                    satuan = (parseInt(kata1[0])==1)&&(counter>0)&&(counter<3)?"":kata[kata1[0]];
                }
                unitRatusan = (parseInt(kata1[0])==1)&&(counter>0)&&(counter<3)?"se"+spuluhan[counter]:spuluhan[counter];
                break;
            case 2:
                if ((kata1[0]==="0") && (kata1[1]==="0"))
                    {
                        satuan = "";
                        puluhan = "";
                        ratusan = "";
                        unitSatuan = "";
                        unitPuluhan = "";
                        
                    }
                else {

                    satuan = parseInt(kata1[1])==0?"":parseInt(kata1[0])==1?"":kata[kata1[1]];
                    puluhan = parseInt(kata1[0])==1?kata[kata1[1]]=="nol"?"":kata[kata1[1]]=="satu"?"":kata[kata1[1]]:kata[kata1[0]];
                    ratusan = "";
                    unitSatuan = parseInt(kata1[0])==1?kata[kata1[1]]=="nol"?"sepuluh":kata[kata1[1]]=="satu"?"sebelas":"belas":"puluh ";
                    unitPuluhan = "";

                }
                unitRatusan = spuluhan[counter];
                break;
            case 3:
                if ((kata1[0]==="0") && (kata1[1]==="0") && (kata1[2]==="0"))
                    {
                        satuan = "";
                        puluhan = "";
                        ratusan = "";
                        unitSatuan = "";
                        unitPuluhan = "";
                       
                    }
                else {

                    satuan = parseInt(kata1[2])==0?"":parseInt(kata1[1])==1?"":kata[kata1[2]];
                    puluhan = parseInt(kata1[1])==1?kata[kata1[2]]=="nol"?"":kata[kata1[2]]=="satu"?"":kata[kata1[2]]:kata[kata1[1]]=="nol"?"":kata[kata1[1]];
                    ratusan = parseInt(kata1[0])==1?"":parseInt(kata1[0])==0?"":kata[kata1[0]];
                    unitSatuan = parseInt(kata1[1])==1?kata[kata1[2]]=="nol"?"sepuluh":kata[kata1[2]]=="satu"?"sebelas":"belas":parseInt(kata1[1])==0?"":"puluh ";
                    unitPuluhan = parseInt(kata1[0])==1?"seratus":parseInt(kata1[0])==0?"":"ratus";

                }
                unitRatusan = spuluhan[counter];
                break;
        }

        result.push(`${ratusan} ${unitPuluhan} ${puluhan} ${unitSatuan} ${satuan} ${unitRatusan}`.trim());
        counter++;
        
    }
    
    console.log('selesai');
    return result.reverse().join(" ").replace("  "," ").replace("   "," ");
}


function ConvertToValidDecimalNumber(aNumberString) {
    let angka = aNumberString+'';
    let posKoma = angka.lastIndexOf(",");
    let posTitik = angka.lastIndexOf(".");
    let separator = posTitik > posKoma? ".":",";
    if (posTitik > posKoma)
    {
      angka = aNumberString.replace(/\,/g,"");
    }
    else 
    {
      angka = aNumberString.replace(/\./g,"");
    }
    let kata = ""; let counter =0;
    let numbers = angka.split(separator).forEach(item =>{
       if (counter < angka.split(separator).length-1) {
         kata+=item;
       }
       counter++;
    });
    angka = angka.split(separator)[angka.split(separator).length-1]
    return (parseFloat(kata+"."+angka));
}

export default   {
    Converter: {
        Terbilang,
        ConvertFromBase : ConvertFromBase,
        ConvertToBase: ConvertToBase,
        ConvertToValidDecimalNumber:ConvertToValidDecimalNumber
    }
}


