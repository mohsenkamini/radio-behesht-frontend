"use client";

// import API from "@utils/api.js";
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Signup = () => {
    const [formData, setFormData] = useState({username: '', email: '', password: ''});

    const handleChange = (e) => {
        setFormData ({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            /*const response = await API.post('/auth/users/', formData);
            */
	    // const response = await fetch ('http://localhost:8000/api/auth/users/', {
	    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/`, {
                method: 'POST',
                headers: { 'content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                alert ('ثبتن نام موفق');
            } else {
                alert('ثبت نام ناموفق. دوباره تلاش کنید');
            }
        } catch (error) {
            console.error('ثبت نام ناموفق. دوباره تلاش کنید', error)
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                gap: 2,
            }}
            >
            <Typography variant="h4" >ثبت نام در رادیو بهشت</Typography>
            <form onSubmit={handleSubmit} style= {{width: '300px'}}>
                <TextField
                label="نام کاربری"
                name="username"
                fullwidth="true"
                margin="normal"
                value={formData.username}
                onChange={handleChange}
                />
                <TextField
                label="ایمیل"
                name="email"
                fullwidth="true"
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                />
                <TextField
                label="رمز عبور"
                name="password"
                type="password"
                fullwidth="true"
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                />
	    <Box witdth="100">
                <Button type="submit" variant="contained" fullwidth="true">
                    ثبت نام
                </Button>
	    </Box>
            </form>
        </Box>
    );
};
export default Signup;
