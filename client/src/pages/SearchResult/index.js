import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/index';
import axios from 'axios';
import config from '../../util/config';
import Products from '../../components/Products';
export default function SearchResult(props) {
  const [results, setResults] = useState({ result: [], loading: false });
  useEffect(async () => {
    setResults({ loading: true });
    const products = await axios.get(
      `${config.SERVER_URI}/api/v1/product/${props.location.search}`
    );
    setResults({ result: products.data, loading: false });
  }, []);

  if (results.loading) {
    return 'loading';
  }

  return (
    <>
      <Layout sidebar={{ props: results.result }}>
        <Container>
          <div style={{ marginTop: '20px' }}>
            <Products products={results.result} />
          </div>
        </Container>
      </Layout>
    </>
  );
}
