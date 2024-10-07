import React, { useEffect, useState } from 'react'
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
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton, Stack } from '@mui/material';
import axios from 'axios';

function createData(name, COURSESNAME, EDIT, DELET) {
  return { name, COURSESNAME, EDIT, DELET };
}




export default function Courses() {

  const [open, setOpen] = React.useState(false);

  const [initialValues, setinitialvalues] = useState({
    course: '',
  })
  const [course, setcourse] = useState([])
  const [editid, seteditId] = useState(null)
  const dataToken = localStorage.getItem('token');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    data()
  }, [dataToken])

  const data = () => {
    axios.get('https://backend-interview-test-6hzp.onrender.com/course/', {
      headers: {
        Authorization: dataToken
      }
    })
      .then((res) => {
        setcourse(res.data.data)

      })
      .catch((error) => {
        console.log(error);

      })
  }

  const handlesubmit = (values, { resetForm }) => {
    if (editid != null) {
      axios.put(`https://backend-interview-test-6hzp.onrender.com/course/` + editid, values, {
        headers: {
          Authorization: dataToken
        }
      })
        .then((res) => {
          data()
          seteditId(null)
          setinitialvalues({ initialValues })
          handleClose()
        })
        .catch((error) => {
          console.log(error);

        })
    }
    else {
      axios.post('https://backend-interview-test-6hzp.onrender.com/course/create', values, {
        headers: {
          Authorization: dataToken
        }
      })
        .then(() => {
          resetForm()
          console.log(values);
          handleClose()
        })
        .catch((error) => {
          console.log(error);

        })
    }
  }

  const deletdata = async (id) => {
    axios.delete(`https://backend-interview-test-6hzp.onrender.com/course/` + id, {
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
  const updatedata = (row) => {
    setinitialvalues({ initialValues })
    seteditId(row._id);
    setOpen(true);
  }

  return (
    <>
   <Box
      sx={{
        backgroundColor: '#D6EFD8',
        minHeight: '100vh',
      }}
    >
            <Design>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{

              width: '80%',
              maxWidth: '100%',
              marginLeft: '15px',
              marginBottom: '20px'
            }}
          >
            <TextField fullWidth label="search" id="fullWidth"  sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#4caf50',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#4caf50',
                          },
                        }}/>
          </Box>


          <Button variant="outlined" onClick={handleClickOpen}
            sx={{
              width: '20%',
              height: '45px',
              margin: '5px 10px',
              borderColor: '#4caf50',
              color: '#4caf50',
              fontSize: '15px',
              fontWeight: '600',
              '&:hover': {
                borderColor: '#4caf50',
               
              },
              
            }}
          >
            Create Courses
          </Button>
          <Dialog
            onClose={handleClose}
            open={open}
          >
            <DialogTitle >Add Course</DialogTitle>
            <Formik
              enableReinitialize
              onSubmit={handlesubmit}
              initialValues={initialValues}
            >
              <Form style={{ display: 'flex' }}>
                <div>
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],

                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Divider />

                  <Box>

                    <Box

                      sx={{
                        '& > :not(style)': { m: 2.5, width: '60ch' },

                      }}
                      noValidate
                      autoComplete="off"
                    >

                      <Field
                        as={TextField}
                        id="outlined-basic"
                        label="Courses Name"
                        variant="outlined"
                        name="course"
                       
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#4caf50',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#4caf50',
                          },
                        }}
                      />


                    </Box>

                    <Stack
                      spacing={2}
                      direction={"row"}
                      sx={{ margin: '0px 10px 15px 20px', }}
                    >

                      <Button
                        variant='contained'
                        type="submit"
                    
                        sx={{
                          backgroundColor: '#4caf50',
                          fontSize: '15px',
                          fontWeight: '600',
                          '&:hover': {
                            backgroundColor: '#388e3c',
                            
                          },
                        }}
                      >
                        + Add courses
                      </Button>

                    </Stack>
                  </Box>
                </div>
              </Form>
            </Formik>
          </Dialog>



        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>NO</TableCell>
                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>COURSESNAME</TableCell>
                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>EDIT</TableCell>
                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>DELET</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {course.map((row, index) => (
                <TableRow
                  //  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{row.course}</TableCell>
                  <TableCell align="center" onClick={() => updatedata(row)}>
                    <EditNoteIcon />
                  </TableCell>
                  <TableCell align="center" onClick={() => deletdata(row._id)}>
                    <DeleteForeverIcon />
                  </TableCell>


                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Design>
      </Box>
    </>
  );
}
Courses.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};



