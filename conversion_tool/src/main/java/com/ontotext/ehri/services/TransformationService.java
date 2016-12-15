package com.ontotext.ehri.services;

import com.ontotext.ehri.model.TransformationModel;
import com.ontotext.ehri.tools.*;
import net.sf.saxon.s9api.XsltExecutable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class TransformationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(TransformationService.class);
    private static final XsltExecutable EAD1_TO_EAD2002 = XSLTRunner.compileStylesheet((String) Config.param("ead1-to-ead2002-path"));

    public void transform(TransformationModel model) {
        LOGGER.info("starting transformation with these parameters: " + model.toString());
        long start = System.currentTimeMillis();

        if (model.getMapping() == null && model.getXquery() == null) {
            LOGGER.info("performing EAD1 to EAD2002 conversion");
            XSLTRunner.runStylesheet(EAD1_TO_EAD2002, (String) Config.param("input-dir"), (String) Config.param("output-dir"));
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
                    mapping = GoogleSheetReader.toString(GoogleSheetReader.values(model.getMapping(), model.getMappingRange()), "\n", "\t");
                }

                XQueryRunner.genericTransform(mapping, (String) Config.param("input-dir"), (String) Config.param("output-dir"));
            } catch (IOException e) {
                LOGGER.error("exception while performing generic transformation", e);
            }

        } else {
            LOGGER.info("performing custom transformation");
            XQueryRunner.customTransform(model.getXquery(), (String) Config.param("input-dir"), (String) Config.param("output-dir"));
        }

        long time = System.currentTimeMillis() - start;
        LOGGER.info("finished transformation in " + time + " ms");
    }
}
