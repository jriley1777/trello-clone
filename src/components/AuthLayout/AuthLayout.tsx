import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DnsIcon from "@material-ui/icons/Dns";

import Placeholder from "../Placeholder/Placeholder";
import Footer from '../Footer/Footer';
import * as Constants from "../../constants/index";

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

const AppTitle = styled(RouterLink).attrs({
  className: "appTitle"
})`
  text-decoration: none;
  margin-bottom: 2rem;
  padding: 20px;
  color: rgb(0, 135, 210);
  font-size: 2rem;
  font-family: Pacifico;
`;

const AuthLayout: React.FC = ({ children }) => {
    return (
      <PageWrapper>
        <AppTitle to={Constants.URLS.INDEX}>
          <DnsIcon
            style={{
              transform: "rotate(90deg)",
              width: "auto",
              height: "2rem",
              paddingLeft: "5px"
            }}
          />
          {Constants.APP_NAME}
        </AppTitle>
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