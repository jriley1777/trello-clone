import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DnsIcon from '@material-ui/icons/Dns';
import * as Constants from '../../constants/index';

const StyledAppTitle = styled(Link)<{light: number}>`
  text-decoration: none;
  margin: 0;
  color: ${props => props.light ? 'rgba(255, 255, 255, 0.9)' : 'rgb(0, 135, 210, 0.9)' };
  font-size: 1.25rem;
  font-family: Pacifico;
  &:hover {
    color: ${props => props.light ? 'rgba(255, 255, 255, 1)' : 'rgb(0, 135, 210, 1)' };
  }
  & > svg {
    transform: rotate(90deg);
    width: auto;
    padding-left: 5px;
    font-size: inherit;
  }
`;

interface AppTitleProps {
    light?: boolean,
    to?: string,
    style?: React.CSSProperties
}

const AppTitle: React.FC<AppTitleProps> = ({ to, light, style }) => {
    const appName = Constants.APP_NAME;
    const link = to || Constants.URLS.INDEX;
    return (
      <StyledAppTitle to={link} light={light ? 1 : 0} style={style}>
        <DnsIcon />
        {appName}
      </StyledAppTitle>
    );
};

export default AppTitle;