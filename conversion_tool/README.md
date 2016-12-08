# EHRI Conversion Tools

## REST Parameters (WIP)
This is a description of the available REST parameters and their effect. Keep in mind that this is work-in-progress and very likely to change.
* organisation: name of the organisation (UNUSED)
* fileType: file type, e.g. XML, JSON, CSV (UNUSED)
* xquery: path to local XQuery script; if present, this script will be executed instead of the generic transformation script (OPTIONAL)
* mapping: path to local Excel file (.xls or .xlsx) or Google Sheet ID containing mapping configuration; if absent, EAD1-to-EAD2002 conversion will be performed (OPTIONAL)
* mappingRange: cell range defining which cells from a Google Sheet to take, e.g. A1:D (OPTIONAL unless using Google Sheet)
* inputDir: path to directory containing input files (REQUIRED)
* outputDir: path to directory where output files will be written (REQUIRED)

Some example requests:
* generic transform using Google Sheet mapping: http://localhost:8080/rest/process?organisation=ontotext&fileType=xml&mapping=1H8bgPSWTvvfICZ6znvFpf4iDCib39KZ0jfgTYHmv5e0&mappingRange=A1:D&inputDir=/home/georgi/Downloads/test-input/&outputDir=/home/georgi/Downloads/test-output/
* generic transform using local Excel mapping: http://localhost:8080/rest/process?organisation=ontotext&fileType=xml&mapping=/home/georgi/Downloads/0-TEST-mapping-DO-NOT-MODIFY.xlsx&inputDir=/home/georgi/Downloads/test-input/&outputDir=/home/georgi/Downloads/test-output/
* custom transform using Google Sheet mapping: http://localhost:8080/rest/process?organisation=ontotext&fileType=xml&xquery=/home/georgi/Downloads/test.xqy&inputDir=/home/georgi/Downloads/test-input/&outputDir=/home/georgi/Downloads/test-output/
