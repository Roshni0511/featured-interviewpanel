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
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Draggable from 'react-draggable';
import Slide from '@mui/material/Slide';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export default function Students() {

    const [open, setOpen] = React.useState(false);
    const [rows, setrows] = useState([])
    const [comapanyes, setcomapanyes] = useState([]);
    const dataToken = localStorage.getItem('token');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
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
    const [initialValues, setinitialvalues] = useState({
        name: '',
        contact: '',
        experience: '',
        branch: '',
        course: '',
        note: '',
    })
    const [statuses, setStatuses] = useState({});
    const [editid, seteditId] = useState(null)

    const Experince = [
        { value: 'Fresher', label: 'Fresher' },
        { value: '2 year', label: ' 2 year' },
        { value: '5 year', label: '5 year' },
        { value: '10 year', label: '10 year' },

    ]
    const Branch = [
        { value: 'Varachha', label: 'Varachha' },
        { value: 'Dindoli', label: ' Dindoli' },
        { value: 'Adajan', label: 'Adajan' },
        { value: 'Katargam', label: 'Katargam' },
    ]
    const status = [
        { value: 'Reject', label: 'Reject' },
        { value: 'Done', label: 'Done' },
        { value: 'Pending', label: 'Pending' },

    ]
    const education = [
        { value: '12th', label: '12th' },
        { value: 'Bca', label: 'Bca' },
        { value: 'Mca', label: 'Mca' }
    ]
    const [courses, setcourses] = useState([])

    const handlestatus = (event, studentid) => {
        console.log(event, studentid);
        axios.put(`https://backend-interview-test-6hzp.onrender.com/student/${studentid}`, { jobstatus: event }, {
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

    const data = () => {
        axios.get(`https://backend-interview-test-6hzp.onrender.com/student/`, {
            headers: {
                Authorization: dataToken
            }
        })
            .then((res) => {
                setrows(res.data.data)
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

    const handlesubmit = (values, { resetForm }) => {
        if (editid != null) {
            axios.put(`https://backend-interview-test-6hzp.onrender.com/student/` + editid, values, {
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

            axios.post(`https://backend-interview-test-6hzp.onrender.com/student/create`, values, {
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

    const deletdata = async (id) => {
        axios.delete(`https://backend-interview-test-6hzp.onrender.com/student/` + id, {
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


    const Interview = () => {
        console.log("=====",comapanyes);
        
        axios.get(`https://backend-interview-test-6hzp.onrender.com/interview/`, {
            headers: {
                Authorization: dataToken
            }
        })
            .then((res) => {
                setcomapanyes(res.data.data)
            })
            .catch((error) => {
                console.log(error);

            })
    }
    Interview( )
    useEffect(() => {
        data()
        axios.get('https://backend-interview-test-6hzp.onrender.com/course/', {
            headers: {
                Authorization: dataToken
            }
        })
            .then((res) => {
                setcourses(res.data.data)


            })

            .catch((error) => {
                console.log(error);

            })
    }, dataToken)
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


                    <Dialog open={open}>
                        <DialogTitle >Add Student</DialogTitle>

                        <Formik
                            onSubmit={handlesubmit}
                            initialValues={initialValues}
                            enableReinitialize
                        >
                            {({ values, setFieldValue }) => (
                                <Form style={{ display: 'flex', }}>
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

                                        <Box sx={{ width: '100%', padding: '10px' }}>
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& > :not(style)': { m: 1, width: '28ch' },
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
                                                <Field
                                                    as={TextField}
                                                    name="name"
                                                    id="outlined-basic"
                                                    label="Student Name"
                                                    variant="outlined"
                                                />

                                                <Field
                                                    as={TextField}
                                                    name="contact"
                                                    id="outlined-basic"
                                                    label="123-456-789 Name"
                                                    variant="outlined"
                                                />
                                            </Box>

                                            <Box sx={{ display: 'flex' }}>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        '& > :not(style)': { m: 1, width: '18ch' },
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
                                                    <FormControl>
                                                        <InputLabel id="experience-label">Experience</InputLabel>
                                                        <Select
                                                            labelId="experience-label"
                                                            id="experience"
                                                            name="experience"

                                                            onChange={(e) => setFieldValue('experience', e.target.value)}
                                                            label="Experience"
                                                        >
                                                            {Experince.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>



                                                    <FormControl>
                                                        <InputLabel id="branch-label">Branch</InputLabel>
                                                        <Select
                                                            labelId="branch-label"
                                                            id="branch"
                                                            name="branch"

                                                            onChange={(e) => setFieldValue('branch', e.target.value)}
                                                            label="Branch"
                                                        >
                                                            {Branch.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl>
                                                        <InputLabel id="education-label">education</InputLabel>
                                                        <Select
                                                            labelId="education-label"
                                                            id="education"
                                                            name="education"

                                                            onChange={(e) => setFieldValue('education', e.target.value)}
                                                            label="education"
                                                        >
                                                            {education.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Box>
                                            <Box>

                                                <Box
                                                    component="form"
                                                    sx={{
                                                        '& > :not(style)': { m: 1, width: '58ch' },
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
                                                        <InputLabel id="demo-simple-select-label">Courses</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={values.course}
                                                            label="CourseName"
                                                            onChange={(e) => setFieldValue('course', e.target.value)}
                                                        >
                                                            {courses.map((option) => (
                                                                <MenuItem key={option._id} value={option._id}>
                                                                    {option.course}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>


                                                </Box>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        '& .MuiTextField-root': { m: 1, width: '58ch' },
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




                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    padding: '8px 10px', margin: '10px 10px 20px 10px', backgroundColor: '#4caf50', fontSize: '15px', fontWeight: '600',
                                                    '&:hover': {
                                                        backgroundColor: '#388e3c',
                                                    },
                                                }}
                                            >
                                                + Update Student
                                            </Button>
                                        </Box>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Dialog>

                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>NO</TableCell>
                                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>StudentsName</TableCell>
                                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>Contact</TableCell>
                                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>Status</TableCell>

                                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>EDIT</TableCell>
                                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>DELET</TableCell>
                                <TableCell align="center" sx={{ color: '#4caf50', fontWeight: '600', fontSize: '16px' }}>INFO</TableCell>




                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={row.index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.contact}</TableCell>

                                    <TableCell align="center">
                                        <FormControl sx={{ minWidth: 120 }} size="small">

                                            <Select
                                                as={Select}
                                                labelId="demo-simple-select-label "
                                                id="demo-simple-select-label"
                                                name="jobstatus"

                                                value={row.jobstatus}
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

                                    <TableCell align="center" onClick={() => updatedata(row)}>
                                        {<EditNoteIcon />}
                                    </TableCell>

                                    <TableCell align="center" onClick={() => deletdata(row._id)}>
                                        {
                                            <DeleteForeverIcon />
                                        }
                                    </TableCell>
                                    <TableCell align="center" onClick={() => handleClickOpeninfo(row)}>
                                        {
                                            <InfoIcon />
                                        }
                                    </TableCell>


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
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                        >
                            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                
                            </DialogTitle>
                          
                            <DialogContent sx={{ maxWidth: '450px', padding: '10px 24px' }}>
                                {selectedCompany ? (
                                    <>
                                        <DialogContentText sx={{ color: 'black', fontSize: '20px' }}>
                                           {selectedCompany.name}
                                        </DialogContentText>
                                        <hr />
                                        <DialogContentText sx={{ marginTop: '10px',fontSize:'17px',color:'black', }}>
                                           Student information for the company visit :
                                        </DialogContentText>
                                        <DialogContentText sx={{ marginTop: '10px' }}>
                                        <DialogContentText sx={{ marginTop: '10px' }}  >
                                              Company name:{selectedCompany.company}
                                              {comapanyes.map((option) => (
                                                            <MenuItem key={option._id} value={option._id}>
                                                                {option.company}
                                                            </MenuItem>
                                                        ))}
                                           </DialogContentText>
                                           <DialogContentText sx={{ marginTop: '10px' }}>
                                            Reason :
                                        </DialogContentText>
                                        </DialogContentText>
                                        {/* <DialogContentText sx={{ marginTop: '10px' }}>
                                        <DialogContentText sx={{ marginTop: '10px' }}>
                                            company name :
                                           </DialogContentText>
                                           <DialogContentText sx={{ marginTop: '10px' }}>
                                           
                                        </DialogContentText>
                                        </DialogContentText> */}
                                        {/* <DialogContentText sx={{ marginTop: '10px' }}>
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
                                        </DialogContentText> */}
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
Students.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};







