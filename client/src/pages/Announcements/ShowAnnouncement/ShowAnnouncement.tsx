import React, { FC } from 'react';
import Layout from '../../../components/Layout';
import { Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import {
  useDeleteAnnouncementMutation,
  useGetAnnouncementQuery,
} from '../../../store/features/announcements/announcementApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAlert from '../../../hooks/useAlert';
import { useTypedSelector } from '../../../store';

const ShowAnnouncement: FC = () => {
  const { showWarning, showSuccess } = useAlert();
  const navigate = useNavigate();
  const { announcementId } = useParams();

  const { user } = useTypedSelector(state => state.auth);

  const { data, isLoading } = useGetAnnouncementQuery(
    announcementId as string,
    {
      refetchOnFocus: true,
    }
  );
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();

  const handleDelete = async () => {
    const { isConfirmed } = await showWarning('Are you sure?');

    if (!isConfirmed) {
      return;
    }

    deleteAnnouncement(announcementId as string)
      .unwrap()
      .then(() => showSuccess('Announcement has been deleted successfully'))
      .then(() => {
        navigate('/announcements');
      });
  };

  return (
    <Layout>
      {isLoading && (
        <Typography variant="h6" marginY={5}>
          Loading
        </Typography>
      )}

      {!data?.announcement ? (
        <Typography variant="h6" marginY={5}>
          Announcement not found
        </Typography>
      ) : (
        <>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Typography variant="h2" marginTop={8}>
              {data?.announcement.title}
            </Typography>

            {user.id === data?.announcement.userId && (
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <Link to={`/announcements/${data?.announcement.id}/edit`}>
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                </Link>

                <Button
                  onClick={handleDelete}
                  sx={{ marginLeft: 2 }}
                  variant="contained"
                  color="error">
                  Delete
                </Button>
              </Stack>
            )}
          </Stack>
          <Divider />
          <Typography variant="h6" marginTop={3}>
            ID: <b>{data?.announcement.id}</b>
          </Typography>
          <Typography variant="h6">
            Description: <b>{data?.announcement.description}</b>
          </Typography>
          <Typography variant="h6">
            Price: <b>{data?.announcement?.price}</b>
          </Typography>
          <Typography variant="h6">
            Category: <b>{data?.category.name}</b>
          </Typography>
          <Typography variant="h6">
            Region: <b>{data?.region.name}</b>
          </Typography>
          <Typography variant="h6">
            City: <b>{data?.city.name}</b>
          </Typography>
          <Stack flexDirection="row">
            <Typography variant="h6"> Tags:</Typography>
            {data?.announcement?.tags.map(tag => (
              <Chip
                key={tag.id}
                sx={{ marginX: 1 }}
                variant="filled"
                label={tag.name}
              />
            ))}
          </Stack>
          <Typography marginTop={2} variant="h6">
            Images:
          </Typography>

          <Grid container spacing={1}>
            {data?.announcement.images.map(image => (
              <Grid item lg={4} key={image.id}>
                <img
                  style={{
                    height: '300px',
                    border: '1px solid',
                  }}
                  src={`${process.env.REACT_APP_API_BASE_URL}/${image.src}`}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Layout>
  );
};

export default ShowAnnouncement;
