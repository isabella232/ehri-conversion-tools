package com.ontotext.ehri.tools;

import com.thaiopensource.relaxng.util.Driver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class JingRunner {
    private static final Logger LOGGER = LoggerFactory.getLogger(JingRunner.class);
    private static final Charset ENCODING = StandardCharsets.UTF_8;

    public static void validate(String rngPath, String xmlPath) {
        File rng = TextReader.resolvePath(rngPath);
        if (! rng.isFile()) return;

        File xml = TextReader.resolvePath(xmlPath);
        if (! xml.exists()) return;

        if (xml.isFile()) {
            File svrl = new File(xml.getAbsolutePath() + ".svrl");
            validate(rng, xml, svrl);
        } else if (xml.isDirectory()) {

            for (File xmlFile : xml.listFiles()) {
                if (! xmlFile.isFile()) continue;

                File svrlFile = new File(xmlFile.getAbsolutePath() + ".svrl");
                validate(rng, xmlFile, svrlFile);
            }
        }
    }

    private static void validate(File rng, File xml, File svrl) {
        LOGGER.info("validating \"" + xml.getAbsolutePath() + "\" with \"" + rng.getAbsolutePath() + "\"");
        String[] args = {
                //"-e", ENCODING.name(),
                "-S", svrl.getAbsolutePath(),
                rng.getAbsolutePath(),
                xml.getAbsolutePath()
        };

        Driver.main(args);
        LOGGER.info("validation report for \"" + xml.getAbsolutePath() + "\" written to \"" + svrl.getAbsolutePath() + "\"");
    }
}
