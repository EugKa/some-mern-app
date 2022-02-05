import React, { ChangeEvent, ForwardedRef, forwardRef } from 'react'
import {TextField} from '@mui/material';
import { FieldError } from "react-hook-form";

interface InputProps {
   className?: string;
   error?: FieldError;
   variant?: string;
   label?: string;
   id?: string;
   defaultValue?: string;
   helperText?: string;
   value?: string;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void

}

export const CustomInput = forwardRef(({ onChange, value, className, label, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
   return (
       <TextField
           value={value}
           onChange={onChange}
           {...props}
           className={className}
           ref={ref}
           error={error ? true : false}
           id={error ? "outlined-error-helper-text" : "outlined-basic"}
           label={error ? error.message: label}
           
           variant="outlined"
       />
   )
})