
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Design from './Design';
import axios from 'axios';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'start',
    color:'#000000ba'
  }));
  
  
const Dashboard = () => {
  const[todaycount,settodaycount] = useState([0])
  const[duecount,setduecount]= useState([0])
  const[company, setcompany] = useState([0])
  const[pending,setpending]=useState([0])
 const[count, setCount] =useState([0])
 const[totalstud,settotalstud]= useState([0])
  const dataToken = localStorage.getItem('token')

  const Todayinterviewcount = () => {
    axios.get(`https://backend-interview-test-6hzp.onrender.com/interview/followcount`,{
      headers: {
        Authorization: dataToken
      }
    })
    .then((res) => {
      settodaycount(res.data.data)
    })
    .catch((error) => {
      console.log(error);
      
    })
  }
  
  
  const dueinterviewcount = () => {
    axios.get(`https://backend-interview-test-6hzp.onrender.com/interview/duecount`,{
      headers: {
        Authorization: dataToken
      }
    })
    .then((res) => {
      setduecount(res.data.data)
    })
    .catch((error) => {
      console.log(error);
      
    })
  }
  
  const companycount = () => {
    console.log("====.>",company);
    
    axios.get(`https://backend-interview-test-6hzp.onrender.com/company/count`,{
      headers: {
        Authorization: dataToken
      }
    })
    .then((res) => {
      setcompany(res.data.data)
    })
    .catch((error) => {
      console.log(error);
      
    })
  }



  const studentpending = () => {
    axios.get(`https://backend-interview-test-6hzp.onrender.com/student/pendingcount`,{
      headers: {
        Authorization: dataToken
      }
    })
    .then((res) => {
      setpending(res.data.data)
    })
    .catch((error) => {
      console.log(error);
      
    })
  }
  
  const studentdata = () => {
    console.log("====>", );
    
    axios.get(`https://backend-interview-test-6hzp.onrender.com/student/donecount`,{
      headers: {
        Authorization: dataToken
      }
    })
    .then((res) => {
      setCount(res.data.data)
    })
    .catch((error) => {
      console.log(error);
      
    })
  }
  
  
  const totalstudent = () => {
    axios.get(`https://backend-interview-test-6hzp.onrender.com/student/count`,{
      headers: {
        Authorization: dataToken
      }
    })
    .then((res) => {
      settotalstud(res.data.data)
    })
    .catch((error) => {
      console.log(error);
      
    })
  }
  
  useEffect (() => {
    Todayinterviewcount()
    dueinterviewcount()
    companycount()
    studentpending()
    studentdata()
    totalstudent()
  },[])
  
  
  return (
    <>
    <Box sx={{ backgroundColor: '#D6EFD8'}}>
     <Design >
    
     <Box sx={{ flexGrow: 1,  }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

            <Grid xs={2} sm={4} md={4} >
              <Item >
  
                <h2 style={{fontSize:'40px', margin:'0px 10px'}}>{todaycount}</h2>
                <h2 style={{margin:'10px'}}> Today Interview</h2>
              </Item>
            </Grid>
            <Grid xs={2} sm={4} md={4} >
              <Item>
                
                <h2 style={{fontSize:'40px', margin:'0px 10px'}}>{duecount}</h2>
                <h2 style={{margin:'10px'}}>Due Interview</h2>
              </Item>
            </Grid>
            <Grid xs={2} sm={4} md={4}>
              <Item>
              
                <h2 style={{fontSize:'40px', margin:'0px 10px'}}>{company}</h2>
                <h2 style={{margin:'10px'}}>Total Company</h2>
              </Item>
            </Grid>


            <Grid xs={2} sm={4} md={4} >
              <Item >
                
                <h2 style={{fontSize:'40px', margin:'0px 10px'}}>{pending}</h2>
                <h2 style={{margin:'10px'}}>Student Pending</h2>
              </Item>
            </Grid>
            <Grid xs={2} sm={4} md={4} >
              <Item >
                <h2 style={{fontSize:'40px', margin:'0px 10px'}}>{count}</h2>
                <h2 style={{margin:'10px'}}>Student Complete</h2>
              </Item>
            </Grid>
            <Grid xs={2} sm={4} md={4} >
              <Item >
               <h2 style={{fontSize:'40px', margin:'0px 10px'}}>{totalstud}</h2>
          
                <h2 style={{margin:'10px'}}>Total Student</h2>
              </Item>
            </Grid>
          </Grid>
        </Box>

     </Design>
     </Box>
    </>
  )
}

export default Dashboard

