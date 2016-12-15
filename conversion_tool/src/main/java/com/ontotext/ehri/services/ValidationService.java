package com.ontotext.ehri.services;

import com.ontotext.ehri.model.TransformationModel;
import com.ontotext.ehri.tools.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class ValidationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ValidationService.class);

    public void validate(TransformationModel model) {
        LOGGER.info("starting validation with these parameters: " + model.toString());
        long start = System.currentTimeMillis();

        JingRunner.validate((String) Config.param("ead-rng-path"), (String) Config.param("output-dir"));
        SVRLInjector.inject((String) Config.param("output-dir"));

        File htmlDir = new File(TextReader.resolvePath((String) Config.param("output-dir")), "html");
        htmlDir.mkdir();
        XQueryRunner.generateHTML((String) Config.param("output-dir"), htmlDir.getAbsolutePath() + "/", model.getLanguage());

        long time = System.currentTimeMillis() - start;
        LOGGER.info("finished validation in " + time + " ms");
    }
}
