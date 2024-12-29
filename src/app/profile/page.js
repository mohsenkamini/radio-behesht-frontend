"use client";

import {useEffect, useState} from "react";
import {Box, Typography, Container, Paper, CircularProgress} from "@mui/material";
import {createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";


//const theme = createTheme ({
//
//	direction: 'rtl',
//	typography: {
//		fontFamily: []
//	},
//});
//
//
export default function ProfilePage() {
	const [user, setUser ] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect( () => {
		const fetchUserProfile = async () => {
			const token = localStorage.getItem("accessToken");
			if (!token) {
				console.error("No Token Found");
				setLoading(false);
				return;
			}
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("failed to fetch profile");
				}
				const data = await response.json();
				setUser(data);
			} catch (error) {
				console.error("Error fetching user profile", error);
			}
			setLoading(false);
		};

		fetchUserProfile();
	}, []);
	if (loading) {
		return (
			<Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
				<CircularProgress />
			</Container>
		);
	}
	if (!user) {
		return (
			<Container maxWidth="xs">
			  <Box sx={{textAlign: 'center', mt: 2}}>
			    <Typography variant="h5" color="error">
				مشکلی در بارگذاری پروفایل پیش آمد
			    </Typography>
			  </Box>
			</Container>
		);
	}
	return (
		<Container>
		  <Box>
		    <Paper>
			<Typography variant="h4" gutterBottom>
				پروفایل کاربری
			</Typography>

			<Typography variant="h6" sx={{mt: 2}}>
				نام کاربری: {user.username}
			</Typography>
			<Typography variant="h6" sx={{mt: 1}}>
				ایمیل: {user.email || 'اطلاعاتی وارد نشده است.'}
			</Typography>
			<Typography variant="h6" sx={{mt: 1}}>
				بیوگرافی: {user.bio || 'اطلاعاتی وارد نشده است.'}
			</Typography>
			<Typography variant="h6" sx={{mt: 1}}>
				تاریخ تولد: {user.birthday || 'اطلاعاتی وارد نشده است.'}
			</Typography>
			{user.profilePicture && (
				<Box sx={{ mt: 3, textAlign: 'center' }}>
					<img
					src={`${process.env.NEXT_PUBLIC_API_URL}${user.profilePicture}`}
					alt="Profile"
					width={200}
					height={200}
					style={{ borderRadius: '50%'  }}
					/>
				</Box>
			)}
		    </Paper>
		  </Box>
		</Container>
	);
}
