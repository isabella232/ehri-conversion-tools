xquery version "3.0";

declare variable $input-dir as xs:string external;

declare function local:parse-json($json as xs:string) as item() {
  json:parse($json, map { "format": "direct" })
};

let $encoding := "UTF-8"
return for $source-path-relative in file:list($input-dir, fn:false())
  let $source-path := fn:concat($input-dir, file:dir-separator(), $source-path-relative)
  let $source := file:read-text($source-path, $encoding)
  let $target-path := fn:concat($input-dir, file:dir-separator(), fn:replace($source-path-relative, "\.[^\.]*$", ".xml"))
  let $target :=
    if (fn:matches($source-path-relative, "\.(json|JSON)$")) then local:parse-json($source)
    else ()
  
  return if ($target) then file:write($target-path, $target, map { "omit-xml-declaration": "no" }) else ()
