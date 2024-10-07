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
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { Formik } from 'formik';



function createData(name, COMPANYNAME, STUDENTNAME, FOLLOWUPDATE) {
  return { name, COMPANYNAME, STUDENTNAME, FOLLOWUPDATE };
}



export default function Todayinterview() {

  const [row, setrow] = useState([])
  const dataToken = localStorage.getItem('token')
  const [initialvalues, setinitialvalues] = useState({
    companyname: '',
    studentname: '',
    followupdate: '',
    status: '',
    description: ''
  })
  const [statuses, setStatuses] = useState({});
  const handlestatus = (event, todayinterviewid) => {


    axios.put(`https://backend-interview-test-6hzp.onrender.com/interview/${todayinterviewid}`, { status: event }, {
      headers: {
        Authorization: dataToken
      }
    })
      .then((res) => {
        data()
      })
      .catch((error) => {
        console.log(error);

      })

  }
  const handleDescriptionChange = (newDescription, todayinterviewid) => {
    axios.put(`https://backend-interview-test-6hzp.onrender.com/interview/${todayinterviewid}`, { description: newDescription }, {
      headers: {
        Authorization: dataToken
      }
    })
      .then((res) => {
        data();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const status = [
    { value: 'Reject', label: 'Reject' },
    { value: 'Done', label: 'Done' },
    { value: 'Pending', label: 'Pending' },

  ]

  const data = () => {

    axios.get(`https://backend-interview-test-6hzp.onrender.com/interview/followupdate`, {
      headers: {
        Authorization: dataToken
      }
    })
      .then((res) => {
        setrow(res.data.data)
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
  }, [dataToken])
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#D6EFD8',
          minHeight: '100vh',

        }}
      >
        <Design>
          <Box
            sx={{
              width: '96%',
              maxWidth: '100%',
              marginLeft: '15px',
              marginBottom: '20px'
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
            enableReintialize
            initialvalues={initialvalues}

          >

            <TableContainer component={Paper} >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#4caf50', fontWeight: '600' }}>NO</TableCell>
                    <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '500' }}>COMPANY NAME</TableCell>
                    <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '500' }}>STUDENT NAME</TableCell>
                    <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '500' }}>STATUS</TableCell>
                    <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '500' }}>DESCRIPTION NOTE</TableCell>
                    <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '500' }}>FOLLOW UPDATE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((row, index) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{row.companyname.company}</TableCell>
                      <TableCell align="center">{row.studentname.name}</TableCell>
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
                              backgroundColor: row.status === 'Done' ? 'green' :
                                row.status === 'Reject' ? 'red' :
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
                      <TableCell align="center">
                        <TextField
                          // id={`description-${row._id}`}
                          multiline
                          maxRows={4} 
                          variant="filled"
                          placeholder="Write your thoughts..."
                          value={row.description} 
                          onChange={(e) => handleDescriptionChange(e.target.value, row._id)} 
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
