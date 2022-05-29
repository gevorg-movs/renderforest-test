import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IAnnouncement } from '../../store/features/announcements/announcementsTypes';
import { Link } from 'react-router-dom';

interface AnnouncementProps {
  announcement?: IAnnouncement;
}

const AnnouncementItem: FC<AnnouncementProps> = ({ announcement }) => {
  if (!announcement) {
    return null;
  }

  return (
    <Card sx={{ maxWidth: 300, marginY: 2, border: '2px solid', padding: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={`${process.env.REACT_APP_API_BASE_URL}/${announcement?.images[0]?.src}`}
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {announcement.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {announcement.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          to={`/announcements/${announcement.id}/show`}
          style={{ textDecoration: 'none' }}>
          <Button variant="contained" size="small">
            Show
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default AnnouncementItem;
