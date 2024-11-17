function captureFunction() {
    // Find all elements with the class 'capture'
    const captureElements = document.querySelectorAll('.capture');

    // Create an array to hold promises for each html2canvas call
    const canvasPromises = Array.from(captureElements).map(element =>
        html2canvas(element)
    );

    // Process all canvases once rendered
    Promise.all(canvasPromises).then(canvases => {
        // Determine total width and maximum height for the final canvas
        const totalWidth = canvases.reduce((width, canvas) => width + canvas.width, 0);
        const maxHeight = Math.max(...canvases.map(canvas => canvas.height));

        // Create a new canvas to concatenate all others horizontally
        const compositeCanvas = document.createElement('canvas');
        compositeCanvas.width = totalWidth;
        compositeCanvas.height = maxHeight;
        const ctx = compositeCanvas.getContext('2d');

        // Fill the entire composite canvas with white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, compositeCanvas.width, compositeCanvas.height);

        // Draw each canvas onto the composite canvas, centering vertically
        let xOffset = 0;
        canvases.forEach(canvas => {
            // Calculate vertical offset to center the canvas
            const yOffset = (maxHeight - canvas.height) / 2;
            // Fill the area with white (optional, as the composite is already white)
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(xOffset, 0, canvas.width, maxHeight);
            // Draw the actual canvas
            ctx.drawImage(canvas, xOffset, yOffset);
            xOffset += canvas.width;
        });

        // Convert the composite canvas to a data URL and download it
        const link = document.createElement('a');
        link.href = compositeCanvas.toDataURL('image/jpeg', 1.0); // Best quality
        link.download = 'weekly-bulletin.jpg';
        link.click();
    });
}