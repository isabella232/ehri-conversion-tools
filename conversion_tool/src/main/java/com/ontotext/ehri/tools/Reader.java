package com.ontotext.ehri.tools;

import java.io.*;
import java.net.URL;

public class Reader {

    public static String read(String path, String encoding) throws IOException {
        InputStream input = Reader.class.getResourceAsStream(path);

        if (input == null) {
            File file = new File(path);
            if (file.isFile()) input = new FileInputStream(path);
            else input = new URL(path).openStream();
        }

        return read(input, encoding);
    }

    private static String read(InputStream input, String encoding) throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int length;
        while ((length = input.read(buffer)) != -1) output.write(buffer, 0, length);
        return output.toString(encoding);
    }
}
