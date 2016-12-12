package com.ontotext.ehri.tools;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import java.io.File;
import java.io.IOException;

public class SVRLInjector {
    private static final Logger LOGGER = LoggerFactory.getLogger(SVRLInjector.class);
    private static final DocumentBuilderFactory DOCUMENT_BUILDER_FACTORY = DocumentBuilderFactory.newInstance();
    private static final TransformerFactory TRANSFORMER_FACTORY = TransformerFactory.newInstance();
    private static final XPathFactory XPATH_FACTORY = XPathFactory.newInstance();
    private static final XPath XPATH = XPATH_FACTORY.newXPath();

    private static DocumentBuilder documentBuilder;
    static {
        try {
            documentBuilder = DOCUMENT_BUILDER_FACTORY.newDocumentBuilder();
        } catch (ParserConfigurationException e) {
            LOGGER.error("failed to create document builder", e);
        }
    }

    private static Transformer transformer;
    static {
        try {
            transformer = TRANSFORMER_FACTORY.newTransformer();
        } catch (TransformerConfigurationException e) {
            LOGGER.error("failed to create transformer", e);
        }
    }

    public static void inject(String xmlPath) {
        File xml = TextReader.resolvePath(xmlPath);

        if (xml.isFile()) {
            File svrl = new File(xml.getAbsolutePath() + ".svrl");
            if (! svrl.isFile()) return;

            File output = new File(xml.getAbsolutePath() + ".inj");
            inject(xml, svrl, output);

        } else if (xml.isDirectory()) {

            for (File xmlFile : xml.listFiles(XMLFileFilter.INSTANCE)) {
                File svrl = new File(xmlFile.getAbsolutePath() + ".svrl");
                if (! svrl.isFile()) return;

                File output = new File(xmlFile.getAbsolutePath() + ".inj");
                inject(xmlFile, svrl, output);
            }
        }
    }

    private static void inject(File xmlFile, File svrlFile, File outputFile) {
        LOGGER.info("injecting \"" + xmlFile.getAbsolutePath() + "\" with \"" + svrlFile.getAbsolutePath() + "\"");
        Document xml = read(xmlFile);
        Document svrl = read(svrlFile);
        inject(xml, svrl);
        write(xml, outputFile);
        LOGGER.info("injection output for \"" + xmlFile.getAbsolutePath() + "\" written to \"" + outputFile.getAbsolutePath() + "\"");
    }

    private static void inject(Document xml, Document svrl) {
        NodeList fails = svrl.getDocumentElement().getElementsByTagName("svrl:failed-assert");

        for (int i = 0; i < fails.getLength(); i++) {
            Element fail = (Element) fails.item(i);

            String path = fail.getAttribute("location");
            if (path.equals("")) continue;

            try {
                Element target = (Element) XPATH.evaluate(path, xml, XPathConstants.NODE);
                
                Node text = fail.getElementsByTagName("svrl:text").item(0);
                if (text == null) continue;
                target.setAttribute("svrl_text", text.getTextContent());

                Node docu = fail.getElementsByTagName("svrl:diagnostic-reference").item(0);
                if (docu != null) target.setAttribute("svrl_docu", docu.getTextContent());

                String role = fail.getAttribute("role");
                if (! role.equals("")) target.setAttribute("svrl_role", role);

            } catch (XPathExpressionException e) {
                LOGGER.error("failed to evaluate SVRL XPath: " + path, e);
            }
        }
    }

    private static Document read(File xmlFile) {

        try {
            return documentBuilder.parse(xmlFile);
        } catch (SAXException | IOException e) {
            LOGGER.error("failed to read XML from: " + xmlFile.getAbsolutePath(), e);
            return null;
        }
    }

    private static void write(Document xml, File xmlFile) {

        try {
            transformer.transform(new DOMSource(xml), new StreamResult(xmlFile));
        } catch (TransformerException e) {
            LOGGER.error("failed to write XML to: " + xmlFile.getAbsolutePath(), e);
        }
    }
}
