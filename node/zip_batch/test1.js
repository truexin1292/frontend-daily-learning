const fs = require("fs");
const unzip = require("unzip");
fs.createReadStream('archiver-unzip.zip').pipe(unzip.Extract({ path: 'unarchive' }));