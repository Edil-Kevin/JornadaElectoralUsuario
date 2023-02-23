import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

export const PasswordTextField = (props) =>  {
  const { value, onChange, error, helperText, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      {...rest}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility sx={{color: 'white'}}/> : <VisibilityOff sx={{color: 'white'}}/>}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}

