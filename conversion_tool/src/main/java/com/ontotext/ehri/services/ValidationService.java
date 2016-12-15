package com.ontotext.ehri.services;

import com.ontotext.ehri.model.TransformationModel;
import com.ontotext.ehri.tools.Config;
import com.ontotext.ehri.tools.JingRunner;
import com.ontotext.ehri.tools.SVRLInjector;
import com.ontotext.ehri.tools.XQueryRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ValidationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ValidationService.class);

    public void validate(TransformationModel model) {
        LOGGER.info("starting validation with these parameters: " + model.toString());
        long start = System.currentTimeMillis();

        JingRunner.validate((String) Config.param("ead-rng-path"), (String) Config.param("output-dir"));
        SVRLInjector.inject((String) Config.param("output-dir"));

        File outputDir = new File((String) Config.param("output-dir"));
        File htmlDir = new File(outputDir, "html");
        if (!htmlDir.isDirectory()) htmlDir.mkdir();

        String language = model.getLanguage();
        if (language == null) {
            LOGGER.warn("missing language parameter");
            language = (String) Config.param("default-language");
        }

        LOGGER.info("HTML language set to: " + language);
        XQueryRunner.generateHTML(outputDir.getAbsolutePath() + "/", htmlDir.getAbsolutePath() + "/", language);

        long time = System.currentTimeMillis() - start;
        LOGGER.info("finished validation in " + time + " ms");
    }

    public String numErrors() {
        File outputDir = new File((String) Config.param("output-dir"));
        File htmlDir = new File(outputDir, "html");
        File htmlIndex = new File(htmlDir, "index.html");

        Pattern fileName = Pattern.compile("<a href=\"([^\"]+)\\.inj\">");
        Pattern numErrors = Pattern.compile("<span class=\"num-errors\">(\\d+)</span>");
        StringBuilder errors = new StringBuilder();

        try (BufferedReader reader = new BufferedReader(new FileReader(htmlIndex))) {
            String line;

            while ((line = reader.readLine()) != null) {
                Matcher fileNameMatcher = fileName.matcher(line);
                Matcher numErrorsMatcher = numErrors.matcher(line);

                if (fileNameMatcher.find()) errors.append("|" + fileNameMatcher.group(1));
                if (numErrorsMatcher.find()) errors.append("=" + numErrorsMatcher.group(1));
            }

        } catch (IOException e) {
            LOGGER.error("failed to parse errors from HTML index: " + htmlIndex.getAbsolutePath());
        }

        if (errors.length() > 0) return errors.substring(1);
        return "";
    }
}
