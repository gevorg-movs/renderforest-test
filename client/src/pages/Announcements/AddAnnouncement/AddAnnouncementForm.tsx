import React, { ChangeEvent, FC } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  IAnnouncement,
  INewAnnouncement,
} from '../../../store/features/announcements/announcementsTypes';
import { useGetRegionsQuery } from '../../../store/features/regions/regionApi';
import { useGetCitiesQuery } from '../../../store/features/cities/cityApi';
import { useGetCategoriesQuery } from '../../../store/features/categories/categoryApi';
import { useAddAnnouncementMutation } from '../../../store/features/announcements/announcementApi';
import Image from './Image';
import { useGetTagsQuery } from '../../../store/features/tags/tagApi';
import { ITag } from '../../../store/features/tags/tagsTypes';
import useAlert from '../../../hooks/useAlert';

interface AddAnnouncementFormProps {
  onAnnouncementAdd: (announcement: IAnnouncement) => void;
}

const AddAnnouncementForm: FC<AddAnnouncementFormProps> = ({
  onAnnouncementAdd,
}) => {
  const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.mixed().required(),
    price: yup.mixed().required(),
    categoryId: yup.mixed().required(),
    regionId: yup.mixed().required(),
    cityId: yup.mixed().required(),
    images: yup.array().min(1).required(),
    tags: yup.array().min(1).required(),
  });

  const initialValues = {
    title: '',
    categoryId: '',
    description: '',
    price: '',
    regionId: '',
    cityId: '',
    images: [],
    tags: [],
  };

  const { showError } = useAlert();

  const { data: regions } = useGetRegionsQuery();

  const { data: categories } = useGetCategoriesQuery();
  const { data: tags } = useGetTagsQuery();
  const [addAnnouncement, { isLoading }] = useAddAnnouncementMutation();

  const onSubmit = async (newAnnouncement: INewAnnouncement) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('categoryId', values.categoryId);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('regionId', values.regionId);
    formData.append('cityId', values.cityId);

    values.images.forEach(image => formData.append('images', image));
    values.tags.forEach((tag: ITag) =>
      formData.append('tagIds[]', String(tag.id))
    );

    try {
      addAnnouncement(formData)
        .unwrap()
        .then(announcement => {
          onAnnouncementAdd(announcement);
        })
        .catch(({ data }) => {
          if (data.errors) {
            setErrors(data.errors);
          }
          showError(data.message);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    setErrors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const { data: cities } = useGetCitiesQuery(values.regionId, {
    skip: !values.regionId,
  });

  const handleFileInputChange =
    (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        setFieldValue(field, [...values.images, event.target.files[0]]);
      }

      console.log(values.images);
    };

  const handleImageDelete = (index: number) => {
    const images = values.images.filter((image, i) => i !== index);
    setFieldValue('images', images);
  };

  const handleTagsChange = (tags: ITag[]) => {
    setFieldValue('tags', tags);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={10}>
          <Grid item lg={6}>
            <Stack paddingY={1}>
              <Typography fontWeight="bold">Title</Typography>
              <TextField
                name="title"
                placeholder="Title"
                value={values.title}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={errors.title}
                size="small"
                fullWidth
              />
            </Stack>

            <Stack paddingY={1}>
              <Typography fontWeight="bold">Description</Typography>
              <TextField
                name="description"
                placeholder="Description"
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={errors.description}
                size="small"
                fullWidth
                multiline
                rows={5}
              />
            </Stack>

            <Stack paddingY={1}>
              <Typography fontWeight="bold">Price</Typography>
              <TextField
                name="price"
                placeholder="Price"
                type="number"
                value={values.price}
                onChange={handleChange}
                error={touched.price && Boolean(errors.price)}
                helperText={errors.price}
                size="small"
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item lg={6}>
            <Stack paddingY={1}>
              <Typography fontWeight="bold">Category</Typography>
              <FormControl
                fullWidth
                error={touched.categoryId && Boolean(errors.categoryId)}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={values.categoryId}
                  label="Category"
                  sx={{ width: '100%' }}
                  size="small"
                  name="categoryId"
                  onChange={handleChange}>
                  <MenuItem value="">None</MenuItem>
                  {categories?.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.categoryId}</FormHelperText>
              </FormControl>
            </Stack>

            <Stack paddingY={1}>
              <Typography fontWeight="bold">Region</Typography>
              <FormControl
                fullWidth
                error={touched.regionId && Boolean(errors.regionId)}>
                <InputLabel>Region</InputLabel>
                <Select
                  value={values.regionId}
                  label="Region"
                  sx={{ width: '100%' }}
                  size="small"
                  name="regionId"
                  onChange={handleChange}>
                  <MenuItem value="">None</MenuItem>
                  {regions?.map(region => (
                    <MenuItem key={region.id} value={region.id}>
                      {region.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.regionId}</FormHelperText>
              </FormControl>
            </Stack>

            <Stack paddingY={1}>
              <Typography fontWeight="bold">City</Typography>
              <FormControl
                fullWidth
                error={touched.cityId && Boolean(errors.cityId)}>
                <InputLabel>City</InputLabel>
                <Select
                  value={values.cityId}
                  label="City"
                  sx={{ width: '100%' }}
                  size="small"
                  name="cityId"
                  onChange={handleChange}>
                  <MenuItem value="">None</MenuItem>
                  {cities?.map(city => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.cityId}</FormHelperText>
              </FormControl>
            </Stack>

            <Stack paddingY={1}>
              <Typography fontWeight="bold">Tags</Typography>
              <div>
                <Autocomplete
                  multiple
                  size="small"
                  options={tags || []}
                  value={values.tags}
                  disableCloseOnSelect
                  onChange={(e, value) => handleTagsChange(value)}
                  getOptionLabel={option => option.name}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox style={{ marginRight: 8 }} checked={selected} />
                      {option.name}
                    </li>
                  )}
                  renderInput={params => (
                    <TextField {...params} label="Tags" placeholder="Tags" />
                  )}
                />
                {errors.tags && (
                  <Typography color="indianred">{errors.tags}</Typography>
                )}
              </div>
            </Stack>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems="center"
          sx={{
            border: '2px solid red',
            minHeight: '250px',
            padding: 2,
            marginTop: 3,
          }}>
          {values?.images.map((image: File, index: number) => (
            <Grid item lg={2} key={image.lastModified}>
              <Image index={index} onDelete={handleImageDelete} image={image} />
            </Grid>
          ))}

          <Grid item lg={2}>
            <Stack paddingY={1} marginX={2}>
              <Typography fontWeight="bold">Upload new image</Typography>
              <input
                style={{ display: 'none' }}
                accept="image/*"
                id="upload-new-cover"
                type="file"
                onChange={handleFileInputChange('images')}
              />
              <InputLabel htmlFor="upload-new-cover">
                <UploadFile
                  style={{
                    fontSize: 120,
                  }}
                />
              </InputLabel>
            </Stack>
          </Grid>
        </Grid>
        {errors.images && (
          <Typography color="indianred">{errors.images}</Typography>
        )}

        <Stack marginTop={2}>
          <div>
            <Button variant="contained" type="submit" size="large">
              {isLoading ? 'Loading' : 'Save'}
            </Button>
          </div>
        </Stack>
      </form>
    </Box>
  );
};

export default AddAnnouncementForm;
