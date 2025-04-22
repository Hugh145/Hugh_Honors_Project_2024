import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "@tensorflow/tfjs-backend-cpu";
// import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tmImage from "@teachablemachine/image";
import "@tensorflow/tfjs";

const Title = styled.h1`
  color: #2e8b57;
  font-weight: bold;
`;

// Container for the entire detector
const ObjectDetectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Layout that places the image container on the left and predictions list on the right
const DetectorLayout = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

// The Main container that holds the image or placeholder text
const ImageDetectorContainer = styled.div`
  min-width: 700px;
  height: 700px;
  border: 3px solid black;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #f0f0f0;
`;

const TargetImg = styled.img`
  height: 100%;
`;

const TargetBox = styled.div.withConfig({
  shouldForwardProp: (prop) => !['classType', 'score'].includes(prop),
})`
  position: absolute;
  left: ${({ x }) => x + "px"};
  top: ${({ y }) => y + "px"};
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};
  border: 4px solid #1ac71a;
  background-color: transparent;
  z-index: 20;

  &::before {
    content: "${({ classType, score }) => `${classType} ${score.toFixed(1)}%`}";
    color: #1ac71a;
    font-weight: 500;
    font-size: 17px;
    position: absolute;
    top: -1.5em;
    left: -5px;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SelectButton = styled.button`
  padding: 7px 10px;
  border: 2px solid transparent;
  background-color: lightgreen;
  border-radius: 5px;
  color: #0a0f22;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  margin-top: 2em;
  cursor: pointer;
  transition: all 260ms ease-in-out;

  &:hover {
    background-color: lightseagreen;
    border: 2px solid #fff;
    color: black;
  }
`;

/**
 * Red alert box for error messages
 */
const ErrorAlert = styled.div`
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

/**
 * Each individual bird prediction container
 */
const BirdPredictionContainer = styled.div`
  padding: 10px;
  border: 2px solid black;
  border-radius: 5px;
  background-color: #fff;
  font-size: 1rem;
  margin-top: 10px;
  cursor: pointer;
`;

// Container for grouping the list of predictions
const PredictionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Container for the list of predictions from the model
export function ImageClassification() {
  const fileInputRef = useRef();
  const imageRef = useRef();
  const [imgData, setImgData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // State for all classification predictions from model
  const [allBirdPredictions, setAllBirdPredictions] = useState([]);
  // State for the highest prediction (displayed separately)
  const [birdTypePrediction, setBirdTypePrediction] = useState(null);

  const URL = "https://teachablemachine.withgoogle.com/models/Ql_sYTJDp/";
  //const URL = "https://teachablemachine.withgoogle.com/models/46N9lZImy/";
  const [model, setModel] = useState(null);
  const navigate = useNavigate();

  // Load the Teachable Machine model on website load
  // This is the model that classifies the bird species
  // The model is loaded from the URL specified above
  useEffect(() => {
    const loadModel = async () => {
      const modelURL = `${URL}model.json`;
      const metadataURL = `${URL}metadata.json`;
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };
    loadModel();
  }, [URL]);

  // Open the file picker when the user clicks the button
  // This function simulates a click on the hidden file input element
  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // Normalize the predictions to the size of the image
  // This function takes the predictions and the image size as input
  const normalizePredictions = (predictions, imgSize) => {
    if (!predictions || !imgSize || !imageRef) return predictions || [];
    return predictions.map((prediction) => {
      const { bbox } = prediction;
      const [oldX, oldY, oldWidth, oldHeight] = bbox;
      const imgWidth = imageRef.current.width;
      const imgHeight = imageRef.current.height;
      const x = (oldX * imgWidth) / imgSize.width;
      const y = (oldY * imgHeight) / imgSize.height;
      const width = (oldWidth * imgWidth) / imgSize.width;
      const height = (oldHeight * imgHeight) / imgSize.height;
      return { ...prediction, bbox: [x, y, width, height] };
    });
  };
/// Detect objects in the image using COCO-SSD model and normalize the predictions
  // This function uses the COCO-SSD model to detect objects in the image are birds
  const detectObjectsOnImage = async (imageElement, imgSize) => {
    const loadedModel = await cocoSsd.load({});
    const predictions = await loadedModel.detect(imageElement, 6);
    const normalizedPredictions = normalizePredictions(predictions, imgSize);
    setPredictions(normalizedPredictions);

    const isBirdDetected = predictions.some(
      (prediction) => prediction.class.toLowerCase() === "bird"
    );

    if (!isBirdDetected) {
      setErrorMessage("No bird detected in the image. Please upload a clear image containing a bird.");
    } else {
      setErrorMessage("");
      classifyBird(imageElement);
    }
  };

  // Classify the bird using model and set the highest prediction
  const classifyBird = async (imageElement) => {
    if (model) {
      const predictions = await model.predict(imageElement);
      setAllBirdPredictions(predictions);
      const highestPrediction = predictions.sort((a, b) => b.probability - a.probability)[0];
      setBirdTypePrediction(highestPrediction);
    }
  };

  // Read the image file and convert it to a data URL
  // This function uses the FileReader API to read the image file and convert it to a base64 data URL
  const readImage = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  };

  // Handle the file selection event when the user selects an image file
  // This function is triggered when the user selects an image file from the file input
  // It reads the image file and sets the image data in the state
  const onSelectImage = async (e) => {
    setErrorMessage("");
    setPredictions([]);
    setAllBirdPredictions([]);
    setBirdTypePrediction(null);
    setLoading(true);

    const file = e.target.files[0];
    if (!file) {
      setLoading(false);
      return;
    }
    // Check if the file is an image; if not, set the error message and exit
  if (!file.type.startsWith("image/")) {
    setErrorMessage("You must only enter in an image");
    setLoading(false);
    return;
  }

    const data = await readImage(file);
    setImgData(data);

    const imageElement = document.createElement("img");
    imageElement.src = data;

    imageElement.onload = async () => {
      const imgSize = {
        width: imageElement.width,
        height: imageElement.height,
      };
      await detectObjectsOnImage(imageElement, imgSize);
      setLoading(false);
    };
  };

  const highestBirdDetection = predictions
    .filter((p) => p.class.toLowerCase() === "bird")
    .sort((a, b) => b.score - a.score)[0];

  // Filter out predictions that round to "0.00%" and only take the top 3 results
  const filteredSortedPredictions = allBirdPredictions
    .sort((a, b) => b.probability - a.probability)
    .filter((pred) => (pred.probability * 100).toFixed(2) !== "0.00")
    .slice(0, 3);

  //  when a user clicks on a prediction result take the user to the bird details page
  // This function fetches all birds from the API and finds the one that matches the predicted class name
  // If a matching bird is found, it navigates to the BirdDetails page using the bird's ID
  const handlePredictionClick = async (predictedClassName) => {
    try {
      // Fetch all birds from the API
      const res = await axios.get("http://localhost:5000/api/birds");
      const birds = res.data.data;
      // Find the bird whose species matches the predicted class name (case-insensitive)
      const matchingBird = birds.find(
        (bird) => bird.species.toLowerCase() === predictedClassName.toLowerCase()
      );
      if (matchingBird) {
        // Navigate to the BirdDetails page using the bird's ID
        navigate(`/birds/${matchingBird._id}`);
      } else {
        alert("No matching bird details found.");
      }
    } catch (error) {
      console.error("Error fetching bird details:", error);
    }
  };
  // Store the prediction in the database
  // This function sends a POST request to the server to store the prediction
  // It includes the class name and image data in the request body
  // The user must be logged in to store predictions
  const storePrediction = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to store predictions");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/predictions", {
        className: birdTypePrediction.className,
        image: imgData // The image data to be stored in the prediction
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Clear the prediction from the page after saving
      setImgData(null);
      setBirdTypePrediction(null);
      alert("Prediction stored successfully!");
    } catch (error) {
      console.error("Error storing prediction:", error);
      alert("Failed to store prediction.");
    }
  };
  return (
    <ObjectDetectorContainer>
      <Title>Bird Identification Page</Title>
      <br />
      {errorMessage && <ErrorAlert>{errorMessage}</ErrorAlert>}

      {/* Display the highest prediction in its own container */}
      {birdTypePrediction && (
  <>
    <BirdPredictionContainer onClick={() => handlePredictionClick(birdTypePrediction.className)}>
      {birdTypePrediction.className}: {(birdTypePrediction.probability * 100).toFixed(2)}%
    </BirdPredictionContainer>
    <SelectButton onClick={storePrediction} style={{ marginTop: "10px" }}>
      Store Prediction
    </SelectButton>
  </>
  )}

      <DetectorLayout>
        {/* Left: Image container */}
        <ImageDetectorContainer>
          {!imgData ? (
            <p style={{ textAlign: "center", color: "#555", fontSize: "1.2rem" }}>
              Please enter an image to get a prediction of your bird.
            </p>
          ) : (
            <>
              <TargetImg src={imgData} ref={imageRef} />
              {highestBirdDetection && (
                <TargetBox
                  x={highestBirdDetection.bbox[0]}
                  y={highestBirdDetection.bbox[1]}
                  width={highestBirdDetection.bbox[2]}
                  height={highestBirdDetection.bbox[3]}
                  classType={highestBirdDetection.class}
                  score={highestBirdDetection.score * 100}
                />
              )}
            </>
          )}
        </ImageDetectorContainer>

        {/* Right: List of top 3 classification predictions */}
        {filteredSortedPredictions.length > 0 && (
          <PredictionsList>
            <h4>Bird Predictions</h4>
            {filteredSortedPredictions.map((item, idx) => (
              <BirdPredictionContainer key={idx} onClick={() => handlePredictionClick(item.className)}>
                {item.className}: {(item.probability * 100).toFixed(2)}%
              </BirdPredictionContainer>
            ))}
          </PredictionsList>
        )}
      </DetectorLayout>

      <HiddenFileInput type="file" ref={fileInputRef} onChange={onSelectImage} />
      <SelectButton onClick={openFilePicker}>
        {isLoading ? "Recognizing..." : "Select Image"}
      </SelectButton>
    </ObjectDetectorContainer>
  );
}




