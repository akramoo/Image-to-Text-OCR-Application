import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FileUpload from '../components/fileUpload';
import LanguageSelector from '../components/languageSelector';
import LoadingSpinner from '../components/loadingSpinner';
import TextOutput from '../components/textOutput';
import ToastNotification from '../components/toastNotification';

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
      <ToastNotification />
      <div className="text-center max-w-lg w-full p-4 bg-white rounded shadow">
        <FileUpload
          image={image}
          handleFileChange={handleFileChange}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
        />
        <LanguageSelector language={language} setLanguage={setLanguage} />
        {isLoading ? (
          <LoadingSpinner />
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
            <TextOutput text={text} saveToFile={saveToFile} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
