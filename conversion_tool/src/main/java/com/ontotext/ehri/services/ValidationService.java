package com.ontotext.ehri.services;

import com.ontotext.ehri.model.TransformationModel;
import com.ontotext.ehri.tools.JingRunner;
import com.ontotext.ehri.tools.SVRLInjector;
import com.ontotext.ehri.tools.TextReader;
import com.ontotext.ehri.tools.XQueryRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class ValidationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ValidationService.class);
    private static final String EAD_RNG = "/rng/ead.rng";

    public void validate(TransformationModel model) {
        LOGGER.info("starting validation with these parameters: " + model.toString());
        long start = System.currentTimeMillis();

        JingRunner.validate(EAD_RNG, model.getOutputDir());
        SVRLInjector.inject(model.getOutputDir());

        File htmlDir = new File(TextReader.resolvePath(model.getOutputDir()), "html");
        htmlDir.mkdir();
        XQueryRunner.generateHTML(model.getOutputDir(), htmlDir.getAbsolutePath() + "/", "de");

        long time = System.currentTimeMillis() - start;
        LOGGER.info("finished validation in " + time + " ms");
    }
}
