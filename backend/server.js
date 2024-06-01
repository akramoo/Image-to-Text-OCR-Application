const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
app.use(cors({ origin: true }));

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use('/api', imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
