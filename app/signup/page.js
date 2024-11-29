"use client";
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Signup = () => {
    const [formData, setFormData] = useState({username: '', password: ''});

    const handleChange = (e) => {
        setFormData ({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch ('/api/auth/users/', {
                method: 'POST',
                headers: { 'content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert ('ورود موفق');
            } else {
                alert('ورود ناموفق. دوباره تلاش کنید');
            }
        } catch (error) {
            console.error('ورود ناموفق. دوباره تلاش کنید', error)
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
                name="نام کاربری"
                fullwidth="true"
                margin="normal"
                value={formData.username}
                onChange={handleChange}
                />
                <TextField
                label="رمز عبور"
                name="رمز عبور"
                fullwidth="true"
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                />
                <Button type="submit" variant="contained" fullwidth="true">
                    ثبت نام
                </Button>
            </form>
        </Box>
    );
};
export default Signup;