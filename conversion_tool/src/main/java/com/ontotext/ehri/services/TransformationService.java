package com.ontotext.ehri.services;

import com.ontotext.ehri.model.TransformationModel;
import com.ontotext.ehri.tools.GoogleSheets;
import com.ontotext.ehri.tools.Reader;
import com.ontotext.ehri.tools.XqueryTransformations;
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

        try {
            String configContent = Reader.read(configPath, "UTF-8");
            config = (Map) new Yaml().load(configContent);
        } catch (IOException e) {
            LOGGER.error("exception while initializing transformation service", e);
        }
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
                String mapping = GoogleSheets.toString(GoogleSheets.getValues(model.getMapping(), model.getMappingRange()), "\n", "\t");
                XqueryTransformations.transform(namespaces, structPath, mapping, model.getInputDir(), model.getOutputDir());
            } catch (IOException | QueryException e) {
                LOGGER.error("exception while performing generic transformation", e);
            }

        } else {
            LOGGER.info("performing custom transformation");
            LOGGER.warn("NOT IMPLEMENTED YET");
        }

        long time = System.currentTimeMillis() - start;
        LOGGER.info("finished transformation in " + time + " ms");
    }
}
