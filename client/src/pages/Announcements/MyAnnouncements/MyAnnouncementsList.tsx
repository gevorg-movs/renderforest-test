import React from 'react';
import { Grid, Typography } from '@mui/material';
import Announcement from '../../../components/Announcement';
import { useGetUserAnnouncementsQuery } from '../../../store/features/users/userApi';

const MyAnnouncements = () => {
  const { data, isLoading } = useGetUserAnnouncementsQuery();

  return (
    <>
      {(isLoading || !data?.length) && (
        <Typography variant="h3" textAlign="center" marginY={3}>
          There are no announcements
        </Typography>
      )}

      <Grid container>
        {data?.map(announcement => (
          <Grid item xs={4} key={announcement.id} marginTop={5}>
            <Announcement announcement={announcement} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MyAnnouncements;
