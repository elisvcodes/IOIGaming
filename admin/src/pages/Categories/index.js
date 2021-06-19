import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles,
  Button,
  Avatar,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useState } from 'react';
import Layout from '../../components/Layout/index';
import Inputs from '../../components/UI/inputs/index';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '../../_actions/category';
import { GrDocumentMissing } from 'react-icons/gr';
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

export default function Categories() {
  const classes = useStyles();

  const [catData, setCatData] = useState({
    _id: '',
    name: '',
    description: '',
    parentId: '',
    slug: '',
  });

  const [requestUpdate, setRequestUpdate] = useState(false);
  console.log(requestUpdate);
  const [catImg, setCatImg] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const onChange = (e) => {
    const { name, value } = e.target;
    setCatData({ ...catData, [name]: value });
  };

  const imgOnChange = (e) => {
    setCatImg(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('_id', catData._id);
    form.append('name', catData.name);
    form.append('description', catData.description);
    form.append('slug', catData.slug);
    form.append('parentId', catData.parentId);
    form.append('categoryImg', catImg);

    if (requestUpdate) {
      dispatch(updateCategory(form));
      setRequestUpdate(false);
    } else {
      dispatch(createCategory(form));
    }

    setCatData({ _id: '', name: '', description: '', parentId: '', slug: '' });
    setCatImg('');
  };

  const flattenCategories = (categories, options = []) => {
    for (const cat of categories) {
      options.push({
        name: cat.name,
        value: cat._id,
      });
      if (cat.children) {
        flattenCategories(cat.children, options);
      }
    }
    return options;
  };

  const rows = (categories, options = []) => {
    for (const cat of categories) {
      options.push({
        id: cat._id,
        image: `${cat.categoryImg}`,
        name: cat.name,
        description: cat.description,
        slug: cat.slug,
        edit: 'Edit',
        delete: 'Delete',
      });
      if (cat.children) {
        rows(cat.children, options);
      }
    }
    return options;
  };

  const updatedRows = rows(categories);

  const initUpdate = (rows, id) => {
    const result = rows.find((item) => item.id === id);
    setCatData({
      _id: result.id,
      name: result.name,
      description: result.description,
      parentId: result.id,
      slug: result.slug,
    });
  };
  const columns = [
    {
      field: 'image',
      headerName: 'IMAGE',
      width: 125,
      renderCell: (params) => {
        return params.value === 'undefined' ? (
          <GrDocumentMissing size={30} style={{ marginRight: 'auto' }} />
        ) : (
          <Avatar
            src={` http://localhost:7000/public/media/categories/${params.value}`}
            variant="square"
            style={{ height: '50px', width: '50px', marginRight: 'auto' }}
          />
        );
      },
    },
    {
      field: 'name',
      headerName: 'NAME',
      width: 150,
    },
    {
      field: 'description',
      headerName: 'DESCRIPTION',
      width: 200,
    },
    {
      field: 'slug',
      headerName: 'SLUG',
      width: 125,
    },
    {
      field: 'edit',
      headerName: 'EDIT',
      width: 125,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              return setRequestUpdate(true), initUpdate(updatedRows, params.id);
            }}
          >
            {params.value}
          </Button>
        );
      },
    },
    {
      field: 'delete',
      headerName: 'DELETE',
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(deleteCategory(params.id))}
          >
            {params.value}
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Layout sidebar>
        <h3>Product Categories</h3>
        <Grid container>
          <Grid item xs={12} md={3}>
            <form onSubmit={onChange} onSubmit={onSubmit}>
              <Inputs
                type="text"
                name="name"
                label="name"
                variant="outlined"
                fullWidth
                onChange={onChange}
                value={catData.name}
              />

              <Inputs
                type="text"
                name="slug"
                label="slug"
                variant="outlined"
                fullWidth
                onChange={onChange}
                value={catData.slug}
              />

              <Inputs
                type="text"
                name="description"
                label="description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                onChange={onChange}
                value={catData.description}
              />
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
                style={{ margin: '10px 0' }}
              >
                <InputLabel id="parentId">Select ParentId</InputLabel>

                <Select
                  labelId="parentId"
                  // label="parentId"
                  id="parentId"
                  labelWidth={120}
                  value={catData.parentId}
                  name="parentId"
                  onChange={onChange}
                  value={catData.parentId}
                >
                  <MenuItem value="">Select</MenuItem>

                  {flattenCategories(categories).map((item) => {
                    return (
                      <MenuItem value={item.value} key={item.value}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <InputLabel>Catgeory Image</InputLabel>
              <Inputs
                type="file"
                name="categoryImg"
                variant="outlined"
                fullWidth
                onChange={imgOnChange}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            style={{ marginLeft: '30px', marginTop: '10px' }}
          >
            <DataGrid
              rows={updatedRows}
              columns={columns}
              pagination
              pageSize={7}
            />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}
