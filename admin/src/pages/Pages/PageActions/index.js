import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../../components/Layout';
import { createPage, updatePage } from '../../../_actions/page';
import { Container, TextField, makeStyles, Button } from '@material-ui/core';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles({
  textfiled: {
    margin: '5px 0',
  },
  richText: {
    height: '300px',
    marginTop: '10px',
    marginBottom: '50px',
  },
});

export default function PageActions(props) {
  console.log(props);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [pageData, setPageData] = useState({
    _id: '',
    name: '',
    slug: '',
    heroImageLinkTo: '',
  });
  const [content, setContent] = useState('');
  const [heroImage, setHeroImage] = useState('');

  useEffect(() => {
    if (props.location.state !== undefined) {
      setPageData({
        _id: props.match.params.id,
        name: props.location.state.name,
        slug: props.location.state.slug,
        heroImageLinkTo:
          props.location.state.heroImageLinkTo !== undefined
            ? props.location.state.heroImageLinkTo
            : '',
      });
      setContent(props.location.state.content);
    }
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setPageData({ ...pageData, [name]: value });
  };
  const imgOnChange = (e) => {
    setHeroImage(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('_id', pageData._id);
    form.append('name', pageData.name);
    form.append('slug', pageData.slug);
    form.append('content', content);
    form.append('heroImage', heroImage);
    form.append('heroImageLinkTo', pageData.heroImageLinkTo);

    if (props.location.state !== undefined) {
      dispatch(updatePage(form));
    } else {
      dispatch(createPage(form));
    }
    setPageData({ name: '', slug: '', heroImageLinkTo: '' });
    setContent('');
  };
  return (
    <Layout sidebar>
      <Container style={{ marginTop: '20px' }}>
        <a href='/pages' style={{ marginBottom: '10px' }}>
          Go Back
        </a>
        <form onSubmit={onSubmit}>
          <TextField
            type='text'
            name='name'
            value={pageData.name}
            label='name'
            variant='outlined'
            fullWidth
            className={classes.textfiled}
            required
            onChange={onChange}
          />
          <TextField
            type='text'
            name='slug'
            value={pageData.slug}
            label='slug'
            variant='outlined'
            fullWidth
            className={classes.textfiled}
            onChange={onChange}
          />
          <ReactQuill
            theme='snow'
            value={content}
            onChange={setContent}
            className={classes.richText}
          />
          <TextField
            type='file'
            name='heroImage'
            variant='outlined'
            fullWidth
            className={classes.textfiled}
            onChange={imgOnChange}
          />
          <TextField
            type='text'
            value={pageData.heroImageLinkTo}
            name='heroImageLinkTo'
            label='Hero Image Link'
            variant='outlined'
            fullWidth
            className={classes.textfiled}
            onChange={onChange}
          />
          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </form>
      </Container>
    </Layout>
  );
}
