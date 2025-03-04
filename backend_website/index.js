const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (Remove deprecated options)
mongoose.connect('mongodb+srv://campbellh2711:z6sZsNRrN5jfv6my@hughmongodb.0m42p.mongodb.net/HughMongoDB')
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));