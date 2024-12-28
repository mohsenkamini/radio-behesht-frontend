"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { PlayArrow, Pause, SkipNext, ThumbUp } from "@mui/icons-material";

export default function Home() {
  const [stations, setStations] = useState([]);
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/radio/stations`);
        if (!response.ok) throw new Error("Failed to fetch stations");
        const data = await response.json();
        setStations(data);
        if (data.length > 0) {
          setCurrentStation(data[0]); // Set the first station as the default
        }
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
      if (!response.ok) throw new Error("Failed to fetch song");
      const song = await response.json();
      setCurrentSong(song);

      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(`${process.env.NEXT_PUBLIC_API_URL}${song.url}`);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);

      newAudio.addEventListener("ended", () => setIsPlaying(false));
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  const handlePause = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = async () => {
    if (!currentStation) return;
    await handlePlay(currentStation);
  };

  const handleLike = async () => {
    if (!currentSong) return;
    try {
      const now = new Date().toISOString();
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/radio/stations/${currentStation.id}/like/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timestamp: now,
        }),
      });
      alert("Liked the song!");
    } catch (error) {
      console.error("Error liking the song:", error);
    }
  };

  return (
    <Box sx={{ padding: 2, textAlign: "center" }}>
      <Typography variant="h1" gutterBottom>
        رادیو بهشت
      </Typography>

      {/* Navigation Links */}
      <Box sx={{ mb: 4 }}>
        <Button variant="contained" href="/signup" sx={{ mx: 1 }}>
          ثبت‌نام
        </Button>
        <Button variant="outlined" href="/login" sx={{ mx: 1 }}>
          ورود
        </Button>
      </Box>

      {/* Main Layout */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 4 }}>
        {/* Station List */}
        <Box
          sx={{
            width: 300,
            bgcolor: "background.paper",
            border: "1px solid #ddd",
            borderRadius: 1,
            textAlign: "center",
            padding: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            لیست ایستگاه‌ها
          </Typography>
          <List>
            {stations.map((station) => (
              <ListItem
                key={station.id}
                button
                selected={currentStation?.id === station.id}
                onClick={() => handlePlay(station)}
                sx={{
                  bgcolor: currentStation?.id === station.id ? "primary.main" : "inherit",
                  color: currentStation?.id === station.id ? "white" : "inherit",
                }}
              >
                <ListItemText primary={station.name} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Music Player */}
        <Box
          sx={{
            width: 300,
            bgcolor: "background.paper",
            border: "1px solid #ddd",
            borderRadius: 1,
            textAlign: "center",
            padding: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {currentStation ? currentStation.name : "ایستگاه انتخاب نشده"}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {currentSong ? `در حال پخش: ${currentSong.title}` : "موسیقی در حال پخش نیست"}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
            <IconButton onClick={() => handlePlay(currentStation)} disabled={!currentStation}>
              <PlayArrow />
            </IconButton>
            <IconButton onClick={handlePause} disabled={!isPlaying}>
              <Pause />
            </IconButton>
            <IconButton onClick={handleNext} disabled={!currentStation}>
              <SkipNext />
            </IconButton>
            <IconButton onClick={handleLike} disabled={!currentSong}>
              <ThumbUp />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

