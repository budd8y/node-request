const axios  = require('axios');
const args   = process.argv;
const url    = args[2] || 'https://www.google.com.br';
const limit  = parseInt(args[3]) || 100;
let arrayReq = [];
const timeMsg= 5000;
// Globais
global.status  = false;
global.qtdePro = 1;

console.log(`URL: ${url}`, `LIMIT: ${limit}`);
console.log('Aguarde, estamos processando...');
setInterval(() => {
    if (!global.status) {
        console.log(`Tempo de processamento: ${global.qtdePro * (timeMsg / 1000)} segundos...`);
        global.qtdePro = global.qtdePro + 1;
    }
}, timeMsg);


const reqs = (url) =>{
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(response => {
            resolve(response.status);
        })
        .catch(err => {
            let ret = null;
            if (err.response && err.response.status) {
                ret = err.response.status;
            } else {
                ret = err.code;
            }

            resolve(ret);
        });        
    });
}

for (i=1; i<=limit; i++) {
    arrayReq.push(reqs(url));
    if (i===limit) {
        Promise.all(arrayReq).then(r => {
            global.status = true;
            let statusError = r.filter(e => e !== 200);
            let statusSuccess = r.filter(e => e === 200);
            //console.log(`statusError: ${statusError}`, `statusSuccess: ${statusSuccess}`);
            console.log('--------------------------------');
            console.log('Result: ');
            console.log(r)
            console.log('--------------------------------');
            console.log(`Success: ${statusSuccess.length}`);
            console.log(`Errors: ${statusError.length}`);
        });;
    }
}
