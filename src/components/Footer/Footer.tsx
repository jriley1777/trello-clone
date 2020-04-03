import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const StyledFooter = styled(Grid)`
  padding: 3rem 1rem 1rem 1rem;
`;

const Links = [
    'Pricing','Apps','Jobs','Blog','Developers','About','Help','Legal','Cookie','Settings','Privacy'
]

const Footer: React.FC<{light: boolean}> = ({ light }) => {
    return (
      <StyledFooter
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        {Links.map(link => {
        return (
          <Grid item key={link}>
            <Link
              href="#"
              color="textPrimary"
              style={{ color: light ? "white" : 'rgb(94, 108, 131)' }}
            >
              {link}
            </Link>
          </Grid>
        );
        })}
      </StyledFooter>
    );
};

export default Footer;