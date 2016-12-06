package com.ontotext.ehri.services;

import com.ontotext.ehri.model.TransformationModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class TransformationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(TransformationService.class);

    public void transform(TransformationModel model) {
        LOGGER.info(model.toString());
    }
}
