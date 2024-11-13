const pdf = require('html-pdf');

// Function to generate PDF from HTML
const generatePDF = (htmlContent, res) => {
    const options = {
        format: 'A4',
        printBackground: true, // Print background images/styles
        border: '10mm'
    };

    pdf.create(htmlContent, options).toBuffer((err, buffer) => {
        if (err) {
            console.error('Error generating PDF:', err);
            return res.status(500).json({ message: 'Error generating PDF', error: err });
        }

        // Set response headers for downloading the PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="bill.pdf"');

        // Send the PDF buffer as response
        res.status(200).send(buffer);
    });
};

module.exports = { generatePDF };
