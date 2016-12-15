package com.ontotext.ehri.controllers;

import com.ontotext.ehri.model.TransformationModel;
import com.ontotext.ehri.services.ResourceService;
import com.ontotext.ehri.services.TransformationService;
import com.ontotext.ehri.services.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Boyan on 23-Nov-16.
 */

@org.springframework.web.bind.annotation.RestController
@RequestMapping(value = "/rest")
public class RestController {

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private TransformationService transformationService;

    @Autowired
    private ValidationService validationService;

    @RequestMapping(value = "/process", method = RequestMethod.GET)
    public String transform(TransformationModel transformationModel){
        transformationService.transform(transformationModel);
        validationService.validate(transformationModel);
        return "Done!";
    }

    @RequestMapping(value = "/list-input-dir-contents", method = RequestMethod.GET)
    public String listInputDirContents() {
        return resourceService.listInputDirContents();
    }

    @RequestMapping(value = "/list-output-dir-contents", method = RequestMethod.GET)
    public String listOutputDirContents() {
        return resourceService.listOutputDirContents();
    }

    @RequestMapping(value = "/list-mapping-dir-contents", method = RequestMethod.GET)
    public String listMappingDirContents() {
        return resourceService.listMappingDirContents();
    }

    @RequestMapping(value = "/list-xquery-dir-contents", method = RequestMethod.GET)
    public String listXqueryDirContents() {
        return resourceService.listXqueryDirContents();
    }

    @RequestMapping(value = "/error", method = RequestMethod.GET)
    public String errorPage(){
        return "errorPage";
    }

}
