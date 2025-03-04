import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BirdDetails = () => {
  const { id } = useParams();
  const [bird, setBird] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/birds/${id}`)
      .then((res) => setBird(res.data.data))
      .catch((err) => console.error("Error fetching bird details:", err));
  }, [id]);

  if (!bird) {
    return <div className="container mt-5 text-center"><h2>Loading bird information...</h2></div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={bird.imageUrl || "https://via.placeholder.com/500"} alt={bird.species} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h1 className="fw-bold">{bird.species}</h1>
          <h4 className="text-muted"><i>{bird.scientificName || "Unknown Scientific Name"}</i></h4>
          <p className="mt-3">{bird.description}</p>
          <h5 className="fw-bold mt-4">Observations:</h5>
          <ul className="list-group">
            {bird.logs.map((log, index) => (
              <li key={index} className="list-group-item">{log}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BirdDetails;
