import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import './LoginForm.css'

import { 
  Button, 
  Box,
  FormControl,
  FormGroup,
  TextField,
} from '@mui/material';
import { fontFamily } from '@mui/system';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (

    <Box className="loginBox">
        <FormControl className="formPanel" onSubmit={login}>
          <h2 className="loginTitle">Login</h2>
          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
            </h3>
          )}
          <FormGroup row={true} className="userName">

              <TextField
                className="usernameInput"
                variant="outlined"
                sx={{
                  width: '150px',
                  marginBottom: '10px'
                }}
                placeholder="Username"
                type="text"
                name="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              >
              </TextField>

          </FormGroup>
          <FormGroup className="password">
              <TextField
                className="passwordInput"
                variant="outlined"
                sx={{
                  width: '150px',
                  height: '10px',
                  marginTop: '10px'
                }}
                placeholder="Password"
                type="password"
                name="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              >
              </TextField>

              <Button
                  variant="contained"
                  sx={{
                    background: '#191970',
                    marginTop: '80px',
                    marginBottom: '50px',
                    fontFamily: 'Josefin Slab'
                  }}
                  className="btn" 
                  type="submit" 
                  name="submit" 
                  value="Log In"
                  onClick={login}
              >
                Log In
              </Button>

          </FormGroup>
          {/* <div>
            <input className="btn" type="submit" name="submit" value="Log In" />
          </div> */}
        </FormControl>
    </Box>
    
  );
}

export default LoginForm;
