import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Productions from '../Productions/Productions';
import ProductionDetails from '../ProductionDetails/ProductionDetails';
import RehearsalDetails from '../RehearsalDetails/RehearsalDetails';
import Artists from '../Artists/Artists';
import RehearsalMatrix from '../RehearsalMatrix/RehearsalMatrix';

import './App.css';

import { 
  Table, 
  TableHead, 
  TableRow, 
  TableBody,
  TableCell,
  Button, 
  Box,
  FormControl,
  FormGroup,
  TextField,
} from '@mui/material';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    
    <Router>
    
      <div className="rtImage"><img src="RT.png" width="150" height="150"/></div>
      
      <h1 className="appTitle">RehearsalTracker</h1>
      
     
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          {/* <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route> */}

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            // Shows the user a list of all current rehearsals
            exact
            path="/rehearsalMatrix"
          >
            <RehearsalMatrix />
          </ProtectedRoute>

          <ProtectedRoute
            // Shows the user a list of all current productions
            exact
            path="/productions"
          >
            <Productions />
          </ProtectedRoute>

          <ProtectedRoute
            // Shows the user a list of all current productions
            exact
            path="/production/details"
          >
            <ProductionDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // Shows the user a list of all current productions
            exact
            path="/rehearsal/details"
          >
            <RehearsalDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // Shows the user a list of all current productions
            exact
            path="/artists"
          >
            <Artists />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/rehearsalMatrix" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
