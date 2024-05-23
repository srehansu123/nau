import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import axios from 'axios';
import {
  Table, TableHead, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper
} from '@mui/material';

const BookTable = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  const columns = useMemo(
    () => [
      { Header: 'Ratings Average', accessor: 'ratings_average' },
      { Header: 'Author Name', accessor: 'author_name' },
      { Header: 'Title', accessor: 'title' },
      { Header: 'First Publish Year', accessor: 'first_publish_year' },
      { Header: 'Subject', accessor: 'subject' },
      { Header: 'Author Birth Date', accessor: 'author_birth_date' },
      { Header: 'Author Top Work', accessor: 'author_top_work' },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`https://openlibrary.org/search.json?q=book&page=${pageIndex + 1}&limit=${pageSize}`);
        setData(result.data.docs);
        setPageCount(Math.ceil(result.data.numFound / pageSize));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [pageIndex, pageSize]);

  const {
    getTableProps, getTableBodyProps, headerGroups, page, prepareRow, state: { sortBy },
  } = useTable(
    { columns, data, manualPagination: true, pageCount },
    useSortBy,
    usePagination
  );

  return (
    <Paper>
      <TableContainer>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={pageCount * pageSize}
        page={pageIndex}
        onPageChange={(e, newPage) => setPageIndex(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Paper>
  );
};

export default BookTable;
