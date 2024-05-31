// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors({origin: true}));
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname );
  },
});

const upload = multer({ dest: 'uploads/' });

// Save image and text to MongoDB
const ImageModel = mongoose.model('Image', new mongoose.Schema({
    name: String,
    path: String,
    text: String,
  }));

// Routes
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const image = req.file;
    const text = req.body.text; 
  
    const newImage = new ImageModel({
      name: image.originalname,
      path: image.path,
      text,
    });
  
    newImage.save()
      .then(() => {
        res.status(200).json({ message: 'Image and text saved successfully' });
      })
      .catch((err) => {
        console.error('Error saving image and text:', err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
