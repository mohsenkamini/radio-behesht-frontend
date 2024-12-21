"use client";

import {useEffect, useState} from "react";
import {Box, Typography, Container, Paper, CircularProgress} from "@mui/material";
import {createTheme, ThemeProvider } from "@mui/material/styles";
import { cssBaseline } from "@mui/material";


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
		} 
			try {
				const response = await fetch(`${process.env.NET_PUBLIC_API_URL}/api/users/`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("failed to fetch profile");
				}
				const data = await 
			}
	}
	)
}
