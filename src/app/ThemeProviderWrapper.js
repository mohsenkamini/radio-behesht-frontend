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
  direction: "rtl",
  typography: {
    fontFamily: "'Vazirmatn', 'Roboto', 'Arial', sans-serif",
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
