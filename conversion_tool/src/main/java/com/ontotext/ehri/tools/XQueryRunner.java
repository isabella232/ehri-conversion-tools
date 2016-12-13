package com.ontotext.ehri.tools;

import org.basex.core.Context;
import org.basex.io.IOFile;
import org.basex.query.QueryException;
import org.basex.query.QueryProcessor;
import org.basex.query.util.UriResolver;
import org.basex.query.value.item.Item;
import org.basex.query.value.item.Str;
import org.basex.query.value.type.AtomType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class XQueryRunner {
    private static final Logger LOGGER = LoggerFactory.getLogger(XQueryRunner.class);
    private static final String MODULE_DIR = "/xquery/lib/";
    private static final String GENERIC_TRANSFORMER_PATH = "/xquery/transform.xqy";
    private static final String HTML_GENERATOR_PATH = "/xquery/ead2html.xqy";
    private static final Charset ENCODING = StandardCharsets.UTF_8;
    private static final Context CONTEXT = new Context();
    private static final UriResolver URI_RESOLVER = (path, uri, base) -> new IOFile(TextReader.resolvePath(MODULE_DIR + path));

    private static final Map<String, String> NAMESPACES = new HashMap<String, String>();
    static {
        NAMESPACES.put("", "urn:isbn:1-931666-22-9");
        NAMESPACES.put("xlink", "http://www.w3.org/1999/xlink");
        NAMESPACES.put("xsi", "http://www.w3.org/2001/XMLSchema-instance");
    }

    public static void customTransform(String xqueryPath, String inputDir, String outputDir) {
        Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("source-dir", inputDir);
        variables.put("target-dir", outputDir);
        run(xqueryPath, variables);
    }

    public static void genericTransform(String mapping, String inputDir, String outputDir) {
        Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("source-dir", inputDir);
        variables.put("target-dir", outputDir);
        variables.put("structure-path", TextReader.resolvePath("/ead2002.struct").getAbsolutePath());
        variables.put("configuration", mapping);
        variables.put("namespaces", NAMESPACES);
        run(GENERIC_TRANSFORMER_PATH, variables);
    }

    public static void generateHTML(String documentDir, String htmlDir, String language) {
        Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("document-dir", documentDir);
        variables.put("html-dir", htmlDir);
        variables.put("language", language);
        variables.put("formatting-path", TextReader.resolvePath("/tsv/formatting.tsv").getAbsolutePath());
        variables.put("translations-path", TextReader.resolvePath("/tsv/labels.tsv").getAbsolutePath());
        variables.put("stylesheet-location", TextReader.resolvePath("/css/ead.css").getAbsolutePath());
        run(HTML_GENERATOR_PATH, variables);
    }

    public static void run(String xqueryPath, Map<String, Object> variables) {
        String xquery = TextReader.readText(xqueryPath);
        QueryProcessor processor = new QueryProcessor(xquery, CONTEXT).uriResolver(URI_RESOLVER);
        bindVariables(processor, variables);

        try {
            processor.value();
        } catch (QueryException e) {
            LOGGER.error("failed to execute XQuery: " + xqueryPath, e);
        }
    }

    private static void bindVariables(QueryProcessor processor, Map<String, Object> variables) {

        for (String name : variables.keySet()) {
            Object value = variables.get(name);

            try {
                if (value instanceof String) processor.bind(name, value, "xs:string");
                else if (value instanceof Map) processor.bind(name, basexMap(value), "map()");
                else LOGGER.warn("unsupported value type: " + value.getClass().getName());
            } catch (QueryException e) {
                LOGGER.error("failed to bind variable \"" + name + "\" to value: " + value.toString(), e);
            }
        }
    }

    private static org.basex.query.value.map.Map basexMap(Object javaMap) {
        org.basex.query.value.map.Map basexMap = org.basex.query.value.map.Map.EMPTY;

        if (!(javaMap instanceof Map)) {
            LOGGER.error("object is not an instance of " + Map.class.getName() + ": " + javaMap.toString());
            return basexMap;
        }

        Map map = (Map) javaMap;
        for (Object key : map.keySet()) {

            try {
                basexMap = basexMap.put(basexItem(key), basexItem(map.get(key)), null);
            } catch (QueryException e) {
                LOGGER.error("failed to put key into map: " + key.toString());
            }
        }

        return basexMap;
    }

    private static Item basexItem(Object javaObject) {
        if (javaObject instanceof String) return new Str(((String) javaObject).getBytes(ENCODING), AtomType.STR);

        LOGGER.error("unsupported item type: " + javaObject.getClass().getName());
        return null;
    }
}
