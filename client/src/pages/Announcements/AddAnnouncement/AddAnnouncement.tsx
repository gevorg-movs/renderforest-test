import React, { FC } from 'react';
import Layout from '../../../components/Layout';
import { Typography } from '@mui/material';
import AddAnnouncementForm from './AddAnnouncementForm';
import { IAnnouncement } from '../../../store/features/announcements/announcementsTypes';
import useAlert from '../../../hooks/useAlert';
import { useNavigate } from 'react-router-dom';

const AddAnnouncement: FC = () => {
  const { showSuccess } = useAlert();
  const navigate = useNavigate();

  const handleAnnouncementAdd = (announcement: IAnnouncement) => {
    showSuccess('Announcement has been successfully added').then(() => {
      navigate(`/announcements/${announcement.id}/show`);
    });
  };

  return (
    <Layout>
      <Typography variant="h3" marginY={5}>
        Add Announcement
      </Typography>

      <AddAnnouncementForm onAnnouncementAdd={handleAnnouncementAdd} />
    </Layout>
  );
};

export default AddAnnouncement;
