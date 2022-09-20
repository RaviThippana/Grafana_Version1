const fs = require("fs");
const pdf = require("pdf-parse");

let dataBuffer = fs.readFileSync("./datatable_29_08.pdf");

pdf(dataBuffer).then(function (data) {
  /* // number of pages
  console.log(data.numpages);
  // number of rendered pages
  console.log(data.numrender);
  // PDF info
  console.log(data.info);
  // PDF metadata
  console.log(data.metadata);
  // PDF.js version
  // check https://mozilla.github.io/pdf.js/getting_started/
  console.log(data.version);*/
  // PDF text
  let pdfText = data.text;
  //console.log(data.text);

  fs.writeFile("./pdftext.txt", pdfText, (err) => {
    if (err) throw err;
    else {
      console.log("The file is updated with the given data");
    }
  });
});
