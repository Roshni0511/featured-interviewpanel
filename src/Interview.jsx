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
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton, Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';



export default function Interview() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [initialValues, setinitialvalues] = useState({
        companyname: '',
        studentname: '',

        followupdate: '',
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };



    const dataToken = localStorage.getItem('token');
    const [comapanyes, setcomapanyes] = useState([]);
    const [students, setstudents] = useState([])
    const [editid, seteditId] = useState(null)
    const [statuses, setStatuses] = useState({});
    const status = [
        { value: 'Reject', label: 'Reject' },
        { value: 'Done', label: 'Done' },
        { value: 'Pending', label: 'Pending' },

    ]
    const handlestatus = (event, studentid) => {
        console.log(event, studentid);

        axios.put(`https://backend-interview-test-6hzp.onrender.com/interview/${studentid}`, { status: event }, {
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
        // setStatuses({ ...statuses, [studentid]: event.target.value })
    }


    const demo = () => {
        axios.get(`https://backend-interview-test-6hzp.onrender.com/student/`, {
            headers: {
                Authorization: dataToken
            }
        })
            .then((res) => {
                setstudents(res.data.data)
            })

            .catch((error) => {
                console.log(error);

            })
    }
    const data = () => {
        axios.get(`https://backend-interview-test-6hzp.onrender.com/interview/`, {
            headers: {
                Authorization: dataToken
            }
        })
            .then((res) => {
                setRows(res.data.data)
                const initialstatus = {};
                res.data.data.forEach((student) => {
                    initialstatus[student._id] = 'Reject'
                })
                setStatuses(initialstatus)
            })
            .catch((error) => {
                console.log(error);

            })
    }

    const handlesubmit = (values, { resetForm }) => {
        console.log("=========");

        if (editid != null) {
            axios.put(`https://backend-interview-test-6hzp.onrender.com/interview/` + editid, values, {
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

            axios.post(`https://backend-interview-test-6hzp.onrender.com/interview/create`, values, {
                headers: {
                    Authorization: dataToken
                }
            })
                .then((res) => {
                    resetForm()
                    console.log(values);
                    handleClose()
                    data()



                })
                .catch((error) => {
                    console.log(error);

                })
        }
    }

    const deletdata = (id) => {
        axios.delete(`https://backend-interview-test-6hzp.onrender.com/interview/` + id, {
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

    const handlesubmit12 = () => {
        console.log("helloheloo==");

    }

    const updatedata = (row) => {
        setinitialvalues({ initialValues })
        seteditId(row._id)
        setOpen(true)
    }
    useEffect(() => {
        data();
        demo();
        axios.get(`https://backend-interview-test-6hzp.onrender.com/company/`, {
            headers: {
                Authorization: dataToken
            }
        })
            .then((res) => {
                setcomapanyes(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                        }}>
                        Create Student
                    </Button>

                    <div>

                        <Dialog onClose={() => handleClose(selectedValue)} open={open}>
                            <DialogTitle >Add Student</DialogTitle>
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
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handlesubmit}
                                enableReinitialize
                            >
                                {({ values, setFieldValue }) => (
                                    <Form >




                                        <Box sx={{ display: 'flex' }}>
                                            <Box

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

                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <FormControl >
                                                    <InputLabel id="demo-simple-select-label">Select an Company</InputLabel>
                                                    <Select
                                                        as={Select}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Select an Company"
                                                        value={values.companyname}
                                                        name="companyname"
                                                        onChange={(e) => setFieldValue('companyname', e.target.value)}
                                                    >
                                                        {comapanyes.map((option) => (
                                                            <MenuItem key={option._id} value={option._id}>
                                                                {option.company}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>

                                            <Box

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
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >

                                                <FormControl >
                                                    <InputLabel id="demo-simple-select-label">Select an Student</InputLabel>
                                                    <Select
                                                        as={Select}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Select an Student"
                                                        value={values.studentname}
                                                        name="studentname"
                                                        onChange={(e) => setFieldValue('studentname', e.target.value)}
                                                    >
                                                        {students.map((option) => (
                                                            <MenuItem key={option._id} value={option._id}>
                                                                {option.name}
                                                            </MenuItem>
                                                        ))}

                                                    </Select>


                                                </FormControl>
                                            </Box>
                                        </Box>
                                        <Box>

                                            <Box

                                                sx={{
                                                    '& > :not(style)': { m: 1, width: '62ch' },
                                                    '& .MuiOutlinedInput-root': {
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#4caf50',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: '#4caf50',
                                                    },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <h4 style={{ marginBottom: '0px' }}>Interveiew Schedule Name</h4>
                                                <Field
                                                    as={TextField}
                                                    type='date'
                                                    id="outlined-basic"
                                                    name='followupdate'
                                                    // label="Student date"
                                                    variant="outlined"
                                                />
                                            </Box>

                                            <Button variant="contained" type='submit' sx={{
                                                padding: '8px 10px', margin: '10px 10px 20px 10px', backgroundColor: '#4caf50', fontSize: '15px', fontWeight: '600', '&:hover': {
                                                    backgroundColor: '#388e3c',
                                                },
                                            }}>+ Add Student</Button>
                                        </Box>


                                    </Form>
                                )}
                            </Formik>
                        </Dialog>
                    </div>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>NO</TableCell>
                                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>StudentsName</TableCell>
                                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>Company Name</TableCell>
                                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>Status</TableCell>
                                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>EDIT</TableCell>
                                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>DELETE</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{row.studentname? row.studentname.name : 'N/A'}</TableCell>

                                    <TableCell align="center">{row.companyname.company}</TableCell>


                                    <TableCell align="center">


                                        <FormControl sx={{  minWidth: 120 }} size="small">

                                            <Select
                                                as={Select}
                                                labelId="demo-simple-select-label "
                                                id="demo-simple-select-label"
                                                name="jobstatus"

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

Interview.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};
