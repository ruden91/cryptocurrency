const database = require('./firebase').database;
const fs = require('fs');

fs.readFile('./json/coinhills.json', (err, data) => {
  database.ref('exchangeRanking').set(JSON.parse(data));

  console.log('데이터가 정상적으로 올라갔습니다.');
  // process.exit();
});
