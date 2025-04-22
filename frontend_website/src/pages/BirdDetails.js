import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Styled Components for the page
const PageContainer = styled.div`
  background-image: url("https://source.unsplash.com/1600x900/?forest,trees,birds");
  padding: 4rem 2rem;
  background-color: #f9f9f9;
  text-align: center;
  background-position: center;
  min-height: 100vh;
  padding: 40px;
  broder-radius: 30px;
`;

const Title = styled.h1`
  color: #2e8b57; 
  font-weight: bold;
`;

const Title3 = styled.h3`
  color: #2e8b57; 
  font-weight: bold;
`;

const StyledTable = styled.table`
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  overflow: hidden;
`;

const StyledTh = styled.th`
  background: #4caf50;
  color: white;
  padding: 10px;
`;

const StyledTd = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

// BirdDetails component to display bird information
// It fetches bird data from the server using the bird ID from the URL parameters
const BirdDetails = () => {
  const { id } = useParams();
  const [bird, setBird] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/birds/${id}`)
      .then((res) => setBird(res.data.data))
      .catch((err) => console.error("Error fetching bird details:", err));
  }, [id]);

  if (!bird) {
    return <PageContainer><h2>Loading bird information...</h2></PageContainer>;
  }

  return (
    <PageContainer>
        <Title>Bird Details - {bird.species}</Title>
        <br />
        <div className="row">
          <div className="col-md-6">
            <img 
              src={bird.imageUrl || "https://via.placeholder.com/500"} 
              alt={bird.species} 
              className="img-thumbnail w-100"
            />
          </div>
          <div className="col-md-6">
            <Title>Common Name: {bird.species}</Title>
            <h4 className="text-muted"><i>Scientific Name: {bird.scientificName || "Unknown"}</i></h4>
            <a href="/birds" className="btn btn-success">Back to Birds List</a>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-4">
          <Title3> How to identify the {bird.species} </Title3>
          <p>{bird.identification || "No description available."}</p>
        </div>

        {/* Key Facts Section */}
        <div className="mt-4">
          <Title3> Key Facts </Title3>
          <StyledTable className="table">
            <tbody>
              <tr>
                <StyledTh>Beak</StyledTh>
                <StyledTd>{bird.beakColor?.join(", ") || "N/A"}</StyledTd>
              </tr>
              <tr>
                <StyledTh>Conservation Status</StyledTh>
                <StyledTd>{bird.conservationStatus || "Not assessed"}</StyledTd>
              </tr>
              <tr>
                <StyledTh>Diet</StyledTh>
                <StyledTd>{bird.diet || "Unknown"}</StyledTd>
              </tr>
              <tr>
                <StyledTh>Feather</StyledTh>
                <StyledTd>{bird.featherColors?.join(", ") || "Unknown"}</StyledTd>
              </tr>
              <tr>
                <StyledTh>Leg</StyledTh>
                <StyledTd>{bird.legColor || "Unknown"}</StyledTd>
              </tr>
              <tr>
                <StyledTh>Length</StyledTh>
                <StyledTd>{bird.length || "Unknown"}</StyledTd>
              </tr>
              <tr>
                <StyledTh>Habitats</StyledTh>
                <StyledTd>{bird.habitats?.join(", ") || "Unknown"}</StyledTd>
              </tr>
              <tr>
                <StyledTh>UK Breeding Birds</StyledTh>
                <StyledTd>{bird.ukBreedingBirds || "Unknown"}</StyledTd>
              </tr>
              <tr>
                <StyledTh>Weight</StyledTh>
                <StyledTd>{bird.weight || "Unknown"}</StyledTd>
              </tr>
              <tr>
                <StyledTh>Wingspan</StyledTh>
                <StyledTd>{bird.wingspan || "Unknown"}</StyledTd>
              </tr>
            </tbody>
          </StyledTable>
        </div>
    </PageContainer>
  );
};

export default BirdDetails;

