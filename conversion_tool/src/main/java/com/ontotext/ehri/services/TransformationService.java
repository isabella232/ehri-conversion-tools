package com.ontotext.ehri.services;

import com.ontotext.ehri.model.TransformationModel;
import com.ontotext.ehri.tools.*;
import net.sf.saxon.s9api.XsltExecutable;
import org.basex.query.QueryException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Service
public class TransformationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(TransformationService.class);
    private static final String CONFIG_PATH = "/config.yml";
    private static final XsltExecutable EAD1_TO_EAD2002 = XSLTRunner.compileStylesheet("/xslt/v1to02.xsl");

    private Map config;

    public TransformationService() {
        this(CONFIG_PATH);
    }

    public TransformationService(String configPath) {
        LOGGER.info("initializing transformation service with config at: " + configPath);
        String configContent = TextReader.readText(configPath);
        config = (Map) new Yaml().load(configContent);
    }

    public void transform(TransformationModel model) {
        LOGGER.info("starting transformation with these parameters: " + model.toString());
        long start = System.currentTimeMillis();

        Map<String, String> namespaces = (Map<String, String>) config.get("namespaces");
        String structPath = TransformationService.class.getResource((String) config.get("structure-file")).getFile();

        if (model.getMapping() == null && model.getXquery() == null) {
            LOGGER.info("performing EAD1 to EAD2002 conversion");
            XSLTRunner.runStylesheet(EAD1_TO_EAD2002, model.getInputDir(), model.getOutputDir());
        } else if (model.getXquery() == null) {
            LOGGER.info("performing generic transformation");

            try {
                File mappingFile = new File(model.getMapping());
                String mapping;

                if (mappingFile.isFile()) {
                    LOGGER.info("reading mapping from Excel file: " + mappingFile.getAbsolutePath());
                    mapping = ExcelReader.stringify(ExcelReader.readSheet(mappingFile.getAbsolutePath(), 0), "\t", "\n");
                } else {
                    LOGGER.info("reading mapping from Google spreadsheet with ID: " + model.getMapping());
                    mapping = GoogleSheetReader.toString(GoogleSheetReader.getValues(model.getMapping(), model.getMappingRange()), "\n", "\t");
                }

                XQueryRunner.transform(namespaces, structPath, mapping, model.getInputDir(), model.getOutputDir());
            } catch (IOException | QueryException e) {
                LOGGER.error("exception while performing generic transformation", e);
            }

        } else {
            LOGGER.info("performing custom transformation");

            try {
                XQueryRunner.transform(model.getXquery(), namespaces, structPath, null, model.getInputDir(), model.getOutputDir());
            } catch (IOException | QueryException e) {
                LOGGER.error("exception while performing custom transformation", e);
            }
        }

        long time = System.currentTimeMillis() - start;
        LOGGER.info("finished transformation in " + time + " ms");
    }
}
