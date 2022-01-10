import React from 'react';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import { Link } from '../../components/menuitem/style';
import AuthWrapper from '../../helper/AuthWrapper';
import PasswordInput from '../../components/inputs/basic/Password';

const IndividualSignup = () => {
  return (
    <>
      <AuthWrapper paragraph='Login here as an organization'>
        <form action=''>
          <Input label='First Name' placeholder='Enter your first name' />
          <Input label='Last Name' placeholder='Enter your last name' />
          <Input label='Email address' placeholder='Enter your email' />
          <Input label='Phone number' placeholder='Enter your phone number' />
          <PasswordInput />

          <Button type='submit' label='Signup' fullwidth />
        </form>

        <div className='bottom-center'>
          <p>or continue with</p>
          <a href=''>
            <i className='bi bi-google'></i>
          </a>
          <a href=''>
            <i className='bi bi-facebook'></i>
          </a>
          <a href=''>
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

export default IndividualSignup;
