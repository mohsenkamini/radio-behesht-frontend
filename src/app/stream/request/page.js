"use client";

import React, { useState } from "react";
import { Box, TextField, Typography, Button, Paper, MenuItem } from "@mui/material";

export default function RequestStreamPage() {
  const [formData, setFormData] = useState({
	program_name: "",
	description: "",
	schedule: "",
	start_date: "",
	episodes: "",
	contanctInformation: "",
  });
  const handleChange = (e) => {
	const { name, value } = e.target;
	setFormData({ ...formData, [name]: value});
  };
  
  const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	const token = localStorage.getItem("accessToken");
	const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/stream/request/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`, 
		},
		body: JSON.stringify(formData),
	});
	if (response.ok) {
	console.log("Form submitted:", formData);
	alert("Your request has been submitted successfully!");
		setFormData({
          	  program_name: "",
          	  description: "",
          	  schedule: "",
          	  start_date: "",
          	  episodes: "",
          	  contact: "",
		});
	} else {
	  const errorData = await response.json();
	  console.error("Error submitting form", errorData);
          alert("An error occurred while submitting your request. Please try again.");
	  }
	} catch (error) {
      console.error("Error submitting form:", error);
      alert("Unable to connect to the server. Please try again later.");
    }
  };

  return(
	<Box
	  sx={{
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		minHeight: "100vh",
		backgroundColor: "background.default",
		color: "text.primary",
		p: 3,
	  }}
	>
	  <Paper
	    elavation={3}
	    sx={{
		maxwidth: 600,
		width: "100%",
		p: 4,
		borderRadius: 2,
		backgroundColor: "background.paper",
		}}
	  >
	  <Typography variant="h4" component="h" sx={{ mb: 3, textAlign: "center" }}>
	    درخواست پخش برنامه
	  </Typography>
	  <form onSubmit={handleSubmit} >
	    <TextField
	  	label="نام برنامه"
	  	name="program_name"
	  	value={formData.program_name}
	  	onChange={handleChange}
	  	fullWidth
	  	required
	  	margin="normal"
	    />
	    <TextField
              label="توضیحات"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              multiline
              rows={4}
              placeholder="توضیحاتی در مورد برنامه ارائه دهید"
            />
	    <TextField
	  	label="برنامه زمان‌بندی"
	  	name="schedule"
	  	value={formData.schedule}
	  	onChange={handleChange}
	  	fullWidth
	  	required
	  	margin="normal"
	  	placeholder="مثلا هر پنج‌شنبه یا روز‌های زوج"
	    />
	    <TextField
            label="تاریخ شروع"
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="تعداد قسمت‌ها"
            name="episodes"
            type="number"
            value={formData.episodes}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            inputProps={{
              min: 1,
            }}
	    placeholder="حداقل تعداد قسمت‌هایی که در نظر دارید"
          />
          <TextField
            label="اطلاعات تماس"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
	    placeholder="اطلاعات تماس برگزار کننده برای هماهنگی در صورت نیاز"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            ارسال درخواست
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
