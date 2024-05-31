import React from 'react';

const About = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold mb-4">About OCR Scanner App</h1>
        <p className="text-lg mb-6">
          This app uses Tesseract.js to convert images to text. It's fast, reliable, and easy to use.
        </p>
        <p className="text-lg">
          Upload an image or use the drag-and-drop feature to get started. The app supports multiple languages and provides a smooth user experience.
        </p>
      </div>
    </div>
  );
};

export default About;
