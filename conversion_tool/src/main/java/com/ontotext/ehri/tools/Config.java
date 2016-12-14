package com.ontotext.ehri.tools;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yaml.snakeyaml.Yaml;

import java.io.*;
import java.util.Map;

public class Config {
    private static final Logger LOGGER = LoggerFactory.getLogger(Config.class);
    private static final String CONFIG_PATH = "/config.yml";

    private static Map config;
    static {
        Yaml yaml = new Yaml();

        // load base configuration
        LOGGER.info("loading base configuration from: " + CONFIG_PATH);
        try (InputStream inputStream = Config.class.getResourceAsStream(CONFIG_PATH)) {
            config = (Map) yaml.load(inputStream);
        } catch (IOException e) {
            LOGGER.error("failed to load base configuration from: " + CONFIG_PATH);
            System.exit(1);
        }

        String userConfigPath = (String) param("user-config-path");
        File userConfigFile = new File(userConfigPath);

        // load user configuration if present
        if (userConfigFile.isFile()) {
            LOGGER.info("loading user configuration from: " + userConfigFile.getAbsolutePath());
            try (InputStream inputStream = new FileInputStream(userConfigFile)) {
                Map userConfig = (Map) yaml.load(inputStream);

                // override base configuration with user configuration if non-empty
                if (userConfig != null) config.putAll(userConfig);
                else LOGGER.warn("empty user configuration at: " + userConfigFile.getAbsolutePath());

            } catch (IOException e) {
                LOGGER.error("failed to load user configuration from: " + userConfigFile.getAbsolutePath());
            }

        } else {
            LOGGER.warn("no user configuration at: " + userConfigFile.getAbsolutePath());
        }
    }

    /**
     * Return the value of the configuration parameter with the given name.
     * @param name The name of the configuration parameter.
     * @return The value of the configuration parameter, or null if no such parameter exists.
     */
    public static Object param(String name) {
        Object value = config.get(name);
        if (value == null) LOGGER.warn("no such parameter: " + name);
        return value;
    }
}
