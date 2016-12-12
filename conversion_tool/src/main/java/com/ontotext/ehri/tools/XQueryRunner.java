package com.ontotext.ehri.tools;

import org.basex.core.Context;
import org.basex.query.QueryException;
import org.basex.query.QueryProcessor;
import org.basex.query.value.Value;
import org.basex.query.value.item.Item;
import org.basex.query.value.item.Str;
import org.basex.query.value.type.AtomType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class XQueryRunner {
    private static final Logger LOGGER = LoggerFactory.getLogger(XQueryRunner.class);
    private static final String GENERIC_TRANSFORM_PATH = "/xquery/transform.xqy";
    private static final String HTML_GENERATOR_PATH = "/xquery/ead2html.xqy";
    private static final Charset ENCODING = StandardCharsets.UTF_8;
    private static final Context CONTEXT = new Context();

    public static void transform(Map<String, String> namespaces, String structPath, String mapping, String inputDir, String outputDir) throws IOException, QueryException {
        transform(GENERIC_TRANSFORM_PATH, namespaces, structPath, mapping, inputDir, outputDir);
    }

    public static void transform(String xqueryPath, Map<String, String> namespaces, String structPath, String mapping, String inputDir, String outputDir) throws IOException, QueryException {
        String xquery = TextReader.readText(xqueryPath, ENCODING);
        QueryProcessor processor = new QueryProcessor(xquery, CONTEXT);
        processor.bind("namespaces", basexMap(namespaces), "map(xs:string, xs:string)");
        processor.bind("structure-path", structPath, "xs:string");
        if (mapping != null) processor.bind("configuration", mapping, "xs:string");
        processor.bind("source-dir", inputDir, "xs:string");
        processor.bind("target-dir", outputDir, "xs:string");
        processor.value();
    }

    public static void generateHTML(String documentDir, String htmlDir, String language) {
        String xquery = TextReader.readText(HTML_GENERATOR_PATH, ENCODING);
        QueryProcessor processor = new QueryProcessor(xquery, CONTEXT);

        try {
            processor.bind("document-dir", documentDir, "xs:string");
            processor.bind("html-dir", htmlDir, "xs:string");
            processor.bind("language", language, "xs:string");

            processor.bind("formatting-path", TextReader.resolvePath("/tsv/formatting.tsv").getAbsolutePath(), "xs:string");
            processor.bind("translations-path", TextReader.resolvePath("/tsv/labels.tsv").getAbsolutePath(), "xs:string");
            processor.bind("stylesheet-location", TextReader.resolvePath("/css/ead.css").getAbsolutePath(), "xs:string");

            processor.value();
        } catch (QueryException e) {
            LOGGER.error("failed to generate HTML for the documents in: " + documentDir, e);
        }
    }

    private static org.basex.query.value.map.Map basexMap(Map<String, String> javaMap) throws QueryException {
        org.basex.query.value.map.Map basexMap = org.basex.query.value.map.Map.EMPTY;

        for (String javaKey : javaMap.keySet()) {
            Item basexKey = new Str(javaKey.getBytes(ENCODING), AtomType.STR);
            Value basexValue = new Str(javaMap.get(javaKey).getBytes(ENCODING), AtomType.STR);
            basexMap = basexMap.put(basexKey, basexValue, null);
        }

        return basexMap;
    }
}
