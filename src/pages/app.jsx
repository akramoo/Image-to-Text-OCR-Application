import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState('eng');
  const navigate = useNavigate();

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleSubmit = () => {
    setIsLoading(true);
    Tesseract.recognize(image, language, {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .then((result) => {
        setText(result.data.text);
        setIsLoading(false);
        navigate('/results', { state: { text: result.data.text } });
        notifySuccess('Text converted successfully!');
  
        // Send image and text to backend API
        const formData = new FormData();
        formData.append('image', file);
        formData.append('text', result.data.text);
  
        fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error('Error sending data to server:', error));
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        notifyError('Error converting text.');
      });
  };  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleClear = () => {
    setImage('');
    setText('');
    setProgress(0);
    setIsLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
      setImage(URL.createObjectURL(files[0]));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const saveToFile = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'scanned_text.txt';
    link.click();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="text-center max-w-lg w-full p-4 bg-white rounded shadow">
        <div
          className="upload-section border-dashed border-4 border-gray-200 p-4 mb-4"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer text-blue-500">
            {image ? 'Change Image' : 'Upload or Drag & Drop Image'}
          </label>
          {image && (
            <div className="preview-container mt-4">
              <img src={image} alt="Preview" className="max-w-full h-auto" />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block mb-2">Select Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="form-select"
          >
            <option value="eng">English</option>
            <option value="spa">Spanish</option>
            <option value="fra">French</option>
            <option value="deu">German</option>
            {/* Add more languages as needed */}
          </select>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : (
          <>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full"
              disabled={!image}
            >
              Convert
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-500 text-white px-4 py-2 rounded mb-2 w-full"
              disabled={!image && !text}
            >
              Clear
            </button>
            {text && (
              <button
                onClick={saveToFile}
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
              >
                Save to File
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
