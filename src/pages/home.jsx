import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to OCR Scanner App</h1>
        <p className="text-lg mb-6">Convert your images to text easily and quickly.</p>
        <div>
          <Link to="/scan" className="bg-blue-500 text-white px-4 py-2 rounded mr-4">Start Scanning</Link>
          <Link to="/about" className="bg-gray-500 text-white px-4 py-2 rounded">About</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
