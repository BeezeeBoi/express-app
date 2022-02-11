const { parse } = require('csv-parse');
const fs = require('fs');

const data = [];

fs.createReadStream('data/keplar_data.csv')
  .pipe(parse({
    comment: '#',
    columns: true
  }))
  .on('data', (result) => {
    console.log(result);
    data.push(result);
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    console.log('read has ended');
  });

module.exports = data;