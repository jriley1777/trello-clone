import React, { useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Header from '../components/Header/Header';
import Placeholder from '../components/Placeholder/Placeholder';
import Footer from '../components/Footer/Footer';

import * as Constants from '../constants/index';

const PageWrapper = styled(Container).attrs({
  className: "page"
})`
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(
    to bottom right,
    rgb(0, 120, 190),
    rgb(80, 105, 195)
  );
`;

const Hero = styled.section.attrs({
  className: "hero"
})`
  padding: 10rem 0 0 0;
  color: white;
  font-size: 1.75rem;
  font-family: Open Sans;
  text-align: left;
  max-width: 100%;
  height: 100%
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 9rem 5rem 2rem 5rem;
    line-height: 1.75;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > * {
      width: 48%;
    }
  }
`;


const StyledEmailForm = styled.form`
  width: 100%;
  padding: 0; 
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 60%;
    padding-left: 5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const StyledSubmitButton = styled(Button)`
  height: 100%;
  margin-top: 15px !important;
  background: #61bd4f !important;
  &:hover {
    background: #61bd4f;
  }

  @media (min-width: 768px) {
    margin-top: 0 !important;
    margin-left: 10px !important;
  }
`;

const StyledTextField = styled(TextField)`
  background: #fff;
  width: 100%;

  @media (min-width: 768px) {
    width: 40%;
  }
`;


const Splash: React.FC<RouteComponentProps> = ({ history }) => {
  const appName: string = Constants.APP_NAME;
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      let uriEmail = `email=${encodeURI(email)}`;
      let url = `${Constants.URLS.SIGNUP}?${uriEmail}`;
      history.push(url);
      console.log(email);
    }
  };
  return (
    <PageWrapper maxWidth="xl">
      <Header />
      <Container maxWidth="xl" style={{ paddingBottom: "2rem" }}>
        <Hero>
          <div>
            <h1 style={{ margin: 0 }}>
              <strong>
                {appName} is a simple collaborative tool with flexibility for
                all.
              </strong>
            </h1>
            <h5>
              Individually or as a team, projects large or small, {appName} will
              help you stay organized from inception to completion.
            </h5>
          </div>
          <Placeholder />
        </Hero>
        <StyledEmailForm onSubmit={handleEmailSubmit}>
          <StyledTextField
            id="email-basic"
            label="Email"
            name="email"
            onChange={e => setEmail(e.target.value)}
            variant="filled"
          />
          <StyledSubmitButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Sign up! - It's free
          </StyledSubmitButton>
        </StyledEmailForm>
      </Container>
      <Footer light />
    </PageWrapper>
  );
};

export default Splash;