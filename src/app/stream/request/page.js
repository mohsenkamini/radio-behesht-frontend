"use client";

import React, { useState } from "react";
import { Box, TextField, Typography, Button, Paper, MenuItem } from "@mui/material";

export default function RequestStreamPage() {
  const [formData, setFormData] = useState({
	programName: "",
	description: "",
	schedule: "",
	startDate: "",
	episodes: "",
	contanctInformation: "",
  });
  const handleChange = (e) => {
	const { name, value } = e.target;
	setFormData({ ...formData, [name]: value});
  };
  
  const handleSubmit = (e) => {
	e.preventDefault();
	console.log("Form submitted:", formData);
	alert("Your request has been submitted successfully!");
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
	  	name="programName"
	  	value={formData.programName}
	  	onChange={handleChange}
	  	fullWidth
	  	required
	  	margin="normal"
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
            name="startDate"
            type="date"
            value={formData.startDate}
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
          />
          <TextField
            label="اطلاعات تماس"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
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
