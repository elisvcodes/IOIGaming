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
import { GrDocumentImage } from 'react-icons/gr';
import DataTable from '../../components/UI/DataTable/index';
import Form from '../../components/UI/Form';
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
  const [catImg, setCatImg] = useState('');
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
          <GrDocumentImage size={30} style={{ marginRight: 'auto' }} />
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

  const inputFields = [
    {
      type: 'text',
      name: 'name',
      label: 'name',
      variant: 'outlined',
      fullWidth: true,
      onChange,
      value: catData.name,
    },
    {
      type: 'text',
      name: 'slug',
      label: 'slug',
      variant: 'outlined',
      fullWidth: true,
      onChange,
      value: catData.slug,
    },
    {
      type: 'text',
      name: 'description',
      label: 'description',
      variant: 'outlined',
      fullWidth: true,
      onChange,
      value: catData.description,
      multiline: true,
      rows: 4,
    },
    {
      name: 'parentId',
      label: 'parentId',
      variant: 'outlined',
      fullWidth: true,
      onChange,
      value: catData.parentId,
      select: flattenCategories(categories),
    },
    {
      type: 'file',
      name: 'categoryImg',
      variant: 'outlined',
      fullWidth: true,
      onChange: imgOnChange,
    },
  ];

  return (
    <>
      <Layout sidebar>
        <h3>Product Categories</h3>
        <Grid container>
          <Grid item xs={12} md={3}>
            <Form onSubmit={onSubmit} fields={inputFields} />
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
