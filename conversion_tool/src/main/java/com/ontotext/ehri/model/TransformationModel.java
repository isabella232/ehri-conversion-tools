package com.ontotext.ehri.model;

/**
 * Created by Boyan on 01-Dec-16.
 */
public class TransformationModel {
    private String selectedOrganization;
    private String fileType;
    private String transformationType;
    private String mappingTypeGeneric;
    private String specificMapping;
    private String xsdSource;
    private String localMapping;
    private String incomeSource;

    public String getSelectedOrganization() {
        return selectedOrganization;
    }

    public void setSelectedOrganization(String selectedOrganization) {
        this.selectedOrganization = selectedOrganization;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getTransformationType() {
        return transformationType;
    }

    public void setTransformationType(String transformationType) {
        this.transformationType = transformationType;
    }

    public String getMappingTypeGeneric() {
        return mappingTypeGeneric;
    }

    public void setMappingTypeGeneric(String mappingTypeGeneric) {
        this.mappingTypeGeneric = mappingTypeGeneric;
    }

    public String getSpecificMapping() {
        return specificMapping;
    }

    public void setSpecificMapping(String specificMapping) {
        this.specificMapping = specificMapping;
    }

    public String getXsdSource() {
        return xsdSource;
    }

    public void setXsdSource(String xsdSource) {
        this.xsdSource = xsdSource;
    }

    public String getLocalMapping() {
        return localMapping;
    }

    public void setLocalMapping(String localMapping) {
        this.localMapping = localMapping;
    }

    public String getIncomeSource() {
        return incomeSource;
    }

    public void setIncomeSource(String incomeSource) {
        this.incomeSource = incomeSource;
    }
}
