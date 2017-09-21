package com.ontotext.ehri.services;

import com.ontotext.ehri.model.TransformationModel;
import com.ontotext.ehri.tools.Configuration;
import com.ontotext.ehri.tools.XQueryRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.CopyOption;
import java.nio.file.Files;

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
                    Files.move(new File("D:\\projects\\EHRI\\Conversion_tool\\conversion_tool-0.1\\conversion_tool-0.4\\input\\" + input.getName()).toPath() , new File("D:\\projects\\EHRI\\Conversion_tool\\conversion_tool-0.1\\conversion_tool-0.4\\" + input.getName()).toPath(), REPLACE_EXISTING);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
