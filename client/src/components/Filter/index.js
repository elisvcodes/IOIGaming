import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Select, MenuItem, Button, Slider } from '@material-ui/core';
import { useHistory, Redirect } from 'react-router-dom';
export default function Filter({ filter }) {
  const [min, setMin] = useState({ value: 0, calculating: false });
  const [max, setMax] = useState({ value: 0, calculating: false });
  const history = useHistory();

  const [priceFilter, setPriceFilter] = useState({
    values: [],
    loading: false,
  });
  const categoriesState = useSelector((state) => state.categoriesReducer);
  const { categories } = categoriesState;
  useEffect(() => {
    setMin({ calculating: true });
    setMax({ calculating: true });
    setPriceFilter({ loading: true });
    const findMin = (arr) => {
      let min = arr[0] && arr[0].price;
      for (let i = 0; i < arr.length; i++) {
        if (min >= arr[i].price) {
          min = arr[i].price;
        }
      }
      return min;
    };

    const findMax = (arr) => {
      let max = arr[0] && arr[0].price;
      for (let i = 0; i < arr.length; i++) {
        if (max <= arr[i].price) {
          max = arr[i].price;
        }
      }
      return max;
    };

    setMin({ value: findMin(filter.products), calculating: false });
    setMax({ value: findMax(filter.products), calculating: false });
    setPriceFilter({ values: [min.value, max.value], loading: false });
  }, []);

  const handleChange = (event, newValue) => {
    setPriceFilter({ values: newValue });
  };

  if (min.calculating || max.calculating || priceFilter.loading) {
    return 'loading';
  }

  return (
    <>
      <h3>Filter By Categories</h3>
      <Select value='Select'>
        <MenuItem value='Select'> Select Category</MenuItem>

        {categories.map((cat) => (
          <MenuItem value={cat.name} key={cat._id}>
            <Link href={`/cat/${cat.slug}`} key={cat._id}>
              <p>{cat.name}</p>
            </Link>
          </MenuItem>
        ))}
      </Select>

      <h3>Filter By Price</h3>
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '80%',
          }}
        >
          <Slider
            min={min.value}
            max={max.value}
            value={
              priceFilter.values[0] === 0
                ? [min.value, max.value]
                : priceFilter.values
            }
            style={{ width: '65%' }}
            onChange={handleChange}
            step={20}
          />
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={() =>
              filter.props.match.url !== '/search/'
                ? history.push({
                    pathname: `${filter.props.match.url}`,
                    search: `?pmin=${priceFilter.values[0]}&pmax=${priceFilter.values[1]}`,
                  })
                : history.push({
                    // pathname: `${filter.props.location.search}`,
                    search: `${filter.props.location.search}&pmin=${priceFilter.values[0]}&pmax=${priceFilter.values[1]}`,
                  })
            }
          >
            Filter
          </Button>
        </div>
        <p>
          ${priceFilter.values[0] === 0 ? min.value : priceFilter.values[0]} - $
          {priceFilter.values[1] === 0 ? max.value : priceFilter.values[1]}
        </p>
      </>
    </>
  );
}
