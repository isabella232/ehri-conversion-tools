package com.ontotext.ehri.tools;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class TextReader {
    private static final Logger LOGGER = LoggerFactory.getLogger(TextReader.class);
    private static final Charset DEFAULT_ENCODING = StandardCharsets.UTF_8;

    private static byte[] buffer = new byte[1024];

    /**
     * Open stream to a resource, file, or URL.
     * @param path Relative path, absolute path, or URL.
     * @return The input stream if the path is resolved, or null otherwise.
     */
    public static InputStream openInputStream(String path) {

        // try to open resource
        InputStream inputStream = TextReader.class.getResourceAsStream(path);
        if (inputStream != null) return inputStream;

        // try to open file
        File file = new File(path);
        if (file.isFile()) try {
            return new FileInputStream(file);
        } catch (FileNotFoundException e) {
            LOGGER.error("failed to stream from file: " + file.getAbsolutePath(), e);
            return null;
        }

        // try to open URL
        try {
            return new URL(path).openStream();
        } catch (IOException e) {
            LOGGER.error("failed to stream from URL: " + path, e);
            return null;
        }
    }

    /**
     * Completely read the text from an input stream in the specified encoding.
     * @param inputStream The input stream to read from.
     * @param encoding The encoding to read in.
     * @return The text as a string if successful, or null otherwise.
     */
    public static String readText(InputStream inputStream, Charset encoding) {

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            int length;
            while ((length = inputStream.read(buffer)) != -1) outputStream.write(buffer, 0, length);
            return outputStream.toString(encoding.name());
        } catch (IOException e) {
            LOGGER.error("failed to read text from stream", e);
            return null;
        }
    }

    public static String readText(String path, Charset encoding) {

        try (InputStream inputStream = openInputStream(path)) {
            return readText(inputStream, encoding);
        } catch (IOException e) {
            LOGGER.error("failed to read text from path: " + path, e);
            return null;
        }
    }

    public static String readText(String path) {
        return readText(path, DEFAULT_ENCODING);
    }
}
