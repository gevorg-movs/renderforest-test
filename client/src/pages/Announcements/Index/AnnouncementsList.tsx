import React, { useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useGetAnnouncementsQuery } from '../../../store/features/announcements/announcementApi';
import AnnouncementsFilter from './AnnouncementsFilter';
import Announcement from '../../../components/Announcement';

const AnnouncementsList = () => {
  const [filter, setFilter] = useState({});

  const { data, isLoading, isFetching } = useGetAnnouncementsQuery({
    ...filter,
  });

  const handleFilterChange = (newFilter: any) => {
    setFilter({ ...newFilter });
  };

  return (
    <>
      <AnnouncementsFilter onSubmit={handleFilterChange} />

      {(isLoading || isFetching) && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}

      {!data?.length && (
        <Typography variant="h3" textAlign="center" marginY={3}>
          There are no announcements
        </Typography>
      )}

      <Grid container>
        {!isFetching &&
          data?.map(announcement => (
            <Grid item xs={4} key={announcement.id} marginTop={5}>
              <Announcement announcement={announcement} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default AnnouncementsList;
