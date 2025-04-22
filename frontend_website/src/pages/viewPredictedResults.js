import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Outer container with a nature-inspired gradient background
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background color : #f9f9f9;
  min-height: 100vh;
`;

// Styled title with natural green and subtle shadow
const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #2e8b57;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

// Grid container for prediction cards
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

// Styled prediction card with earthy borders and hover effect
const Card = styled.div`
  border: 1px solid #a5d6a7;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0,0,0,0.15);
  }
`;

// Image styling remains the same
const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
`;

// Card text with natural green color
const CardText = styled.p`
  margin: 10px 0;
  font-weight: bold;
  color: #2e8b57;
`;

// Delete button (remains red to indicate a destructive action)
const DeleteButton = styled.button`
  background-color: #d9534f;
  color: #fff;
  border: none;
  padding: 7px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c9302c;
  }
`;

// Main component to view predicted results
// It fetches predictions from the server and displays them in a grid format
// Users can delete their predictions using the delete button
// The component uses axios for API calls and styled-components for styling
// The component also handles loading and error states
// and displays appropriate messages to the user
const ViewPredictedResults = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch predictions from the server
  // It sends a GET request to the server to retrieve the predictions
  // If the request is successful, the predictions are stored in the state
  // If there's an error, an error message is set in the state
  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/predictions", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPredictions(res.data.predictions);
    } catch (err) {
      setError("Failed to fetch predictions.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  // Handle delete action
  // It sends a DELETE request to the server to remove the prediction
  // If the request is successful, the prediction is removed from the state
  // If there's an error, an alert is shown to the user
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/predictions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPredictions(predictions.filter(pred => pred._id !== id));
    } catch (error) {
      alert("Error deleting prediction.");
    }
  };

  return (
    <PageContainer>
      <Title>Welcome to the Stored Predictions Page</Title>
      <p style={{ textAlign: 'center', color: '#555' }}>
        Here you can view and delete your stored predictions.
      </p>
      {loading && <p>Loading predictions...</p>}
      {error && <p>{error}</p>}
      {!loading && predictions.length === 0 && <p>No predictions stored.</p>}

      <GridContainer>
        {predictions.map(pred => (
          <Card key={pred._id}>
            <CardImage src={pred.image} alt={pred.className} />
            <CardText>Prediction: {pred.className}</CardText>
            <DeleteButton onClick={() => handleDelete(pred._id)}>
              Delete
            </DeleteButton>
          </Card>
        ))}
      </GridContainer>
    </PageContainer>
  );
};

export default ViewPredictedResults;


