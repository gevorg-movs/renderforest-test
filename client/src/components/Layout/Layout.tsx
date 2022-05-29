import React from 'react';
import { Container } from '@mui/material';

import Navbar from '../Navbar/Navbar';

const Layout: React.FC = props => {
  const { children } = props;

  return (
    <Container>
      <Navbar />
      {children}
    </Container>
  );
};

export default Layout;
