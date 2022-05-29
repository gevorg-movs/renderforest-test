import React, { FC } from 'react';
import Layout from '../../../components/Layout';
import { Typography } from '@mui/material';
import AnnouncementsList from './MyAnnouncementsList';

const MyAnnouncements: FC = () => {
  return (
    <Layout>
      <Typography variant="h3" marginY={5}>
        My Announcements
      </Typography>

      <AnnouncementsList />
    </Layout>
  );
};

export default MyAnnouncements;
