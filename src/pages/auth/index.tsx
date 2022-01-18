import React, { useState, useEffect } from 'react';
import Button from '../../components/buttons/Button';
import CheckboxInput from '../../components/inputs/basic/Checkbox';
import Input from '../../components/inputs/basic/Input';
import PasswordInput from '../../components/inputs/basic/Password';
import { useNavigate } from 'react-router-dom';
import AuthWrapper from '../../helper/AuthWrapper';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };
  let navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
    document.title = 'Health Stack - Login';
  }, []);

  const onSubmit = () => {
    navigate('/app');
  };

  console.log(isOpen, onClose);

  return (
    <>
      <AuthWrapper paragraph='Login here as an organization'>
        <form action='' onSubmit={() => onSubmit()}>
          <Input label='Email' placeholder='Enter your email' />
          <PasswordInput />
          <CheckboxInput label='Keep me Logged in' />
          <Button type='submit' label='Login' fullwidth />
        </form>

        <div className='bottom-center'>
          <p>or continue with</p>
          <a href='www.google.com'>
            <i className='bi bi-google'></i>
          </a>
          <a href='www.google.com'>
            <i className='bi bi-facebook'></i>
          </a>
          <a href='www.google.com'>
            <i className='bi bi-linkedin'></i>
          </a>

          <p>
            Want to create organization?
            <Link
              className='nav-link'
              style={{
                padding: '0',
                background: 'transparent',
                color: 'blue',
                marginLeft: '0.6rem',
              }}
              to='/signup'
            >
              Click here
            </Link>
          </p>
        </div>
      </AuthWrapper>
    </>
  );
};

export default Login;
