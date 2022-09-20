const fs = require("fs");
const PDFParser = require("pdf2json");

const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", (errData) =>
  console.error(errData.parserError)
);
/*
pdfParser.on("pdfParser_dataReady", (pdfData) => {
  fs.writeFile(
    "./parsed.json",
    JSON.stringify(pdfData),
    function (err, result) {
      console.log(err);
    }
  );
});
*/
/*
pdfParser.on("pdfParser_dataReady", (pdfData) => {
  fs.writeFile("./pdftext.json", JSON.stringify(pdfData), () => {
    console.log("Done.");
  });
});
*/
pdfParser.on("pdfParser_dataReady", (pdfData) => {
  fs.writeFile("./pdftext.txt", pdfParser.getRawTextContent(), () => {
    console.log("Done.");
  });
});

pdfParser.loadPDF("./tsdb-table-2022-09-14-10 57 55.pdf");
