import React, { useState } from 'react';

import { InputBox, InputField, InputLabel } from './Input/styles';

interface PasswordInputProps {
  label?: string;
  name?: string;
  // password?: string;
  // showPassword?: boolean;
  onChange: (_value) => void;
  errors?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label = 'Password',
  name,
  onChange,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <InputBox>
        <InputField
          className="form__input"
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          name={name}
        />
        <InputLabel className="form__label" htmlFor={label}>
          {label}
        </InputLabel>
        <span onClick={handleClickShowPassword}>
          {showPassword ? (
            <i className="bi bi-eye-slash-fill"></i>
          ) : (
            <i className={' bi bi-eye-fill'}></i>
          )}
        </span>
      </InputBox>

      {errors && <p>e{errors}</p>}
    </div>
    // <div>
    //   <FormControl sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined">
    //     <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
    //     <OutlinedInput
    //       id="outlined-adornment-password"
    //       placeholder="Enter your password"
    //       type={showPassword ? 'text' : 'password'}
    //       sx={{ background: 'white' }}
    //       endAdornment={
    //         <InputAdornment position="end">
    //           <IconButton
    //             aria-label="toggle password visibility"
    //             onClick={handleClickShowPassword}
    //             onMouseDown={handleMouseDownPassword}
    //             edge="end"
    //           >
    //             {showPassword ? <VisibilityOff /> : <Visibility />}
    //           </IconButton>
    //         </InputAdornment>
    //       }
    //       {...props}
    //     />
    //   </FormControl>
    // </div>
  );
};

export default PasswordInput;
