const { Parser } = require('json2csv');

const fields = [ 'car', 'price', 'color' ];
const opts = { fields };
const myData = [
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

try {
  const parser = new Parser(opts);
  const csv = parser.parse(myData);
  console.log(csv);
} catch (err) {
  console.error(err);
}
