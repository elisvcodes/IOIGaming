import React from 'react';
import { useSelector } from 'react-redux';
import {
  Link,
  Select,
  MenuItem,
  Checkbox,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
export default function Filter(props) {
  const categories = useSelector((state) => state.categories);
  const priceRange = [
    {
      name: '$0-$24.99',
      min: null,
      max: 24.99,
    },
    {
      name: '$25-$49.99',
      min: 25,
      max: 49.99,
    },
    {
      name: '$50-$74.99',
      min: 50,
      max: 74.99,
    },
    {
      name: '$75-$99.99',
      min: 75,
      max: 99.99,
    },
    {
      name: '$100-$149.99',
      min: 100,
      max: 149.99,
    },
    {
      name: '$150-$199.99',
      min: 150,
      max: 199.99,
    },
    {
      name: '$200+',
      min: 200,
      max: null,
    },
  ];

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

  const min = findMin(props.items);
  const max = findMax(props.items);

  // for (let index = min; index < max; index += min / 2) {
  //   priceRange.push({
  //     name: `${index.toFixed(2)} - ${(index += min / 2).toFixed(2)} `,
  //   });
  // }

  const newRange = priceRange.filter((price) => {
    console.log(price);
    console.log(min, max);
    console.log(price.max == null);
    console.log(price.min == null);

    return price.max == null
      ? price.max <= max
      : price.max <= max && price.min >= min;
  });
  console.log(newRange);
  return (
    <>
      <h3>Filter By Categories</h3>
      <Select value='Select'>
        <MenuItem value='Select'> Select Category</MenuItem>

        {categories.map((cat) => (
          <MenuItem value={cat.name}>
            <Link href={`${cat.slug}`} key={cat._id}>
              <p>{cat.name}</p>
            </Link>
          </MenuItem>
        ))}
      </Select>

      <h3>Filter By Price</h3>
      {newRange.map((price) => {
        return (
          <div>
            <FormControl>
              <FormControlLabel control={<Checkbox />} label={price.name} />
            </FormControl>
          </div>
        );
      })}
    </>
  );
}
