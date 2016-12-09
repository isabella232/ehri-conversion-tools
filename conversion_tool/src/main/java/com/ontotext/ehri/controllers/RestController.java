package com.ontotext.ehri.controllers;

import com.ontotext.ehri.model.TransformationModel;
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
    private TransformationService transformationService;

    @Autowired
    private ValidationService validationService;

    @RequestMapping(value = "/process", method = RequestMethod.GET)
    public String transform(TransformationModel transformationModel){
        transformationService.transform(transformationModel);
        validationService.validate(transformationModel);
        return "Your files are annotated successfully!";
    }

    @RequestMapping(value = "/error", method = RequestMethod.GET)
    public String errorPage(){
        return "errorPage";
    }

}
