import React, { useState, useRef, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';
import '@tensorflow/tfjs';

// This component allows users to upload an image and get predictions from a model
// It uses the to load the model and make predictions
// It also handles file input and displays the prediction results
const ImagePrediction = () => {
  const [model, setModel] = useState(null);
  const [predictionResults, setPredictionResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  const URL = "https://teachablemachine.withgoogle.com/models/46N9lZImy/";

  // Load the model and metadata
  useEffect(() => {
    const loadModel = async () => {
      const modelURL = `${URL}model.json`;
      const metadataURL = `${URL}metadata.json`;
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
      setLoading(false);
    };
    loadModel();
  }, []);

  // Handle file input and make predictions
  // It uses the model to predict the class of the uploaded image
  // It creates an image object from the uploaded file and uses the model to get predictions
  const handleFileInput = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgURL = window.URL.createObjectURL(file); 
      const image = new Image();
      image.src = imgURL;
      image.onload = async () => {
        const predictions = await model.predict(image);
        const result = predictions.map((prediction) => ({
          className: prediction.className,
          probability: prediction.probability.toFixed(2),
        }));
        setPredictionResults(result);
      };
    }
  };

  return (
    <div>
      <h2>Teachable Machine Image Model</h2>
      {loading ? (
        <p>Loading model...</p>
      ) : (
        <div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileInput}
          />
          <button onClick={() => fileInputRef.current.click()}>
            Upload Image
          </button>
          {predictionResults.length > 0 && (
            <div>
              <h3>Prediction Results:</h3>
              {predictionResults.map((result, index) => (
                <div key={index}>
                  <strong>{result.className}</strong>: {result.probability}%
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImagePrediction;


