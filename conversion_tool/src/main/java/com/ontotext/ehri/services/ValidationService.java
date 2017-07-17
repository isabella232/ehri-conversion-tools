package com.ontotext.ehri.services;

import com.ontotext.ehri.model.TransformationModel;
import com.ontotext.ehri.tools.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ValidationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ValidationService.class);

    public String validate(TransformationModel model, Date requestDate, String path) {
        if (model != null) {
            LOGGER.info("starting validation with these parameters: " + model.toString());
        }

        long start = System.currentTimeMillis();

        File outputDir = new File(Configuration.getString("output-dir"));
        if (requestDate == null) {
            outputDir = new File(outputDir, path);
        } else {
            outputDir = new File(outputDir, Configuration.DATE_FORMAT.format(requestDate));
        }


        // validate EAD files with the RNG schema
        File rng = TextReader.resolvePath(Configuration.getString("ead-rng-path"));
        File eadDir = new File(outputDir, Configuration.getString("ead-subdir"));
        File svrlDir = new File(outputDir, Configuration.getString("svrl-subdir"));
        JingRunner.validateDirectory(rng, eadDir, svrlDir);

        // inject SVRL messages into EAD files
        File injectedDir = new File(outputDir, Configuration.getString("injected-subdir"));
        SVRLInjector.injectDirectory(eadDir, svrlDir, injectedDir);

        // generate HTML preview from injected files
        File htmlDir = new File(outputDir, Configuration.getString("html-subdir"));
        if (! htmlDir.isDirectory()) htmlDir.mkdir();
        String language = model.getLanguage();
        if (language == null) language = Configuration.getString("default-language");
        XQueryRunner.generateHTML(injectedDir, htmlDir, language);

        long time = System.currentTimeMillis() - start;
        LOGGER.info("finished validation in " + time + " ms");

        // return the error report
        File htmlIndex = new File(htmlDir, "index.html");
        return numErrors(htmlIndex);
    }

    private String numErrors(File htmlIndex) {
        if (! htmlIndex.isFile()) {
            LOGGER.error("cannot find HTML index: " + htmlIndex.getAbsolutePath());
            return "";
        }

        Pattern fileName = Pattern.compile("<a href=\"([^\"]+)\\.html\">");
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
