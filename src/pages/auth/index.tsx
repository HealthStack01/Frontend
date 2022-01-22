import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/buttons/Button';
import CheckboxInput from '../../components/inputs/basic/Checkbox';
import Input from '../../components/inputs/basic/Input';
import PasswordInput from '../../components/inputs/basic/Password';
import AuthWrapper from '../../helper/AuthWrapper';

function Login() {
  const navigate = useNavigate();
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

  return (
    <AuthWrapper paragraph="Login here as an organization">
      <form action="" onSubmit={() => onSubmit()}>
        <Input label="Email" placeholder="Enter your email" />
        <PasswordInput />
        <CheckboxInput label="Keep me Logged in" />
        <Button type="submit" label="Login" fullwidth />
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
  );
}

export default Login;
