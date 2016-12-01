package com.ontotext.ehri.controllers;

import com.ontotext.ehri.model.TransformationModel;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by Boyan on 23-Nov-16.
 */

@org.springframework.web.bind.annotation.RestController
@RequestMapping(value = "/rest")
public class RestController {

    @RequestMapping(value = "/process", method = RequestMethod.GET)
    public String transform(TransformationModel transformationModel){

        return "Your files are annotated successfully!";
    }

    @RequestMapping(value = "/error", method = RequestMethod.GET)
    public String errorPage(){
        return "errorPage";
    }

}
