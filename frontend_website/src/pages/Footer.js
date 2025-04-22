import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 30px 0;
  margin-top: 40px;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 15px;
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 10px;
`;

const FooterTitle = styled.h4`
  margin-bottom: 15px;
`;

const FooterLink = styled.a`
  display: block;
  color: #ddd;
  text-decoration: none;
  margin: 5px 0;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>
        {/* Column 1 */}
        <FooterColumn>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/login">login</FooterLink>
          <FooterLink href="/register">Register</FooterLink>
          <FooterLink href="/birds">Birds information</FooterLink>
        </FooterColumn>

        {/* Column 2 */}
        <FooterColumn>
          <FooterTitle>More Information for birds</FooterTitle>
          <FooterLink href="https://www.birds.cornell.edu/home/">Cornell Lab of Ornithology</FooterLink>
          <FooterLink href="https://www.rspb.org.uk/"> RSPB website</FooterLink>
          <FooterLink href="https://www.tensorflow.org/">TensorFlow</FooterLink>

        </FooterColumn>

        {/* Column 3 */}
        <FooterColumn>
          <FooterTitle>Where we work</FooterTitle>
          <FooterLink href="https://www.gcu.ac.uk/"> Glasgow Caledonian University </FooterLink>
        </FooterColumn>

        {/* Column 4 */}
        <FooterColumn>
          <FooterTitle> data source </FooterTitle>

            <FooterLink href="https://www.kaggle.com/datasets/davemahony/20-uk-garden-birds">Kaggle dataset</FooterLink>
            <FooterLink href="/">Bird Watchers 🐦</FooterLink>
        </FooterColumn>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;
