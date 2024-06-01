import React from 'react';

const FileUpload = ({ image, handleFileChange, handleDrop, handleDragOver }) => (
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
);

export default FileUpload;
