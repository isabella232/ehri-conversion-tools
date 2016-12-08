package com.ontotext.ehri;

import com.ontotext.ehri.tools.GoogleSheetReader;
import org.junit.Test;

import java.io.IOException;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.fail;

public class GoogleSheetReaderTests {

    @Test
    public void testGetValues() {
        String spreadsheetId = "1H8bgPSWTvvfICZ6znvFpf4iDCib39KZ0jfgTYHmv5e0";

        try {
            checkValue(spreadsheetId, "A1:A1", "target-path");
            checkValue(spreadsheetId, "D1:D1", "value");
            checkValue(spreadsheetId, "A2:A2", "/");
            checkValue(spreadsheetId, "B2:B2", "ead");
        } catch (IOException e) {
            e.printStackTrace();
            fail("exception while testing: " + e.toString());
        }
    }

    private static void checkValue(String spreadsheetId, String range, Object expected) throws IOException {
        List<List<Object>> values = GoogleSheetReader.getValues(spreadsheetId, range);
        assertFalse("no rows", values.isEmpty());
        assertFalse("no cells at first row", values.get(0).isEmpty());
        assertEquals("unexpected value at \"" + range + "\" in spreadsheet \"" + spreadsheetId + "\"", expected, values.get(0).get(0));
    }
}
