import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Results = () => {
  const location = useLocation();
  const { state } = location;
  const text = state ? state.text : '';

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col gap-4 text-center max-w-3xl w-full p-4">
        <h1 className="text-4xl font-bold mb-4">Scanned Text</h1>
        <textarea
          className="w-full h-96 p-4 border rounded"
          value={text}
          readOnly
        ></textarea>
        <Link to="/" className="bg-red-500 text-white px-4 py-2 rounded mr-4">Go Back</Link>
      </div>
    </div>
  );
};

export default Results;
