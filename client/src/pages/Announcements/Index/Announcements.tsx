import React, { FC } from 'react';
import Layout from '../../../components/Layout';
import { Typography } from '@mui/material';
import AnnouncementsList from './AnnouncementsList';

const Announcements: FC = () => {
  return (
    <Layout>
      <Typography variant="h3" marginY={5}>
        Announcements
      </Typography>

      <AnnouncementsList />
    </Layout>
  );
};

export default Announcements;
