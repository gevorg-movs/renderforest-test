import React, { FC } from 'react';
import { Button, Stack } from '@mui/material';
import { IImage } from '../../../store/features/images/imagesTypes';

interface ImageProps {
  image: IImage;
  onDelete: (image: IImage) => void;
}

const Image: FC<ImageProps> = ({ image, onDelete }) => {
  return (
    <Stack margin={2}>
      <img
        style={{
          maxHeight: '150px',
          width: 'auto',
          border: '1px solid red',
        }}
        src={`${process.env.REACT_APP_API_BASE_URL}/${image.src}`}
      />
      <div>
        <Button
          color="error"
          sx={{
            marginY: 1,
          }}
          variant="contained"
          onClick={() => onDelete(image)}>
          Delete
        </Button>
      </div>
    </Stack>
  );
};

export default Image;
