import React, { useState, Suspense, lazy, memo } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
  CircularProgress,
  Box,
  Fade,
  GlobalStyles
} from "@mui/material";
import { ColorModeContext, useMode, tokens } from "./theme";

// Lazy load scene components
const LazyDashboard = lazy(() => import("./scenes/dashboard"));
const LazyTrading = lazy(() => import("./scenes/trading"));
const LazyTeam = lazy(() => import("./scenes/team"));
const LazyInvoices = lazy(() => import("./scenes/invoices"));
const LazyContacts = lazy(() => import("./scenes/contacts"));
const LazyBar = lazy(() => import("./scenes/bar"));
const LazyForm = lazy(() => import("./scenes/form"));
const LazyLine = lazy(() => import("./scenes/line"));
const LazyPie = lazy(() => import("./scenes/pie"));
const LazyFAQ = lazy(() => import("./scenes/faq"));
const LazyCalendar = lazy(() => import("./scenes/calendar/calendar"));
const LazyGeography = lazy(() => import("./scenes/geography"));

// Memoized versions of lazy loaded components
const Dashboard = memo(() => <LazyDashboard />);
const Trading = memo(() => <LazyTrading />);
const Team = memo(() => <LazyTeam />);
const Invoices = memo(() => <LazyInvoices />);
const Contacts = memo(() => <LazyContacts />);
const Bar = memo(() => <LazyBar />);
const Form = memo(() => <LazyForm />);
const Line = memo(() => <LazyLine />);
const Pie = memo(() => <LazyPie />);
const FAQ = memo(() => <LazyFAQ />);
const Calendar = memo(() => <LazyCalendar />);
const Geography = memo(() => <LazyGeography />);

// Fallback loading component
const RouteFallback = () => (
  <Fade in={true} timeout={300}>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  </Fade>
);

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const colors = tokens(theme.palette.mode);

  const globalStyles = (
    <GlobalStyles
      styles={{
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0
        },
        "html, body, #root, .app": {
          height: "100%",
          width: "100%",
          fontFamily: "Inter, sans-serif",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            width: "6px"
          },
          "&::-webkit-scrollbar-track": {
            background:
              theme.palette.mode === "dark"
                ? colors.primary[500]
                : colors.primary[400]
          },
          "&::-webkit-scrollbar-thumb": {
            background:
              theme.palette.mode === "dark"
                ? colors.primary[300]
                : colors.primary[600],
            borderRadius: "10px"
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background:
              theme.palette.mode === "dark"
                ? colors.blueAccent[600]
                : colors.blueAccent[400]
          }
        },
        a: {
          textDecoration: "none",
          color: "inherit"
        },
        ".MuiButtonBase-root": {
          borderRadius: "8px",
          transition: "all 0.2s ease-in-out !important"
        },
        ".app": {
          display: "flex",
          position: "relative"
        },
        ".content": {
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "all 0.3s",
          height: "100vh",
          backgroundColor:
            theme.palette.mode === "dark" ? colors.primary[500] : "#ffffff"
        },
        ".content-container": {
          flexGrow: 1,
          padding: "20px",
          overflowY: "auto"
        },
        ".MuiCard-root": {
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)"
          }
        }
      }}
    />
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {globalStyles}
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <div className="content-container">
                <Suspense fallback={<RouteFallback />}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/trading" element={<Trading />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/geography" element={<Geography />} />
                  </Routes>
                </Suspense>
              </div>
            </main>
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
