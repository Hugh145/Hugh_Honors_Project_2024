// Home.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "animate.css"; // Import animate.css for animations

// Container for the entire page
const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

// Hero Section Styles
const HeadSection = styled.section`
  padding: 4rem 2rem;
`;
// header styles
const Title = styled.h1`
  color: #2e8b57;
  font-weight: bold;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #6c757d;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  margin: 0 0.5rem;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 0.3rem;
  transition: background 0.3s ease;
  &:hover {
    opacity: 0.9;
  }
`;

// Renamed styled components to start with uppercase letters
const OneStyledButton = styled(StyledLink)`
  background-color: #007bff;
  color: white;
`;

const TwoStyledButton = styled(StyledLink)`
  background-color: #28a745;
  color: white;
`;

const ThreeStyledButton = styled(StyledLink)`
  background-color: #ffc107;
  color: white;
`;

const FourStyledButton = styled(StyledLink)`
  background-color: orangered;
  color: white;
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  margin-top: 2rem;
`;

// About Section Styles
const AboutSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f9f9f9;
  text-align: center;
`;

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const AboutDescription = styled.p`
  font-size: 1.125rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  max-width: 600px;
  margin: 0 auto;
`;

const FeatureItem = styled.li`
  background: #fff;
  margin: 0.5rem 0;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  font-size: 1rem;
  color: #444;
`;

const Home = () => {
  return (
    <Container>
      <HeadSection>
        <Title>Welcome to Bird Identification Website home page</Title>
        <AboutSection>
          <Subtitle>Discover the world of birds with our user-friendly website and identification of birds</Subtitle>
          <Subtitle> Click on the buttons below to register, login, view birds, view blogs</Subtitle>
          <ButtonGroup>
            <OneStyledButton to="/register">Register</OneStyledButton>
            <TwoStyledButton to="/login">Login</TwoStyledButton>
            <ThreeStyledButton to="/birds">View Birds</ThreeStyledButton>
            <FourStyledButton to="/view-blogs">View Blogs</FourStyledButton>
          </ButtonGroup>
          <HeroImage
            src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/10/23/pg-18-robin-2-pa.jpg"
            alt="Birds"
            className="animate__animated animate__zoomIn"
          />
        </AboutSection>
      </HeadSection>

      <AboutSection>
        <AboutTitle>About Our Website</AboutTitle>
        <AboutDescription>
          The goal of this website is to provide birdwatching enthusiasts a
          convenient way to identify different types of birds in Scotland. Instead
          of flipping through books, users can simply take a picture of a bird, upload
          it, and receive detailed information about the species along with related data.
        </AboutDescription>
        <AboutTitle>Features</AboutTitle>
        <FeatureList>
          <FeatureItem>Register a new account</FeatureItem>
          <FeatureItem>Interactive bird classification prediction tool</FeatureItem>
          <FeatureItem>Comprehensive bird information and data visualization</FeatureItem>
          <FeatureItem>User profiles and personalized dashboards</FeatureItem>
          <FeatureItem>Blog creation and community engagement</FeatureItem>
          <FeatureItem>Able to store the prediction results of bird identification</FeatureItem>
        </FeatureList>
      </AboutSection>
    </Container>
  );
};

export default Home;




