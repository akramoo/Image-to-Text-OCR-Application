
# Image-to-Text OCR Application

## Overview

The Image-to-Text OCR application is designed to convert images containing text into editable text format using Optical Character Recognition (OCR) technology. This README provides an overview of the project, its features, technologies used, setup instructions, and usage guidelines.

## Features

- Upload images with text content.
- Perform Optical Character Recognition (OCR) to extract text from images.
- Display extracted text for review and editing.
- Store image data and corresponding text conversions in a MongoDB database.

## Technologies Used

- **Frontend:**
  - React.js
  - Tesseract.js
  - HTML5 & CSS3

- **Backend:**
  - Node.js
  - Express.js
  - Multer
  - Mongoose
  - MongoDB

- **Deployment:**
  - Heroku or AWS (Amazon Web Services)

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/image-to-text-ocr.git
   ```

2. Navigate to the project directory:

   ```bash
   cd image-to-text-ocr
   ```

3. Install dependencies for frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. Configure environment variables:

   Create a `.env` file in the `backend` directory and add the following variables:

   ```plaintext
   PORT=3001
   MONGO_URI=your_mongodb_connection_string
   ```

5. Start the frontend and backend servers:

   In separate terminal windows, run:

   ```bash
   cd frontend
   npm start
   ```

   ```bash
   cd backend
   npm start
   ```

6. Access the application in your browser:

   Open <http://localhost:3000/> to access the frontend UI.

## Usage

1. Upload an image containing text using the file upload feature.
2. Click the "Convert" button to perform OCR on the uploaded image.
3. Once OCR is complete, the extracted text will be displayed for review and editing.
4. Optionally, save the image and its corresponding text to the database.

## Contributors

- Samir Akram OUNIS (@akramoo)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---
