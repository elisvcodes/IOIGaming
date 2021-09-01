import React, { useState, useEffect } from 'react';
import Form from '../../../components/UI/Form';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../../components/Layout';
import { Container } from '@material-ui/core';
import { createProduct, updateProduct } from '../../../_actions/product';
export default function ProductActions(props) {
  console.log(props);
  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const { categories, fetching } = categoriesReducer;
  const dispatch = useDispatch();

  const [requestUpdate, setRequestUpdate] = useState(false);

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

  const onChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const [productImgs, setProductImgs] = useState([]);
  console.log(productImgs);
  const onChangeImages = (e) => {
    setProductImgs([...productImgs, e.target.files[0]]);
  };

  const onChangeSelect = (event) => {
    setProductCategories(event.target.value);
  };

  useEffect(() => {
    if (props.location.state !== undefined) {
      setProductData({
        _id: props.match.params.id,
        name: props.location.state.name,
        slug: props.location.state.slug,
        shortDescription: props.location.state.shortDescription,
        longDescription: props.location.state.longDescription,
        price: props.location.state.price,
        sku: props.location.state.sku,
        quantity: props.location.state.quantity,
        isFeatured: props.location.state.isFeatured,
      });
      setProductCategories(props.location.state.categoryId.map((id) => id.id));
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    if (productData._id != '') {
      form.append('_id', productData._id);
    }
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

    if (props.location.state !== undefined) {
      dispatch(updateProduct(form));
    } else {
      dispatch(createProduct(form));
    }
    setProductData({
      _id: '',
      name: '',
      slug: '',
      shortDescription: '',
      longDescription: '',
      price: '',
      sku: '',
      quantity: '',
      isFeatured: false,
    });
    setProductCategories([]);
    setProductImgs([]);
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
  const handleRemoveImage = (index) => {
    let updatedImagesArray = productImgs.filter((_, i) => i != index);
    console.log(updatedImagesArray);
    setProductImgs(updatedImagesArray);
  };

  if (fetching) {
    return 'loading';
  }

  return (
    <>
      <Layout sidebar>
        <Container style={{ marginTop: '20px' }}>
          <a href='/products' style={{ marginBottom: '10px' }}>
            Go Back
          </a>
          <Form onSubmit={onSubmit} fields={inputFields} />
          <div>
            {productImgs.map((img, inx) => {
              return (
                <>
                  <div style={{ margin: '10px 0' }}>
                    <span>{img.name}</span>
                    <a
                      href=''
                      style={{ marginLeft: '10px' }}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(e);
                        handleRemoveImage(inx);
                      }}
                    >
                      X
                    </a>
                  </div>
                </>
              );
            })}
          </div>
        </Container>
      </Layout>
    </>
  );
}
