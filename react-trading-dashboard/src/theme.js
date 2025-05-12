import { createContext, useState, useMemo } from "react";
import { createTheme, adaptV4Theme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#f0f0f0",
          200: "#d9d9d9",
          300: "#b3b3b3",
          400: "#8c8c8c",
          500: "#666666",
          600: "#4d4d4d",
          700: "#333333",
          800: "#1a1a1a",
          900: "#0a0a0a"
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1A2035", // Slightly bluer dark background
          500: "#131828", // Deeper blue-black
          600: "#0e111c",
          700: "#090c13",
          800: "#050609",
          900: "#020304"
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#82e0c9",
          400: "#3DD598", // Brighter mint green
          500: "#38C695", // More vibrant green
          600: "#2aa67c",
          700: "#1f7d5c",
          800: "#14533d",
          900: "#0a2a1e"
        },
        redAccent: {
          100: "#fee4e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#FF6B6B", // Brighter coral red
          500: "#F03E3E", // More vibrant red
          600: "#c23333",
          700: "#922626",
          800: "#611a1a",
          900: "#310d0d"
        },
        blueAccent: {
          100: "#e6f1fe",
          200: "#cce3fd",
          300: "#99c7fa",
          400: "#3B82F6", // Brighter blue
          500: "#2563EB", // More vibrant blue
          600: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#172554"
        },
        purpleAccent: {
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#A855F7", // Bright purple
          500: "#8B5CF6", // Vibrant purple
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95"
        },
        orangeAccent: {
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#FB923C", // Bright orange
          500: "#F97316", // Vibrant orange
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12"
        }
      }
    : {
        grey: {
          100: "#0a0a0a",
          200: "#1a1a1a",
          300: "#333333",
          400: "#4d4d4d",
          500: "#666666",
          600: "#8c8c8c",
          700: "#b3b3b3",
          800: "#d9d9d9",
          900: "#f0f0f0"
        },
        primary: {
          100: "#020304",
          200: "#050609",
          300: "#090c13",
          400: "#f8f9fa", // Light background
          500: "#eceff4", // Slightly blue-tinted white
          600: "#E3E8F0",
          700: "#D0D7E5",
          800: "#c6cee1",
          900: "#bcc6dd"
        },
        greenAccent: {
          100: "#0a2a1e",
          200: "#14533d",
          300: "#1f7d5c",
          400: "#2aa67c",
          500: "#38C695", // More vibrant green
          600: "#3DD598", // Brighter mint green
          700: "#82e0c9",
          800: "#b7ebde",
          900: "#dbf5ee"
        },
        redAccent: {
          100: "#310d0d",
          200: "#611a1a",
          300: "#922626",
          400: "#c23333",
          500: "#F03E3E", // More vibrant red
          600: "#FF6B6B", // Brighter coral red
          700: "#fca5a5",
          800: "#fecaca",
          900: "#fee4e2"
        },
        blueAccent: {
          100: "#172554",
          200: "#1e3a8a",
          300: "#1e40af",
          400: "#1d4ed8",
          500: "#2563EB", // More vibrant blue
          600: "#3B82F6", // Brighter blue
          700: "#99c7fa",
          800: "#cce3fd",
          900: "#e6f1fe"
        },
        purpleAccent: {
          100: "#4c1d95",
          200: "#5b21b6",
          300: "#6d28d9",
          400: "#7c3aed",
          500: "#8B5CF6", // Vibrant purple
          600: "#A855F7", // Bright purple
          700: "#d8b4fe",
          800: "#e9d5ff",
          900: "#f3e8ff"
        },
        orangeAccent: {
          100: "#7c2d12",
          200: "#9a3412",
          300: "#c2410c",
          400: "#ea580c",
          500: "#F97316", // Vibrant orange
          600: "#FB923C", // Bright orange
          700: "#fdba74",
          800: "#fed7aa",
          900: "#ffedd5"
        }
      })
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500]
            },
            secondary: {
              main: colors.greenAccent[500]
            },
            red: {
              main: colors.redAccent[500]
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100]
            },
            background: {
              default: colors.primary[500],
              paper: colors.primary[400]
            },
            purple: {
              main: colors.purpleAccent[500]
            },
            orange: {
              main: colors.orangeAccent[500]
            }
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100]
            },
            secondary: {
              main: colors.greenAccent[500]
            },
            red: {
              main: colors.redAccent[500]
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100]
            },
            background: {
              default: "#ffffff",
              paper: colors.primary[400]
            },
            purple: {
              main: colors.purpleAccent[500]
            },
            orange: {
              main: colors.orangeAccent[500]
            }
          })
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 600
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 600
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: 600
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 600
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 600
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 600
      }
    },
    shadows: [
      "none",
      "0px 2px 4px rgba(0, 0, 0, 0.1)",
      "0px 4px 6px rgba(0, 0, 0, 0.12)",
      "0px 5px 15px rgba(0, 0, 0, 0.15)",
      "0px 7px 25px rgba(0, 0, 0, 0.18)",
      "0px 10px 35px rgba(0, 0, 0, 0.2)",
      ...Array(19).fill("none")
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            padding: "8px 16px"
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow:
              mode === "dark"
                ? "0px 4px 20px rgba(0, 0, 0, 0.25)"
                : "0px 4px 20px rgba(0, 0, 0, 0.05)"
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: 8
          }
        }
      }
    }
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {}
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light"))
    }),
    []
  );

  const theme = useMemo(
    () => createTheme(adaptV4Theme(themeSettings(mode))),
    [mode]
  );
  return [theme, colorMode];
};
