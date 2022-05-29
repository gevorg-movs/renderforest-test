import React, { ChangeEvent, FC, useState } from 'react';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { useGetRegionsQuery } from '../../../store/features/regions/regionApi';
import { useGetCitiesQuery } from '../../../store/features/cities/cityApi';
import { useGetCategoriesQuery } from '../../../store/features/categories/categoryApi';
import { useGetTagsQuery } from '../../../store/features/tags/tagApi';
import { ITag } from '../../../store/features/tags/tagsTypes';

interface IFilterData {
  title: string;
  priceMin: string;
  priceMax: string;
  regionId: string;
  cityId: string;
  categoryId: string;
  tags: ITag[];
}

interface AnnouncementsFilterProps {
  onSubmit: (newFilter: any) => void;
}

const AnnouncementsFilter: FC<AnnouncementsFilterProps> = ({ onSubmit }) => {
  const [filter, setFilter] = useState<IFilterData>({
    title: '',
    priceMin: '',
    priceMax: '',
    regionId: '',
    cityId: '',
    categoryId: '',
    tags: [],
  });

  const { data: regions } = useGetRegionsQuery();
  const { data: cities } = useGetCitiesQuery(filter.regionId, {
    skip: !filter.regionId,
  });
  const { data: categories } = useGetCategoriesQuery();
  const { data: tags } = useGetTagsQuery();

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  const handleTagsChange = (tags: ITag[]) => {
    setFilter({
      ...filter,
      tags,
    });
  };

  const handleSubmit = () => {
    onSubmit(filter);
  };

  return (
    <Stack alignItems="center">
      <Grid container direction="row" spacing={3}>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filter.categoryId}
              label="Category"
              sx={{ width: '200px' }}
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
          </FormControl>
        </Grid>

        <Grid item>
          <TextField
            name="title"
            value={filter.title}
            onChange={handleChange}
            placeholder="Title"
            size="small"
          />
        </Grid>

        <Grid item>
          <TextField
            name="priceMin"
            value={filter.priceMin}
            onChange={handleChange}
            placeholder="Min Price"
            size="small"
          />
        </Grid>

        <Grid item>
          <TextField
            name="priceMax"
            value={filter.priceMax}
            onChange={handleChange}
            placeholder="Max Price"
            size="small"
          />
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <InputLabel>Region</InputLabel>
            <Select
              value={filter.regionId}
              label="Region"
              sx={{ width: '200px' }}
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
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <InputLabel>City</InputLabel>
            <Select
              value={filter.cityId}
              label="City"
              sx={{ width: '200px' }}
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
          </FormControl>
        </Grid>

        <Grid item>
          <Autocomplete
            sx={{ width: '200px' }}
            multiple
            options={tags || []}
            value={filter.tags}
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
            size="small"
          />
        </Grid>

        <Grid item>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Search
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AnnouncementsFilter;
