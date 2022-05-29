import React, { FC } from 'react';
import Layout from '../../../components/Layout';
import { Typography } from '@mui/material';
import EditAnnouncementForm from './EditAnnouncementForm';
import { IAnnouncement } from '../../../store/features/announcements/announcementsTypes';
import useAlert from '../../../hooks/useAlert';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAnnouncementQuery } from '../../../store/features/announcements/announcementApi';
import { useTypedSelector } from '../../../store';

const EditAnnouncement: FC = () => {
  const { showSuccess } = useAlert();
  const navigate = useNavigate();
  const { announcementId } = useParams();
  const { user } = useTypedSelector(state => state.auth);

  const { data, refetch } = useGetAnnouncementQuery(announcementId as string);

  const handleAnnouncementEdit = (announcement: IAnnouncement) => {
    showSuccess('Announcement has been successfully updated').then(() => {
      navigate(`/announcements/${announcement.id}/show`);
    });
  };

  return (
    <Layout>
      <Typography variant="h3" marginY={5}>
        Edit Announcement
      </Typography>

      {user.id === data?.announcement.userId ? (
        <>
          {data?.announcement && (
            <EditAnnouncementForm
              announcement={data?.announcement}
              onImageDelete={refetch}
              onImageUpload={refetch}
              onAnnouncementEdit={handleAnnouncementEdit}
            />
          )}
        </>
      ) : (
        <Typography>You dont have permission</Typography>
      )}
    </Layout>
  );
};

export default EditAnnouncement;
