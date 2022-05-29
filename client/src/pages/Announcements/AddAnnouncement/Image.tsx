import React, { FC } from 'react';
import { Button, Stack } from '@mui/material';

interface ImageProps {
  image: File;
  index: number;
  onDelete: (index: number) => void;
}

const Image: FC<ImageProps> = ({ image, index, onDelete }) => {
  return (
    <Stack margin={2}>
      <img
        style={{
          maxHeight: '150px',
          width: 'auto',
          border: '1px solid red',
        }}
        src={URL.createObjectURL(image)}
        alt={image.name}
      />
      <div>
        <Button
          color="error"
          variant="contained"
          sx={{
            marginY: 1,
          }}
          onClick={() => onDelete(index)}>
          Delete
        </Button>
      </div>
    </Stack>
  );
};

export default Image;
