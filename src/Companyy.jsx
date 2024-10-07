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
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton, Link } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import Draggable from 'react-draggable';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function createData(name, CompanyName, Contact, Area, EDIT, DELET, INFO) {
  return { name, CompanyName, Contact, Area, EDIT, DELET, INFO };
}
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}



export default function Companyy() {
  const [count, setCount] = useState(false);
  const [rows, setrows] = useState([])
  const [editid, seteditId] = useState(null)
  const dataToken = localStorage.getItem('token');

  const [initialValues, setinitialvalues] = useState({
    company: '',
    contact: '',
    url: '',
    address: '',
    area: '',
    city: '',
    note: '',
  })

  const handleOpen = () => {
    setCount(true);
  };



  const [info, setinfo] = useState(false)
  const [selectedCompany, setselectedCompany] = useState(null)

  const handleClickOpeninfo = (company) => {
    setselectedCompany(company)
    setinfo(true)
  }
  const handleClickCloseninfo = (company) => {
    setselectedCompany(null)
    setinfo(false)
  }

  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };
  const area = [
    { value: 'Katargam', label: 'Katargam' },
    { value: 'Vesu', label: 'Vesu' },
    { value: 'Adajan', label: 'Adajan' },
    { value: 'Amroli', label: 'Amroli' },

  ]

  const city = [
    { value: 'Surat', label: 'Surat' },
    { value: 'Ahemdabad', label: 'Ahemdabad' },
    { value: 'Vadodra', label: 'Vadodra' },
    { value: 'Navsari', label: 'Navsari' },

  ]



  useEffect(() => {
    data()

  }, dataToken)

  const data = async () => {
    axios.get(`https://backend-interview-test-6hzp.onrender.com/company/`, {
      headers: {
        Authorization: dataToken
      }
    })
      .then((res) => {
        setrows(res.data.data)
      })
      .catch((error) => {
        console.log(error);

      })
  }
  const handlesubmit = async (values, { resetForm }) => {
    if (editid != null) {
      axios.put(`https://backend-interview-test-6hzp.onrender.com/company/` + editid, values, {
        headers: {
          Authorization: dataToken
        }
      })
        .then((res) => {
          setinitialvalues({ initialValues })
          seteditId(null)
          handleClose()
          data()
        })
        .catch((error) => {
          console.log(error);
        })
    }
    else {
      axios.post(`https://backend-interview-test-6hzp.onrender.com/company/create`, values, {
        headers: {
          Authorization: dataToken
        }
      })
        .then((res) => {
          resetForm()
          data()
          console.log(values);
          handleClose()
        })
        .catch((error) => {
          console.log(error);

        })
    }
  }

  const deletdata = async (id) => {
    axios.delete(`https://backend-interview-test-6hzp.onrender.com/company/` + id, {
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

  const updatedata = async (row) => {
    setinitialvalues({ initialValues })
    seteditId(row._id)
    setOpen(true)

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
                        }} />
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
            }}>
            Create Company
          </Button>
          <Dialog
            onClose={handleClose}
            open={open}
          >
            <DialogTitle >Add Company</DialogTitle>
            <Formik
              onSubmit={handlesubmit}
              initialValues={initialValues}
              enableReinitialize
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
                    <Box sx={{ width: '100%' }}>

                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 1, width: '30ch' },
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#4caf50',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#4caf50',
                          },
marginLeft:'16px'           
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <Field
                          as={TextField}
                          name="company"
                          id="outlined-basic"
                          label="Type Company Name"
                          variant="outlined" />



                        <Field
                          as={TextField}
                          name="contact"
                          id="outlined-basic"
                          label="123-456-789 Name"
                          variant="outlined" />

                        <Field
                          as={TextField}
                          name="url"
                          id="outlined-basic"
                          label="Type URL link"
                          variant="outlined" />

                        <Field
                          as={TextField}
                          name="address"
                          id="outlined-multiline-flexible"
                          label="Type Address name"
                          multiline
                          maxRows={4}
                        />

                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box
                          component="form"
                          sx={{
                            '& > :not(style)': { m: 1, width: '30ch' },
                            '& .MuiOutlinedInput-root': {
                              '&.Mui-focused fieldset': {
                                borderColor: '#4caf50',
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#4caf50',
                            },
                            marginLeft:'16px'
                          }}
                          noValidate
                          autoComplete="off"
                        >

                          <FormControl>
                            <InputLabel id="area-label">Area</InputLabel>
                            <Field
                              as={Select}
                              name="area"
                              labelId="area-label"
                              id="area-select"
                              label="Area"
                            >
                              {area.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Field>
                          </FormControl>

                          <FormControl>
                            <InputLabel id="city-label">City</InputLabel>
                            <Field
                              as={Select}
                              name="city"
                              labelId="city-label"
                              id="city-select"
                              label="City"
                            >
                              {city.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Field>
                          </FormControl>


                        </Box>
                      </Box>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '62ch' },
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#4caf50',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#4caf50',
                          },
                          marginLeft:'16px'
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <Field
                          as={TextField}
                          name="note"
                          id="outlined-multiline-static"
                          label="Write Company description here...."
                          multiline
                          rows={4}

                        />


                      </Box>

                    </Box>

                    <Button variant="contained"
                      type='submit'
                      sx={{
                        padding: '8px 10px',
                        margin: '10px 10px 20px 10px',
                        backgroundColor: '#4caf50',
                        fontSize: '15px',
                        fontWeight: '600',
                        '&:hover': {
                          backgroundColor: '#388e3c',
                        },
                      }}>
                      + Add Company
                    </Button>
                  </Box>
                </div>


              </Form>
            </Formik>
          </Dialog>

        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>NO</TableCell>
                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>Comapany Name </TableCell>
                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>Contact</TableCell>
                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>Area</TableCell>
                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>EDIT</TableCell>
                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>DELET</TableCell>
                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>INFO</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>

              {rows.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">{row.company}</TableCell>
                  <TableCell align="center">{row.contact}</TableCell>
                  <TableCell align="center">{row.area}</TableCell>
                  <TableCell align="center" onClick={() => updatedata(row)}><EditNoteIcon /></TableCell>
                  <TableCell align="center" onClick={() => deletdata(row._id)}><DeleteForeverIcon /></TableCell>
                  <TableCell align="center" onClick={() => handleClickOpeninfo(row)}><InfoIcon /></TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>


          <React.Fragment>
            <Dialog
              open={info}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClickCloseninfo}
              PaperComponent={PaperComponent} // Add draggable functionality here
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                ACTOSOFT
              </DialogTitle>
              <Divider />
              <DialogContent sx={{ maxWidth: '450px', padding: '10px 24px' }}>
                {selectedCompany ? (
                  <>
                    <DialogContentText sx={{ color: 'black', fontSize: '20px' }}>
                      Company information :
                    </DialogContentText>
                    <DialogContentText sx={{ marginTop: '10px' }}>
                      Company Name : {selectedCompany.company}
                    </DialogContentText>
                    <DialogContentText sx={{ marginTop: '10px' }}>
                      Contact No : {selectedCompany.contact}
                    </DialogContentText>
                    <DialogContentText sx={{ marginTop: '10px' }}>
                      Link : {selectedCompany.url}
                    </DialogContentText>
                    <DialogContentText sx={{ marginTop: '10px' }}>
                      Address: {selectedCompany.address}
                    </DialogContentText>
                    <DialogContentText sx={{ marginTop: '10px' }}>
                      Area : {selectedCompany.area}
                    </DialogContentText>
                    <DialogContentText sx={{ marginTop: '10px' }}>
                      City : {selectedCompany.city}
                    </DialogContentText>
                    <DialogContentText sx={{ marginTop: '10px' }}>
                      Note: {selectedCompany.note}
                    </DialogContentText>
                  </>
                ) : (
                  <DialogContentText>No company information available</DialogContentText>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickCloseninfo} sx={{color:'#4caf50'}}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </TableContainer>
      </Design>
      </Box>
    </>
  );
}
Companyy.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};






