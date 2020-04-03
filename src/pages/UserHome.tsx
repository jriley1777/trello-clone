import React from 'react';
import styled from 'styled-components';
import AppHeader from '../components/AppHeader/AppHeader';

const PageWrapper = styled.div.attrs({
  className: "PageWrapper"
})`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgb(250,251,252);
`;

const UserHome: React.FC = () => {
  document.title = "Boards | Taskboard";

  return (
    <PageWrapper>
      <AppHeader />
    </PageWrapper>
  );
};

export default UserHome;