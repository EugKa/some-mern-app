import React, { ChangeEvent, ForwardedRef, forwardRef } from 'react'
import {TextField} from '@mui/material';
import { FieldError } from "react-hook-form";

interface InputProps {
   className?: string;
   error?: FieldError;
   label?: string;
   id?: string;
   value?: string;
   type?: string;
   autoComplete?: string;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void

}

export const CustomInput = forwardRef(({ id ,autoComplete, type, onChange, value, className, label, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
   return (
       <TextField
            value={value}
            onChange={onChange}
            {...props}
            className={className}
            ref={ref}
            error={error ? true : false}
            id={id}
            label={error ? error.message: label}
            type={type}
            autoComplete={autoComplete}
            variant="outlined"
       />
   )
})