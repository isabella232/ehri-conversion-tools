package com.ontotext.ehri.tools;

import com.thaiopensource.relaxng.util.Driver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;

public class JingRunner {
    private static final Logger LOGGER = LoggerFactory.getLogger(JingRunner.class);
    private static final Driver DRIVER = new Driver();

    public static void validate(String rngPath, String xmlPath) {
        File rng = TextReader.resolvePath(rngPath);
        if (! rng.isFile()) return;

        File xml = TextReader.resolvePath(xmlPath);
        if (xml.isFile()) {
            File svrl = new File(xml.getAbsolutePath() + ".svrl");
            validate(rng, xml, svrl);
        } else if (xml.isDirectory()) {

            for (File xmlFile : xml.listFiles(XMLFileFilter.INSTANCE)) {
                File svrl = new File(xmlFile.getAbsolutePath() + ".svrl");
                validate(rng, xmlFile, svrl);
            }
        }
    }

    private static void validate(File rng, File xml, File svrl) {
        LOGGER.info("validating \"" + xml.getAbsolutePath() + "\" with \"" + rng.getAbsolutePath() + "\"");
        String[] args = {
                //"-e", Config.ENCODING.name(),
                "-S", svrl.getAbsolutePath(),
                rng.getAbsolutePath(),
                xml.getAbsolutePath()
        };

        DRIVER.doMain(args);
        LOGGER.info("validation report for \"" + xml.getAbsolutePath() + "\" written to \"" + svrl.getAbsolutePath() + "\"");
    }
}
