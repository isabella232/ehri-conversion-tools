package com.ontotext.ehri.services;

import com.ontotext.ehri.tools.Config;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class ResourceService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ResourceService.class);
    private static final String SEPARATOR = "|";

    static {
        checkResourceDirs();
    }

    private static void checkResourceDirs() {
        LOGGER.info("checking resource directories");
        checkDir((String) Config.param("input-dir"));
        checkDir((String) Config.param("output-dir"));
        checkDir((String) Config.param("mapping-dir"));
        checkDir((String) Config.param("xquery-dir"));
    }

    private static void checkDir(String path) {
        File dir = new File(path);
        if (dir.isDirectory()) return;

        LOGGER.info("creating directory: " + dir.getAbsolutePath());
        dir.mkdir();
    }

    public String listInputDirContents() {
        return listDirContents((String) Config.param("input-dir"), SEPARATOR);
    }

    public String listOutputDirContents() {
        return listDirContents((String) Config.param("output-dir"), SEPARATOR);
    }

    public String listMappingDirContents() {
        return listDirContents((String) Config.param("mapping-dir"), SEPARATOR);
    }

    public String listXqueryDirContents() {
        return listDirContents((String) Config.param("xquery-dir"), SEPARATOR);
    }

    private static String listDirContents(String path, String separator) {
        return String.join(separator, listDirContents(path));
    }

    private static String[] listDirContents(String path) {
        File dir = new File(path);
        File[] contents = dir.listFiles();

        String[] names = new String[contents.length];
        for (int i = 0; i < contents.length; i++) {
            names[i] = contents[i].getName();
        }

        return names;
    }

    public String listOrganisations() {
        return String.join(SEPARATOR, Config.organisations());
    }

    public String mappingSheetID(String organisation) {
        return Config.mappingSheetID(organisation);
    }

    public String mappingSheetRange(String organisation) {
        return Config.mappingSheetRange(organisation);
    }
}
