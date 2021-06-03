import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, DialogTitle } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import '../recordbook/RecordBook.css';
import ListData from '../recordsearch/ListData';

const StyledTableCell = withStyles((theme) => ({
  head: {
      fontWeight: 'bolder',
      backgroundColor: "#eee",
      color: theme.palette.common.black,
  },
  body: {
      color: "black",
      fontSize: 14,
  },
}))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: "#fff"
      },
      '&:nth-of-type(even)': {
        backgroundColor: "#eee"
      },
    },
  }))(TableRow);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    { id:'id', numeric: false, disablePadding: true, label: '番号' },
    { id:'registrationdate',numeric: true, disablePadding: false, label: '日付' },
    { id:'name',numeric: true, disablePadding: false, label: '内容' },
    { id:'money',numeric: true, disablePadding: false, label: '金額' },
    { id:'type',numeric: true, disablePadding: false, label: '種類' },
    { id:'category',numeric: true, disablePadding: false, label: '区分' },
    // { label: '詳細' },
  ];

  const EnhancedTableHead = (props) => {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <StyledTableRow>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align="center"
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </StyledTableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    icon: {
      alignItems: 'center'
    }
  }));

const RecordBook = () => {
  const classes = useStyles();

  // const [posts,setPosts] = useState([]);

  // useEffect(()=> getRecord(),[]);

  // const getRecord = () =>{
  //   if(posts.length === 0) {
  //     axios
  //       .get('/api/recordbook')
  //       .then(response => {
  //         console.log([response.data]);
  //         setPosts(response.data);
  //       })
  //       .catch(() => {
  //         console.log('connected error');
  //       })
  //     }
  // }

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} variant="">
        <DialogTitle>
          <div style={{ display: 'flex' }}>
            <LibraryBooksIcon style={{ fontSize: '40px', }} />
            <Typography style={{ fontSize: '30px' }}>記録帳</Typography>
          </div>
        </DialogTitle>

        <div className={classes.root}>
      {/* <Paper className={classes.paper}> */}
        <TableContainer>
        <Grid container spacing={24} justify={"center"}>
        <Grid className="table1">
          <Table
            className={classes.table}
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={ListData.getRecordData().length}
            />
            <TableBody>
              {stableSort(ListData.getRecordData(), getComparator(order, orderBy))
                .map((data) => {
                  return (
                    <StyledTableRow　variant="outlined">
                      <TableCell align="center">{data.id}</TableCell>
                      <TableCell align="center">{data.registrationdate}</TableCell>
                      <TableCell align="center">{data.name}</TableCell>
                      <TableCell align="center">{data.money}</TableCell>
                      <TableCell align="center">{data.type}</TableCell>
                      <TableCell align="center">{data.category}</TableCell>
                    </StyledTableRow>
                  );
                })}</TableBody>
          </Table>
          </Grid>
          </Grid>
        </TableContainer>
      {/* </Paper> */}
    </div>
    </Paper>
    </div>
  );
};

export default RecordBook;