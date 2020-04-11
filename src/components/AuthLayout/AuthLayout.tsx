import React from 'react';
import styled from 'styled-components';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppTitle from '../AppTitle/AppTitle';
import Placeholder from "../Placeholder/Placeholder";
import Footer from '../Footer/Footer';

const PageWrapper = styled(Container).attrs({
  className: "page"
})`
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background: rgb(250, 250, 250);
  padding: 2rem 0 2rem 0;
  font-size: 1rem;
`;

const AuthLayout: React.FC = ({ children }) => {
    return (
      <PageWrapper>
        <Grid container direction="row" justify="center">
          <Grid item>
            <AppTitle style={{ fontSize: '2rem' }} />
          </Grid>
        </Grid>
        <Grid
          style={{ marginTop: "2rem" }}
          container
          direction="row"
          justify="center"
          alignItems="flex-end"
          spacing={3}
          wrap="nowrap"
        >
          <Grid item md={4}>
            <Placeholder height="40vh" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            {children}
          </Grid>
          <Grid item md={4}>
            <Placeholder height="40vh" />
          </Grid>
        </Grid>
        <Footer light={false} />
      </PageWrapper>
    );
};

export default AuthLayout;