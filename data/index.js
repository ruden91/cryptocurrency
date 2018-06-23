const database = require('./firebase').database;
const fs = require('fs');

fs.readFile('./json/coinhillsIco.json', (err, data) => {
  database.ref('icoInfo/coinhills').set(JSON.parse(data), () => {
    console.log('코일힐스 데이터가 정상적으로 올라갔습니다.');
  });
});

fs.readFile('./json/trackico.json', (err, data) => {
  database.ref('icoInfo/trackico').set(JSON.parse(data), () => {
    console.log('ico데이터가 정상적으로 올라갔습니다.');
  });
});

fs.readFile('./json/coinjinja.json', (err, data) => {
  database.ref('icoInfo/coinjinja').set(JSON.parse(data), () => {
    console.log('데이터가 정상적으로 올라갔습니다.');
  });
});

fs.readFile('./json/coinhills.json', (err, data) => {
  database.ref('exchangeRanking').set(JSON.parse(data), () => {
    console.log('데이터가 정상적으로 올라갔습니다.');
  });
});
