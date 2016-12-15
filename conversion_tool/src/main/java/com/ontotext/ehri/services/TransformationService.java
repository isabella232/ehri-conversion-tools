package com.ontotext.ehri.services;

import com.ontotext.ehri.model.TransformationModel;
import com.ontotext.ehri.tools.*;
import net.sf.saxon.s9api.XsltExecutable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class TransformationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(TransformationService.class);
    private static final XsltExecutable EAD1_TO_EAD2002 = XSLTRunner.compileStylesheet((String) Config.param("ead1-to-ead2002-path"));

    public void transform(TransformationModel model) {
        LOGGER.info("starting transformation with these parameters: " + model.toString());
        long start = System.currentTimeMillis();

        if (model.getOrganisation() == null && model.getMapping() == null && model.getXquery() == null) {
            LOGGER.info("performing EAD1 to EAD2002 conversion");
            XSLTRunner.runStylesheet(EAD1_TO_EAD2002, (String) Config.param("input-dir"), (String) Config.param("output-dir"));

        } else if (model.getMapping() == null && model.getXquery() == null) {
            LOGGER.info("performing generic transformation with Google Sheet mapping for organisation: " + model.getOrganisation());
            String sheetID = Config.mappingSheetID(model.getOrganisation());
            String sheetRange = Config.mappingSheetRange(model.getOrganisation());
            String mapping = GoogleSheetReader.toString(GoogleSheetReader.values(sheetID, sheetRange), "\n", "\t");
            XQueryRunner.genericTransform(mapping, (String) Config.param("input-dir"), (String) Config.param("output-dir"));

        } else if (model.getXquery() == null) {
            LOGGER.info("performing generic transformation with local sheet mapping: " + model.getMapping());
            File mappingDir = new File((String) Config.param("mapping-dir"));
            File mappingFile = new File(mappingDir, model.getMapping());
            String mapping = ExcelReader.stringify(ExcelReader.readSheet(mappingFile.getAbsolutePath(), 0), "\t", "\n");
            XQueryRunner.genericTransform(mapping, (String) Config.param("input-dir"), (String) Config.param("output-dir"));

        } else {
            LOGGER.info("performing transformation with custom XQuery: " + model.getXquery());
            File xqueryDir = new File((String) Config.param("xquery-dir"));
            File xqueryFile = new File(xqueryDir, model.getXquery());
            XQueryRunner.customTransform(xqueryFile.getAbsolutePath(), (String) Config.param("input-dir"), (String) Config.param("output-dir"));
        }

        long time = System.currentTimeMillis() - start;
        LOGGER.info("finished transformation in " + time + " ms");
    }
}
