import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PaginationActions from '../PaginationActions/PaginationActions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontWeight: 600,
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  transition: 'background-color 0.3s ease',
}));

const BookTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [sortBy, setSortBy] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: 'SR. No.',
        accessor: (rowIndex) => rowIndex + 1,
        disableSortBy: true,
      },
      { Header: 'Ratings Average', accessor: 'ratings_average' },
      { Header: 'Author Name', accessor: 'author_name' },
      { Header: 'Title', accessor: 'title' },
      { Header: 'First Publish Year', accessor: 'first_publish_year' },
      { Header: 'Subject', accessor: 'subject' },
      { Header: 'Author Birth Date', accessor: 'author_birth_date' },
      { Header: 'Author Top Work', accessor: 'author_top_work' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <Button variant="contained" color="primary" onClick={() => handleEdit(row)}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleSave(row)}>
              Save
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `https://openlibrary.org/search.json?q=book&page=${pageIndex + 1}&limit=${pageSize}&sort=${
            sortBy[0]?.id
          }&order=${sortBy[0]?.desc ? 'desc' : 'asc'}`
        );
        setData(result.data.docs);
        setPageCount(Math.ceil(result.data.numFound / pageSize));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [pageIndex, pageSize, sortBy]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount,
      manualSortBy: true,
      initialState: { sortBy },
    },
    useSortBy,
    usePagination
  );

  const handleSort = (direction) => {
    setSortBy([{ id: columns[1].accessor, desc: direction === 'desc' }]);
  };

  const handleEdit = (row) => {
    // Implement edit functionality here
    console.log('Edit row:', row.original);
  };

  const handleSave = (row) => {
    // Implement save functionality here
    console.log('Save row:', row.original);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Book Records
      </Typography>
      <Paper>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table {...getTableProps()}>
                <TableHead>
                  {headerGroups.map((headerGroup) => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <StyledTableCell
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          sx={{ cursor: 'pointer' }}
                        >
                          {column.render('Header')}
                          <span>
                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                          </span>
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <StyledTableRow {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <StyledTableCell {...cell.getCellProps()}>{cell.render('Cell')}</StyledTableCell>
                        ))}
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <PaginationActions
              count={pageCount * pageSize}
              page={pageIndex}
              rowsPerPage={pageSize}
              onPageChange={(e, newPage) => setPageIndex(newPage)}
              onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value, 10))}
              handleSort={handleSort}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default BookTable;
