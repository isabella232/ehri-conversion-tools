# EHRI Conversion Tools

## REST Parameters (WIP)
This is a description of the available REST parameters and their effect. Keep in mind that this is work-in-progress and very likely to change.
* `organisation` - name of organisation; if given, will use the corresponding Google Sheet mapping
* `mapping` - name of an Excel mapping file; if given, will use it as the mapping
* `xquery` - name of an XQuery file; if given, will use it for the transformation
* `language` - two-letter code of the language for HTML generation; if given, will use it instead of the configured default
* `fileType` - type of input files; doesn't do anything

Some example requests:
* http://localhost:8080/rest/process - convert from EAD1 to EAD2002
* http://localhost:8080/rest/process?organisation=TEST - transform with the Google Sheet mapping for organisation "TEST"
* http://localhost:8080/rest/process?mapping=test.xlsx - transform with the Excel mapping file "test.xlsx"
* http://localhost:8080/rest/process?xquery=test.xqy - transform with the custom XQuery file "test.xqy"
