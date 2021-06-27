import React, { useState } from 'react';

import { Grid, Modal, makeStyles, Avatar, Button } from '@material-ui/core';
import Layout from '../../components/Layout/index';
import Form from '../../components/UI/Form';
import { useSelector, useDispatch } from 'react-redux';
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../_actions/product';
import { DataGrid } from '@material-ui/data-grid';
import { GrDocumentImage } from 'react-icons/gr';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  actions: {
    '& a': {
      margin: '0 10px',
    },
  },
}));

export default function Products() {
  const classes = useStyles();

  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [requestUpdate, setRequestUpdate] = useState(false);

  const [productData, setProductData] = useState({
    _id: '',
    name: '',
    slug: '',
    shortDescription: '',
    longDescription: '',
    categoryId: '',
    price: '',
    sku: '',
    quantity: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const [productImgs, setProductImgs] = useState([]);

  const onChangeImages = (e) => {
    setProductImgs([...productImgs, e.target.files[0]]);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('_id', productData._id);
    form.append('name', productData.name);
    form.append('slug', productData.slug);
    form.append('shortDescription', productData.shortDescription);
    form.append('longDescription', productData.longDescription);
    form.append('categoryId', productData.categoryId);
    form.append('price', productData.price);
    form.append('sku', productData.sku);
    form.append('quantity', productData.quantity);

    if (productImgs.length > 0) {
      productImgs.map((img) => form.append('productImgs', img));
    }

    if (requestUpdate) {
      dispatch(updateProduct(form));
      setRequestUpdate(false);
    } else {
      dispatch(createProduct(form));
    }

    setTimeout(() => {
      setOpen(false);
      setProductData({
        _id: '',
        name: '',
        slug: '',
        shortDescription: '',
        longDescription: '',
        categoryId: '',
        price: '',
        sku: '',
        quantity: '',
      });
    }, 100);
  };

  const flattenCategories = (categories, options = []) => {
    for (const cat of categories) {
      options.push({
        value: cat._id,
        name: cat.name,
      });
      if (cat.children) {
        flattenCategories(cat.children, options);
      }
    }
    return options;
  };

  const inputFields = [
    {
      type: 'text',
      name: 'name',
      label: 'name',
      variant: 'outlined',
      className: classes.input,
      value: productData.name,
      required: true,
      width: true,
      onChange,
    },
    {
      type: 'text',
      name: 'slug',
      label: 'slug',
      variant: 'outlined',
      value: productData.slug,
      width: true,
      onChange,
    },
    {
      type: 'text',
      name: 'shortDescription',
      label: 'short Description',
      variant: 'outlined',
      value: productData.shortDescription,
      fullWidth: true,
      multiline: true,
      rows: 1,
      required: true,
      onChange,
    },
    {
      type: 'text',
      name: 'longDescription',
      label: 'long Description',
      variant: 'outlined',
      value: productData.longDescription,
      multiline: true,
      rows: 4,
      fullWidth: true,
      onChange,
    },
    {
      name: 'categoryId',
      label: 'categoryId',
      variant: 'outlined',
      value: productData.categoryId,
      fullWidth: true,
      required: true,
      onChange,
      select: flattenCategories(categories),
    },
    {
      type: 'number',
      name: 'price',
      label: 'price',
      variant: 'outlined',
      value: productData.price,
      required: true,
      width: true,
      onChange,
    },
    {
      type: 'text',
      name: 'sku',
      label: 'sku',
      variant: 'outlined',
      value: productData.sku,
      required: true,
      width: true,
      onChange,
    },
    {
      type: 'number',
      name: 'quantity',
      label: 'quantity',
      variant: 'outlined',
      value: productData.quantity,
      fullWidth: true,
      required: true,
      onChange,
    },
    {
      type: 'file',
      name: 'productImgs',
      variant: 'outlined',
      fullWidth: true,
      onChange: onChangeImages,
    },
  ];

  const rows = (products) => {
    return products.map((product, inx) => {
      return {
        id: product._id,
        image: `${product.productImg[0].img}`,
        name: product.name,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        price: product.price,
        quantity: product.quantity,
        categoryId: product.categoryId,
        sku: product.sku,
        actions: 'actions',
      };
    });
  };
  const initUpdate = (rows, id) => {
    const result = rows.find((item) => item.id === id);
    setProductData({
      _id: result.id,
      name: result.name,
      slug: result.slug,
      shortDescription: result.shortDescription,
      longDescription: result.longDescription,
      categoryId: result.categoryId,
      price: result.price,
      sku: result.sku,
      quantity: result.quantity,
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
            src={` http://localhost:7000/public/media/products/${params.value}`}
            variant='square'
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
      field: 'shortDescription',
      headerName: 'SHORT DESCRIPTION',
      width: 250,
    },
    {
      field: 'price',
      headerName: 'PRICE',
      width: 125,
    },
    {
      field: 'sku',
      headerName: 'SKU',
      width: 125,
    },
    {
      field: 'quantity',
      headerName: 'QUANTITY',
      width: 150,
    },

    {
      field: 'actions',
      headerName: 'ACTIONS',
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.actions}>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                return (
                  setRequestUpdate(true),
                  initUpdate(rows(products), params.id),
                  setOpen(true)
                );
              }}
            >
              Edit
            </a>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                dispatch(deleteProduct(params.id));
              }}
            >
              Delete
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Layout sidebar>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>Products</h3>
          <button
            onClick={handleOpen}
            style={{
              padding: '1px 20px',
              margin: '15px',
              cursor: 'pointer',
            }}
          >
            Add
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='product-model'
            aria-describedby='product-model-description'
          >
            <div style={getModalStyle()} className={classes.paper}>
              <h3>Add Product</h3>
              {productImgs.map((img, inx) => (
                <div key={inx}>{img.name}</div>
              ))}
              <Form onSubmit={onSubmit} fields={inputFields} />
            </div>
          </Modal>
        </div>
        <div>
          <DataGrid
            autoHeight
            rows={rows(products)}
            columns={columns}
            pagination
            pageSize={7}
          />
        </div>
      </Layout>
    </>
  );
}
