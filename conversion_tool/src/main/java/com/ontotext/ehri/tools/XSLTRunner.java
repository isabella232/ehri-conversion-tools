package com.ontotext.ehri.tools;

import net.sf.saxon.Configuration;
import net.sf.saxon.s9api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamSource;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

public class XSLTRunner {
    private static final Logger LOGGER = LoggerFactory.getLogger(XSLTRunner.class);
    private static final Configuration CONFIGURATION = new Configuration();
    private static final Processor PROCESSOR = new Processor(CONFIGURATION);
    private static final XsltCompiler COMPILER = PROCESSOR.newXsltCompiler();

    public static XsltExecutable compileStylesheet(String stylesheetPath) {

        try (InputStream inputStream = TextReader.openInputStream(stylesheetPath)) {
            Source source = new StreamSource(inputStream);

            File stylesheetFile = new File(stylesheetPath);
            if (stylesheetFile.isFile()) source.setSystemId(stylesheetFile.getParentFile().toURI().toURL().toExternalForm());

            return COMPILER.compile(source);
        } catch (IOException | SaxonApiException e) {
            LOGGER.error("failed to compile stylesheet: " + stylesheetPath, e);
            return null;
        }
    }

    public static void runStylesheet(XsltExecutable stylesheet, String inputPath, String outputPath) {
        XsltTransformer transformer = stylesheet.load();

        try (InputStream inputStream = TextReader.openInputStream(inputPath)) {
            transformer.setSource(new StreamSource(inputStream));

            Serializer serializer = PROCESSOR.newSerializer(new File(outputPath));
            transformer.setDestination(serializer);

            transformer.transform();
        } catch (IOException | SaxonApiException e) {
            LOGGER.error("failed to run stylesheet on: " + inputPath, e);
        } finally {

            try {
                transformer.close();
            } catch (SaxonApiException e) {
                LOGGER.error("failed to close transformer", e);
            }
        }
    }
}
