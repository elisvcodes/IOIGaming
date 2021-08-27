import React, { useState } from 'react';

import { makeStyles, Avatar } from '@material-ui/core';
import Layout from '../../components/Layout/index';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../_actions/product';
import { DataGrid } from '@material-ui/data-grid';
import { GrDocumentImage } from 'react-icons/gr';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import currency from 'currency.js';
import { Link, useHistory } from 'react-router-dom';
dayjs.extend(relativeTime);

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
  const history = useHistory();

  const [productData, setProductData] = useState({
    _id: '',
    name: '',
    slug: '',
    shortDescription: '',
    longDescription: '',
    price: '',
    sku: '',
    quantity: '',
    isFeatured: 2,
  });

  const [productCategories, setProductCategories] = useState([]);
  console.log(productCategories);
  const onChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const [productImgs, setProductImgs] = useState([]);

  const onChangeImages = (e) => {
    setProductImgs([...productImgs, e.target.files[0]]);
  };

  const onChangeSelect = (event) => {
    setProductCategories(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('_id', productData._id);
    form.append('name', productData.name);
    form.append('slug', productData.slug);
    form.append('shortDescription', productData.shortDescription);
    form.append('longDescription', productData.longDescription);
    productCategories.map((id) => form.append('categoryId', id));
    // form.append('categoryId', productCategories);
    form.append('price', productData.price);
    form.append('sku', productData.sku);
    form.append('quantity', productData.quantity);
    form.append('isFeatured', productData.isFeatured);
    if (productImgs.length > 0) {
      productImgs.map((img) => form.append('productImgs', img));
    }
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
      // className: classes.input,
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
      value: productCategories,
      required: true,
      width: true,
      select: flattenCategories(categories),
      onChange: onChangeSelect,
      SelectProps: { multiple: true },
    },
    {
      name: 'isFeatured',
      label: 'Featured?',
      variant: 'outlined',
      value: productData.isFeatured,
      width: true,
      select: [
        { value: 1, name: 'Yes' },
        { value: 2, name: 'No' },
      ],
      onChange,
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
    return products.map((product) => {
      console.log(product);
      return {
        id: product._id,
        image:
          product.productImg.length > 0
            ? `${product.productImg[0].imageUrl}`
            : '',
        // image: `${product.productImg[0].img}`,
        // product.productImg.length > 0 ?  `${product.productImg[0].imageUrl}` : ''  ,
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        price: currency(product.price).format(),
        quantity: product.quantity,
        // categoryId: product.categoryId,
        sku: product.sku,
        isFeatured: product.isFeatured,
        date: dayjs(product.updatedAt).format('MM/DD/YY'),
        actions: 'actions',
      };
    });
  };
  const initUpdate = (products, id) => {
    const result = products.find((item) => item._id === id);
    setProductData({
      _id: result._id,
      name: result.name,
      slug: result.slug,
      shortDescription: result.shortDescription,
      longDescription: result.longDescription,
      price: result.price,
      sku: result.sku,
      quantity: result.quantity,
      isFeatured: result.isFeatured,
    });
    setProductCategories(result.categoryId.map((id) => id.id));
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
            src={` ${params.value}`}
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
      field: 'date',
      headerName: 'DATE',
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
              href={`products/edit/${params.id}`}
              onClick={(e) => {
                e.preventDefault();
                return history.push({
                  pathname: `/products/edit/${params.id}`,
                  state: products.find((product) => product._id === params.id),
                });
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
          <Link to='/products/add'>
            <button
              style={{
                padding: '1px 20px',
                margin: '15px',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </Link>
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
