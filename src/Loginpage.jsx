import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4caf50',
        },
        secondary: {
            main: '#ff5722', 
        },
        background: {
            default: '#f0f0f0', 
        },
    },
    typography: {
        h1: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
    },
});

const Loginpage = () => {
    const [initialValues, setInitialValues] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false); 
    const history = useHistory();

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('https://backend-interview-test-6hzp.onrender.com/admin/login/', values);
            const token = response.data.token;
            localStorage.setItem('token', token);
            history.push('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ThemeProvider theme={theme} >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '350px',
                        padding: '32px',
                        borderRadius: '12px',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                        textAlign: 'center',
                    }}
                >
                    <h1 style={{ color: theme.palette.primary.main, marginBottom: '24px' }}>Admin Panel</h1>

                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <Stack spacing={3}>
                                <Field
                                    as={TextField}
                                    id="email"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    autoComplete="current-email"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ borderRadius: '8px' }}
                                />
                                <Field
                                    as={TextField}
                                    id="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'} 
                                    name="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ borderRadius: '8px' }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ marginTop: '16px', borderRadius: '8px', color: '#fff' }}
                                >
                                    Submit
                                </Button>
                            </Stack>
                        </Form>
                    </Formik>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Loginpage;
