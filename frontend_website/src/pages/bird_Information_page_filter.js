import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

// Styled Components
const Container = styled.div`
  margin: 2rem auto;
  padding: 1rem;
  max-width: 1200px;
`;

const Title = styled.h1`
  color: #2e8b57;
  font-weight: bold;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const SearchBarContainer = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 4px 0 0 4px;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 2px solid #007bff;
  background-color: #007bff;
  color: #fff;
  border-radius: 0 4px 4px 0;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

const FilterButton = styled.button`
  margin: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #333;
  background-color: ${({ active }) => (active ? "#333" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? "#333" : "#f0f0f0")};
  }
`;

const ToggleButton = styled.button`
  margin: 1rem 0.5rem 1rem 0;
  padding: 0.5rem 1rem;
  border: 2px solid #6c757d;
  background-color: #6c757d;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 1rem;
  text-align: center;
`;

const MarkIcon = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
  color: ${({ marked }) => (marked ? "#FFD700" : "#ccc")};
  margin-bottom: 0.5rem;
  display: inline-block;

  &:hover {
    color: #FFD700;
  }
`;

const Birds = () => {
  const [birds, setBirds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBirds, setFilteredBirds] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [markedBirds, setMarkedBirds] = useState([]); // stores marked bird IDs
  const [showMarked, setShowMarked] = useState(false); // toggles view mode

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/birds")
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
    let filtered = birds.filter(
      (bird) =>
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

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLetter("");
    setFilteredBirds(birds);
  };

  // Toggle the marked status for a bird
  const toggleMark = (birdId) => {
    if (markedBirds.includes(birdId)) {
      setMarkedBirds(markedBirds.filter((id) => id !== birdId));
    } else {
      setMarkedBirds([...markedBirds, birdId]);
    }
  };

  // Toggle between showing marked birds and all birds
  const toggleShowMarked = () => {
    setShowMarked(!showMarked);
  };

  // Decide which birds to display based on the toggle state
  const displayedBirds = showMarked
    ? filteredBirds.filter((bird) => markedBirds.includes(bird._id))
    : filteredBirds;

  return (
    <Container>
      <Title>Find a Bird</Title>

      {/* Search Bar */}
      <SearchBarContainer>
        <SearchInput
          type="text"
          placeholder="Search by species or scientific name..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <SearchButton>
          <i className="fas fa-search"></i> Search
        </SearchButton>
      </SearchBarContainer>

      {/* A-Z Filter */}
      <FilterContainer>
        {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
          <FilterButton
            key={letter}
            active={selectedLetter === letter}
            onClick={() => handleLetterFilter(letter)}
          >
            {letter}
          </FilterButton>
        ))}
      </FilterContainer>

      {/* Toggle Marked / All Birds Buttons */}
      <ToggleButton onClick={toggleShowMarked}>
        {showMarked ? "Show All Birds" : "Show Marked Birds"}
      </ToggleButton>
      <ToggleButton onClick={resetFilters}>Reset Filters</ToggleButton>

      {/* Results Count */}
      <p>Showing {displayedBirds.length} results</p>

      {/* Bird List */}
      <CardGrid>
        {displayedBirds.map((bird) => (
          <Link
            key={bird._id}
            to={`/birds/${bird._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card>
              <CardImage
                src={bird.imageUrl || "https://via.placeholder.com/300"}
                alt={bird.species}
              />
              <CardBody>
                <h5>{bird.species}  </h5>
                <p>
                  <i>{bird.scientificName || "Unknown"}</i>
                </p>
                <MarkIcon
                  marked={markedBirds.includes(bird._id)}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation when clicking mark
                    toggleMark(bird._id);
                  }}
                >
                {markedBirds.includes(bird._id) ? "★" : "☆"}
                </MarkIcon>
              </CardBody>
            </Card>
          </Link>
        ))}
      </CardGrid>
    </Container>
  );
};

export default Birds;




