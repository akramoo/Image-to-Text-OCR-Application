import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-gray-100">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold mb-4">About OCR Scanner App</h1>
        <p className="text-lg mb-6">
          This app uses Tesseract.js to convert images to text. It's fast, reliable, and easy to use.
        </p>
        <p className="text-lg">
          Upload an image or use the drag-and-drop feature to get started. The app supports multiple languages and provides a smooth user experience.
        </p>
      </div>
      <Link to="/" className="bg-red-500 text-white px-4 py-2 rounded mr-4">Go Back</Link>
    </div>
  );
};

export default About;
