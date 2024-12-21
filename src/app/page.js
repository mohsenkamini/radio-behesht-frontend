"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { PlayArrow, Pause SkipNext, SkipPrevious, ThumbUp } from "@mui/icons-material";
import Link from 'next/link';



export default function Home() {
  const [stations, setStations] = useState([]);
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [audio, setAudio] = useState(null);
  useEffect(() => {
	  const fetchStations = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL/api/radio/stations}`);
			if (!response.ok) throw new Error("Failed to fetch stations");
			const data = await response.json();
			setStations(data);
		} catch (error) {
			console.error("Error fetching stations:", error);
		}
	  };

	  fetchStations();
  }, []);
  const handlePlay = async (station) => {
	if (currentStation !== station) {
	  setCurrentStation(station);
	}
 	try {
		const response = await fetch(
		  `${process.env.NEXT_PUBLIC_API_URL}/api/radio/stations/${station.id}/play/`
		);
		if (!response.ok) throw new Error ("Failed to fetch song");
		const song = await respose.json();
		setCurrentSong(song);

		if (audio) {
		  audio.pause();
		}
		const newAudio = new Audio(`${process.env.NEXT_PUBLIC_API_URL}${song.url}`);
		newAudio.play();
		setAudio(newAudio);
		setIsPlaying(True);

		newAudio.addEventListener("ended", () => setIsPlaying(false));
	} catch (error) {
	  console.error("Error playing song:", error)
	} 
  };

  return (
    <Box>
      <h1>رادیو بهشت</h1>
	  <a href='/signup'> ثبت‌نام </a>
	  <br></br>
	  <a href='/login'> ورود </a>
    </Box>
  );
}
