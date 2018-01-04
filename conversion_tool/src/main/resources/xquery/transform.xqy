xquery version "3.0";

import module namespace transform = "transform" at "transform.xqm";

declare variable $namespaces as map(xs:string, xs:string) external;
declare variable $structure as xs:string external;
declare variable $mapping as xs:string external;
declare variable $input-dir as xs:string external;
declare variable $output-dir as xs:string external;

declare function local:pad-with-zeroes(
        $number as xs:string,
        $length as xs:integer
) as xs:string {
  if (fn:string-length($number) = $length) then $number
  else local:pad-with-zeroes(fn:concat("0", $number), $length)
};

declare function local:convert_csv() {
  for $source-path-relative in file:list($input-dir, fn:false(), "*.csv,*.CSV")
  let $source-document := fn:concat($input-dir, file:dir-separator(), $source-path-relative)
  let $target-path     := fn:concat($input-dir, file:dir-separator(),
          fn:replace(fn:replace($source-path-relative, "\.csv", ".xml"), "\.CSV", ".xml"))
  let $text            := file:read-text($source-document)
  let $target-document := csv:parse($text, map { 'header': true(), "format": "attributes" })
return file:write($target-path, $target-document, map { "omit-xml-declaration": "no" })
};

declare function local:convert_tsv() {
for $source-path-relative in file:list($input-dir, fn:false(), "*.tsv,*.TSV")
  let $source-document := fn:concat($input-dir, file:dir-separator(), $source-path-relative)
  let $target-path     := fn:concat($input-dir, file:dir-separator(),
                                    fn:replace(fn:replace($source-path-relative, "\.tsv", ".xml"), "\.TSV", ".xml"))
  let $text            := file:read-text($source-document)
  let $target-document := csv:parse($text, map { 'separator' : 'tab', 'header': true(), 'format':'attributes' })
return file:write($target-path, $target-document, map { "omit-xml-declaration": "no" })
};

local:convert_csv(),
local:convert_tsv(),
  for $source-path-relative in file:list($input-dir, fn:false(), "*.xml,*.XML")
  let $source-document := fn:doc(fn:concat($input-dir, file:dir-separator(), $source-path-relative))
    for $target-document at $count in transform:transform($source-document, $mapping, $namespaces, $structure)
      let $target-path := fn:concat(
      $output-dir,
      file:dir-separator(),
      $target-document/*:ead/*:eadheader/*:eadid/text(),
      ".", fn:substring-after($source-path-relative, ".")
  )

return file:write($target-path, $target-document, map { "omit-xml-declaration": "no" })