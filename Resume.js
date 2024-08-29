document.getElementById('download-pdf').addEventListener('click', function() {
    // Ensure the jsPDF is properly imported and used
    const { jsPDF } = window.jspdf;

    html2canvas(document.body, { scale: 2 }).then(function(canvas) {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        pdf.save('Donnay Krog CV.pdf');
    }).catch(function(error) {
        console.error('Error generating PDF:', error);
    });
});
