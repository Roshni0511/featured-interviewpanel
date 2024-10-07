import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Design from './Design';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';

function createData(name, COMPANYNAME, STUDENTNAME, FOLLOWUPDATE, status = 'pending') {
  return { name, COMPANYNAME, STUDENTNAME, FOLLOWUPDATE, status };
}

// const initialRows = [
//   createData('1', 'Planicsdev Infotech', 'Roshni Chauhan', '16-08-2024'),
//   createData('2', 'HVG Infotech', 'Vishwa Italiya', '15-08-2024'),
//   createData('3', 'HVG Infotech', 'Neha Parmar', '15-08-2024'),
//   createData('4', 'HVG Infotech', 'Krisha patel', '13-08-2024'),
//   createData('5', 'Creative Infotech', 'Priyanka Goti', '13-08-2024'),
//   createData('6', 'SHOPNO ECOMMERCE', 'Rajvi Parmar', '12-08-2024'),
// ];

export default function Todayinterview() {
  const [rows, setRows] = useState([]);
  const dataToken = localStorage.getItem('token')
  const handleChange = (event, index) => {
    const newRows = [...rows];
    newRows[index].status = event.target.value;
    setRows(newRows);
  };
  const [dueinterview, setdueinterview] = ([])
  const [initialvalues, setinitialvalues] = useState({
    companyname: '',
    studentname: '',
    followupdate: '',
    status: '',
  })
  const status = [
    { value: 'Reject', label: 'Reject' },
    { value: 'Done', label: 'Done' },
    { value: 'Pending', label: 'Pending' },

]
const [statuses, setStatuses] = useState({});
  // const getStatusStyles = (status) => {
  //   switch (status) {
  //     case 'pending':
  //       return { backgroundColor: 'orange', color: 'white' };
  //     case 'Reject':
  //       return { backgroundColor: 'red', color: 'white' };
  //     case 'done':
  //       return { backgroundColor: 'green', color: 'white' };
  //     default:
  //       return {};
  //   }
  // };
  const handlestatus = (event,dueinterviewid) => {
    axios.put(`https://backend-interview-test-6hzp.onrender.com/interview/due/${dueinterviewid}`,{status :event},{
      headers: {
        Authorization: dataToken
      }
    })
    .then((error) => {
         data()
    })
    .catch((error) => {
      console.log(error);
      
    })
  }

  const data = () => {
    axios.get('https://backend-interview-test-6hzp.onrender.com/interview/due', {
      headers: {
        Authorization: dataToken
      }
    })
    .then((res) => {
      setRows(res.data.data)
      const initialstatus = {};
      res.data.data.forEach((student) => {
          initialstatus[student._id] = 'Pending'
      })
      setStatuses(initialstatus)
  })

  .catch((error) => {
      console.log(error);

  })
  }
  useEffect(() => {
    data()
  },[dataToken])

  return (
    <>
      <Box sx={{ backgroundColor: '#D6EFD8', minHeight: '100vh' }}>
        <Design>
          <Box
            sx={{
              width: '96%',
              maxWidth: '100%',
              marginLeft: '15px',
              marginBottom: '20px',
            }}
          >
            <TextField fullWidth label="search" id="fullWidth" sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#4caf50',
              },
            }} />
          </Box>
          <Formik
            enableReinitialize
            initialValues={initialvalues}
          >

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#4caf50', fontWeight: '600' }}>NO</TableCell>
                    <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600' }}>COMPANY NAME</TableCell>
                    <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600' }}>STUDENT NAME</TableCell>
                    <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600' }}>STATUS</TableCell>
                    <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600' }}>DESCRIPTION NOTE</TableCell>
                    <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600' }}>FOLLOW UPDATE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{row.companyname.company}</TableCell>
                      <TableCell align="center">{row.studentname? row.studentname.name : 'N/A'}</TableCell>
                      <TableCell align="center">
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                                                as={Select}
                                                labelId="demo-simple-select-label "
                                                id="demo-simple-select-label"
                                                name="status"

                                                value={row.status}
                                                onChange={(event) => handlestatus(event.target.value, row._id)}
                                                sx={{
                                                    backgroundColor: row.jobstatus === 'Done' ? 'green' :
                                                        row.jobstatus === 'Reject' ? 'red' :
                                                            '#ff8c00',
                                                    color: '#fff',
                                                }}
                                            >

                                                {status.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center"  sx={{ padding: '15px 6px 12px'}}>
                        <TextField
                          id="filled-multiline-flexible"
                          multiline
                          maxRows={4}
                          variant="filled"
                          placeholder=" Write your thoughts.."
                         
                        />
                      </TableCell>
                      <TableCell align="center">{row.followupdate.split('T')[0].split('-').reverse().join("-")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Formik>
        </Design>
      </Box>
    </>
  );
}
