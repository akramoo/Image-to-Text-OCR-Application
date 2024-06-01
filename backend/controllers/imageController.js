const fs = require('fs');
const ImageModel = require('../models/ImageModel');

const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imagePath = req.file.path;
  const imageName = req.file.originalname;
  const imageFileName = `${imageName.split('.')[0]}_image.${imageName.split('.')[1]}`;
  const textFileName = `${imageName.split('.')[0]}_text.txt`;

  // Save image to file
  fs.copyFileSync(imagePath, `uploads/${imageFileName}`);

  // Save text to a .txt file
  const extractedText = req.body.text;
  fs.writeFileSync(`uploads/${textFileName}`, extractedText);

  // Save to MongoDB
  const newImage = new ImageModel({
    name: imageName,
    imagePath: `uploads/${imageFileName}`,
    textPath: `uploads/${textFileName}`,
    text: extractedText,
  });

  newImage.save()
    .then(() => {
      res.status(200).json({
        message: 'File uploaded and processed successfully.',
        imageFile: `uploads/${imageFileName}`,
        textFile: `uploads/${textFileName}`,
      });
    })
    .catch((err) => {
      console.error('Error saving image and text:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
};

module.exports = { uploadImage };
