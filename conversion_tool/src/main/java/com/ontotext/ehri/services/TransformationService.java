package com.ontotext.ehri.services;

import com.ontotext.ehri.model.TransformationModel;
import com.ontotext.ehri.tools.GoogleSheetReader;
import com.ontotext.ehri.tools.TextReader;
import com.ontotext.ehri.tools.XQueryRunner;
import org.basex.query.QueryException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;

import java.io.IOException;
import java.util.Map;

@Service
public class TransformationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(TransformationService.class);
    private static final String CONFIG_PATH = "/config.yml";

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
            LOGGER.warn("NOT IMPLEMENTED YET");
        } else if (model.getXquery() == null) {
            LOGGER.info("performing generic transformation");

            try {
                String mapping = GoogleSheetReader.toString(GoogleSheetReader.getValues(model.getMapping(), model.getMappingRange()), "\n", "\t");
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
