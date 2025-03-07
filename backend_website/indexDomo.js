const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const TeachableMachine = require('@sashido/teachablemachine-node');

const model = new TeachableMachine({
  modelUrl: 'https://teachablemachine.withgoogle.com/models/46N9lZImy/',  // URL to your Teachable Machine model
});

const corsOptions = {
  origin: 'http://localhost:3000',  // React app URL (make sure it's running on port 3000)
  optionsSuccessStatus: 200,
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send(`
    <form action="/image/classify" method="POST">
      <p>Enter a link to an image:</p>
      <input name="imageUrl" autoComplete="off" />
      <button type="submit">Predict Image</button>
    </form>
  `);
});

app.post('/image/classify', async (req, res) => {
  const url = req.body.imageUrl;
  console.log(`Classifying image: ${url}`);

  try {
    const predictions = await model.classify({ imageUrl: url });
    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});