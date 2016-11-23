package com.ontotext.ehri;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by Boyan on 23-Nov-16.
 */

@org.springframework.web.bind.annotation.RestController
public class RestController {

    @RequestMapping(value = "/rest", method = RequestMethod.GET)
    public String json(@RequestParam("context") String context){
        return "json";
    }
}
