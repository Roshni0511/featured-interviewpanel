import './App.css';
import Dashboard from './Dashboard';
import Loginpage from './Loginpage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Todayinterview from './Todayinterview';
import DueInterview from './DueInterview';
import Courses from './Courses';
import Companyy from './Companyy';
import Students from './Students';
import Interview from './Interview';


function App() {
  return (
    <>
      <Router>
        <Switch>
        <Route path="/interview">
       <Interview></Interview>
          </Route>
        <Route path="/student">
         <Students></Students>
          </Route>
        <Route path="/company">
         <Companyy></Companyy>
          </Route>
        <Route path="/courses">
          <Courses></Courses>
          </Route>
        <Route path="/dueinterview">
            <DueInterview></DueInterview>
          </Route>
        <Route path="/todayinterview">
            <Todayinterview></Todayinterview>
          </Route>
          <Route path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/">
            <Loginpage></Loginpage>
          </Route>
        </Switch>
      </Router> 
        </>
  );
}

export default App;

