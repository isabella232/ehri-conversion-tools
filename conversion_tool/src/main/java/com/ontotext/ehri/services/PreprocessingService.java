package com.ontotext.ehri.services;

import com.ontotext.ehri.model.TransformationModel;
import com.ontotext.ehri.tools.Configuration;
import com.ontotext.ehri.tools.XQueryRunner;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

/**
 * Created by Boyan on 20-Sep-17.
 */
@Service
public class PreprocessingService {

    public void preprocessData(TransformationModel transformationModel) {
        String organisation = transformationModel.getOrganisation();
        File uniqueFields = new File("");
        File multipleFields = new File("");
        if (organisation.equals("IL-YV") && transformationModel.getFileType().equalsIgnoreCase("csv")) {
            File inputDir = new File(Configuration.getString("input-dir"));
            File[] files = inputDir.listFiles();
            for (File input : files) {
                if (input.isFile()) {
                    if (input.getName().contains("unique")) {
                        uniqueFields = input;
                    } else {
                        multipleFields = input;
                    }
                }
            }
            XQueryRunner.buildHierarchy(uniqueFields, multipleFields);

            for (File input : files) {
                try {
                    System.out.println(Paths.get("").toAbsolutePath());
                    File destination = new File(Paths.get("").toAbsolutePath().getParent() + File.separator + "input" + File.separator + "YV");
                    File source = new File(Paths.get("").toAbsolutePath().getParent() + File.separator + "input" + File.separator + input.getName());
                    if (!destination.isDirectory()) destination.mkdir();
                    Files.move(source.toPath() , new File(destination.getAbsolutePath() + File.separator + input.getName()).toPath(), REPLACE_EXISTING);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
