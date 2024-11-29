"use client";

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
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap"
                rel="stylesheet"
            />
        </head>
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
