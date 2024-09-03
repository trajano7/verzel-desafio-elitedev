import * as React from 'react';
import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

function PaginationLink({ pageCount }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get('query');
  const page = parseInt(query.get('page') || '1', 10);
  return (
    <Pagination 
      sx={{ margin: "0 auto", marginBottom: "5rem" }}
      page={page}
      count={pageCount}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/?query=${searchQuery}${item.page === 1 ? '' : `&page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}

export default PaginationLink;

