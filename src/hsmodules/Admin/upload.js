const extractTextFromPDF = async () => {
  try {
    if (!file) {
      console.error('No file uploaded.');
      return;
    }

    // Convert the uploaded file to a Uint8Array
    const pdfData = new Uint8Array(await file.arrayBuffer());

    // Get a reference to the PDF document using pdf.js
    const pdf = await pdfjs.getDocument({ data: pdfData }).promise;

    // Get the total number of pages in the PDF document
    const numPages = pdf.numPages;

    // Create an array to store the extracted text lines for all pages
    const extractedTextByLine = [];

    // Loop through each page of the PDF document
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      // Get a reference to the current page
      const page = await pdf.getPage(pageNumber);

      // Extract text content from the current page
      const pageText = await page.getTextContent();

      // Extracted text from the page is initially in an array of text items,
      // so we map it to extract only the text strings
      const pageExtractedText = pageText.items.map((item) => item.str);

      // Concatenate the text items to form lines of text
      const lines = [];
      let currentLine = '';
      pageExtractedText.forEach((text) => {
        if (text.endsWith('\n')) {
          // If the text ends with a newline character, it's the end of a line
          currentLine += text;
          lines.push(currentLine);
          currentLine = '';
        } else {
          // Otherwise, add the text to the current line
          currentLine += text;
        }
      });

      // Push the extracted text lines of the current page into the array
      extractedTextByLine.push(lines);
    }

    // Set the state with the extracted content grouped by lines
    setPageData(extractedTextByLine);
  } catch (error) {
    console.error('Error extracting text:', error);
  }
};
