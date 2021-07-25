import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/index';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';
import { getPages, deletePage } from '../../_actions/page';
import { useDispatch, useSelector } from 'react-redux';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
const useStyles = makeStyles({
  actions: {
    '& a': {
      margin: '0 10px',
    },
  },
});

export default function Pages() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getPages());
  }, []);
  const pages = useSelector((state) => state.pages);
  const rows = (pages) => {
    return pages.map((page) => {
      return {
        id: page._id,
        name: page.name,
        date: dayjs(page.updatedAt).format('MM/DD/YYYY'),
        actions: 'actions',
      };
    });
  };

  const columns = [
    {
      field: 'name',
      headerName: 'NAME',
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'LAST UPDATED',
      width: 250,
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
                return history.push({
                  pathname: `/pages/edit/${params.id}`,
                  state: pages.find((page) => page._id === params.id),
                });
              }}
            >
              Edit
            </a>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                dispatch(deletePage(params.id));
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
          <h3>Pages</h3>
          <Link to='/pages/add'>
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
            rows={rows(pages)}
            columns={columns}
            pagination
            pageSize={7}
          />
        </div>
      </Layout>
    </>
  );
}
