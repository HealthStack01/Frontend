import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthWrapper from '../../components/AuthWrapper';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import PasswordInput from '../../components/inputs/basic/Password';
import Preloader from '../../components/utilities/Preloader';
import { UserContext } from '../../context';
import client from '../../feathers';

function Login() {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const { setUser } = useContext(UserContext);
  const [keepMeIn, setKeepMeIn] = useState(false);
  const [loaderTimer, setLoaderTimer] = useState(true);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
    document.title = 'Health Stack - Login';
    setTimeout(() => setLoaderTimer(false), 1500);
  }, []);

  const onSubmit = ({ email, password }) => {
    client
      .authenticate({
        strategy: 'local',
        email,
        password,
      })
      .then((res) => {
        const user = {
          ...res.user,
          currentEmployee: { ...res.user.employeeData[0] },
        };
        setUser(user);
        if (keepMeIn) localStorage.setItem('user', JSON.stringify(user));
        navigate('/app');
      })
      .catch((err) => {
        toast.error(`Error loggin in User, probable network issues  ${err}`);
      });
  };

  return (
    <>
     {/*  {console.error('hello there')} */}
      {loaderTimer ? (
        <Preloader />
      ) : (
        <AuthWrapper paragraph="Login here as an organization">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field: { ref: _re, ...field } }) => (
                <Input {...field} label="Email" placeholder="Email" />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { ref: _re, ...field } }) => (
                <PasswordInput {...field} />
              )}
            />
            <FormControl
              component="fieldset"
              sx={{ width: '1r00%', mt: 1, mb: 1 }}
            >
              <FormGroup>
                <FormControlLabel
                  label="Keep me Logged in"
                  control={
                    <Checkbox
                      name="keepMeIn"
                      onChange={(_, value) => setKeepMeIn(value)}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
            <Button type="submit" label="Login" fullwidth="true" />
          </form>

          <div className="bottom-center">
            <p>or continue with</p>
            <a href="">
              <i className="bi bi-google" />
            </a>
            <a href="">
              <i className="bi bi-facebook" />
            </a>
            <a href="">
              <i className="bi bi-linkedin" />
            </a>

            <p>
              Want to create organization?
              <Link
                className="nav-link"
                style={{
                  padding: '0',
                  background: 'transparent',
                  color: 'blue',
                  marginLeft: '0.6rem',
                }}
                to="/signup"
              >
                Click here
              </Link>
            </p>
          </div>
        </AuthWrapper>
      )}
    </>
  );
}

export default Login;
