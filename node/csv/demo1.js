const {
  Parser,
  AsyncParser,
  Transform,
  parse,
  parseAsync,
  transforms
} = require('json2csv');

const fields = [ 'car', 'price', 'color' ];
const myCars = [
  {
    "car": "Audi",
    "price": 1,
    "color": "blue"
  }, {
    "car": "BMW",
    "price": 1,
    "color": "black"
  }, {
    "car": "Porsche",
    "price": 1,
    "color": "green"
  }
];

const parser = new Parser({ fields });
parser.parse(
  { data: myCars },
  function (err, csv) {
    console.log(1111111111)
    if (err) {
      console.log(err);
    }
    fs.writeFile(
      './file/test.csv',
      csv,
      function (err) { // currently saves file to app's root directory
        if (err) {
          throw err;
        }
        console.log('file saved');
      }
    );
  }
);
