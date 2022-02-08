import React from 'react';

import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import PasswordInput from '../../components/inputs/basic/Password';
import { Link } from '../../components/menuitem/style';
import AuthWrapper from '../../helper/AuthWrapper';

function IndividualSignup() {
  return (
    <AuthWrapper paragraph="Login here as an organization">
      <form action="">
        <Input label="First Name" placeholder="Enter your first name" />
        <Input label="Last Name" placeholder="Enter your last name" />
        <Input label="Email address" placeholder="Enter your email" />
        <Input label="Phone number" placeholder="Enter your phone number" />
        <PasswordInput onChange={() => {}} />

        <Button type="submit" label="Signup" fullwidth />
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

        <p style={{ padding: '2rem 0' }}>
          Have an account?
          <Link
            className="nav-link"
            style={{
              padding: '0',
              background: 'transparent',
              color: 'blue',
              marginLeft: '0.6rem',
            }}
            to="/"
          >
            Login
          </Link>
        </p>

        <Link
          className="nav-link"
          style={{
            padding: '16px 32px',
            color: '#333',
            borderRadius: '4px',
            background: '#eeeeee',
            marginLeft: '0.6rem',
            position: 'fixed',
            top: '20px',
            right: '20px',
            textDecoration: 'none',
          }}
          to="/signup"
        >
          Signup as Organization
        </Link>
      </div>
    </AuthWrapper>
  );
}

export default IndividualSignup;
