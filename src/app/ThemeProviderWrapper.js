"use client";
//import 'vazirmatn/dist/font.css'; // Adjust the path based on the package structure
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cacheRtl = createCache({
  key: "mui",
});

const rtlTheme = createTheme({
  //palette: {
  //      mode: "dark",
  //      background: {
  //        default: "#121212",
  //        paper: "1e1e1e",
  //      },
  //      text: {
  //        primary: "#ffffff",
  //        secondary: "b3b3b3",
  //      },
  //      primary: {
  //        main: "#007BFF",
  //      },
  //},
  direction: "rtl",
  typography: {
    fontFamily: "'Vazirmatn', 'Roboto', 'Arial', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded buttons
          padding: '8px 16px',
          boxShadow: 'none', // Remove button shadows
          '&:hover': {
            backgroundColor: '#0056b3', // Darker blue on hover
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          //border: '1px solid #3C3C3C', // Border for station list
          borderRadius: '8px',
          padding: '8px',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // White text
          '&.Mui-selected': {
            backgroundColor: '#007BFF', // Blue background for selected station
            color: '#FFFFFF', // White text for selected station
            '&:hover': {
              backgroundColor: '#0056b3', // Darker blue on hover for selected
            },
          },
          '&:hover': {
            backgroundColor: '#3C3C3C', // Slight hover effect for list items
          },
        },
      },
    },
  },
});

export default function ThemeProviderWrapper({ children }) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={rtlTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
