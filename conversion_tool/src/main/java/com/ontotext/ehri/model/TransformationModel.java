package com.ontotext.ehri.model;

public class TransformationModel {
    private String organisation;
    private String fileType;
    private String xquery;
    private String mapping;
    private String mappingRange;
    private String inputDir;
    private String outputDir;

    public String getOrganisation() {
        return organisation;
    }

    public void setOrganisation(String organisation) {
        this.organisation = organisation;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getXquery() {
        return xquery;
    }

    public void setXquery(String xquery) {
        this.xquery = xquery;
    }

    public String getMapping() {
        return mapping;
    }

    public void setMapping(String mapping) {
        this.mapping = mapping;
    }

    public String getMappingRange() {
        return mappingRange;
    }

    public void setMappingRange(String mappingRange) {
        this.mappingRange = mappingRange;
    }

    public String getInputDir() {
        return inputDir;
    }

    public void setInputDir(String inputDir) {
        this.inputDir = inputDir;
    }

    public String getOutputDir() {
        return outputDir;
    }

    public void setOutputDir(String outputDir) {
        this.outputDir = outputDir;
    }

    @Override
    public String toString() {
        return "organisation='" + organisation + '\'' +
                ", fileType='" + fileType + '\'' +
                ", xquery='" + xquery + '\'' +
                ", mapping='" + mapping + '\'' +
                ", mappingRange='" + mappingRange + '\'' +
                ", inputDir='" + inputDir + '\'' +
                ", outputDir='" + outputDir + '\'';
    }
}
