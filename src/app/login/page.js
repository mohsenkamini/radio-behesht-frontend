"use client";

// import API from "@utils/api.js";
import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Login = () => {
    const [formData, setFormData] = useState({username: '', password: ''});
    const [error, setError] = useState(null);
    const router = useRouter();
    const handleChange = (e) => {
        setFormData ({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
	setError(null);
        try {
            //const response = await fetch ('http://localhost:8000/api/auth/jwt/create', {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt/create`, {
                method: 'POST',
                headers: { 'content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
		const data = await response.json();
		localStorage.setItem("accessToken", data.access);
		localStorage.setItem("refreshToken", data.refresh);
                alert ('ورود موفق');
		router.push('/');
		return response;

            } else {
		const error = await response.json();
                alert(error?.detail || 'ورود ناموفق. دوباره تلاش کنید');
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
            <Typography variant="h4" >ورود به رادیو بهشت</Typography>
            <form onSubmit={handleSubmit} style={{width: '300px'}}>
                <TextField
                label="نام کاربری"
                name="username"
                fullwidth="true"
                margin="normal"
                value={formData.username}
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
                    ورود
                </Button>
	    </Box>
            </form>
        </Box>
    );
};
export default Login;
