const txtToJson = require("txt-file-to-json");
const fs = require("fs");

const dataInJSON = txtToJson({ filePath: "./pdftext.txt" });

console.log(dataInJSON);
