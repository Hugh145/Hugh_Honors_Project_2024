import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Birds = () => {
  const [birds, setBirds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBirds, setFilteredBirds] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/birds")
      .then((res) => {
        setBirds(res.data.data);
        setFilteredBirds(res.data.data);
      })
      .catch((err) => console.error("Error fetching birds:", err));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterBirds(term, selectedLetter);
  };

  const filterBirds = (term, letter) => {
    let filtered = birds.filter((bird) =>
      bird.species.toLowerCase().includes(term) ||
      (bird.scientificName && bird.scientificName.toLowerCase().includes(term))
    );
    if (letter) {
      filtered = filtered.filter((bird) => bird.species.startsWith(letter));
    }
    setFilteredBirds(filtered);
  };

  const handleLetterFilter = (letter) => {
    setSelectedLetter(letter);
    filterBirds(searchTerm, letter);
  };

  // Reset filters and show all birds
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLetter("");
    setFilteredBirds(birds);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-dark fw-bold">Find a Bird</h1>

      {/* Search Bar */}
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by species or scientific name..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="btn btn-primary">
          <i className="fas fa-search"></i> Search
        </button>
      </div>

      {/* A-Z Filter */}
      <div className="d-flex flex-wrap my-3">
        {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
          <button
            key={letter}
            className={`btn btn-outline-dark m-1 ${selectedLetter === letter ? "active" : ""}`}
            onClick={() => handleLetterFilter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Show All Birds Button */}
      <div className="my-3">
        <button className="btn btn-secondary" onClick={resetFilters}>
          Show All Birds
        </button>
      </div>

      {/* Bird List */}
      <p className="mt-3">Showing {filteredBirds.length} results</p>
      <div className="row">
        {filteredBirds.map((bird) => (
          <div key={bird._id} className="col-md-4 mb-4">
            <Link to={`/birds/${bird._id}`} className="text-decoration-none text-dark">
              <div className="card shadow-sm h-100">
                <img
                  src={bird.imageUrl || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={bird.species}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{bird.species}</h5>
                  <p className="card-text"><i>{bird.scientificName || "Unknown"}</i></p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Birds;




