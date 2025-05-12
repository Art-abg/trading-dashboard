import {
  Box,
  IconButton,
  useTheme,
  InputBase,
  useMediaQuery,
  Badge,
  Tooltip,
  Avatar,
  Button
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      p={2}
      sx={{
        borderBottom: `1px solid ${colors.primary[300]}`,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 4px 10px rgba(0, 0, 0, 0.15)"
            : "0px 4px 10px rgba(0, 0, 0, 0.05)",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        backgroundColor:
          theme.palette.mode === "dark"
            ? `${colors.primary[400]}e6` // Adding transparency
            : `${colors.primary[400]}e6`,
        transition: "all 0.3s ease"
      }}
    >
      {!isMobile && (
        <Box
          display="flex"
          backgroundColor={
            colors.primary[theme.palette.mode === "dark" ? 500 : 600]
          }
          borderRadius="10px"
          flex={1}
          mr={2}
          sx={{
            border: `1px solid ${
              colors.primary[theme.palette.mode === "dark" ? 400 : 700]
            }`,
            overflow: "hidden",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)"
            }
          }}
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              color: colors.grey[100],
              "& .MuiInputBase-input::placeholder": {
                color: colors.grey[400],
                opacity: 0.8
              }
            }}
            placeholder="Search"
          />
          <IconButton type="button" sx={{ p: 1 }} size="large">
            <SearchIcon />
          </IconButton>
        </Box>
      )}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        flexShrink={0}
      >
        <Tooltip
          title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
        >
          <IconButton
            onClick={colorMode.toggleColorMode}
            size={isMobile ? "small" : "large"}
            sx={{
              mr: 1,
              color:
                theme.palette.mode === "dark"
                  ? colors.blueAccent[400]
                  : colors.blueAccent[600],
              backgroundColor:
                theme.palette.mode === "dark"
                  ? colors.primary[500]
                  : colors.primary[600],
              borderRadius: "8px",
              padding: "8px",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? colors.primary[400]
                    : colors.primary[700]
              }
            }}
          >
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton
            size={isMobile ? "small" : "large"}
            sx={{
              mr: 1,
              color: colors.orangeAccent[500],
              backgroundColor:
                theme.palette.mode === "dark"
                  ? colors.primary[500]
                  : colors.primary[600],
              borderRadius: "8px",
              padding: "8px",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? colors.primary[400]
                    : colors.primary[700]
              }
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Settings">
          <IconButton
            size={isMobile ? "small" : "large"}
            sx={{
              mr: 1,
              color: colors.greenAccent[500],
              backgroundColor:
                theme.palette.mode === "dark"
                  ? colors.primary[500]
                  : colors.primary[600],
              borderRadius: "8px",
              padding: "8px",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? colors.primary[400]
                    : colors.primary[700]
              }
            }}
          >
            <SettingsOutlinedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Profile">
          <IconButton
            size={isMobile ? "small" : "large"}
            sx={{
              color: colors.purpleAccent[500],
              backgroundColor:
                theme.palette.mode === "dark"
                  ? colors.primary[500]
                  : colors.primary[600],
              borderRadius: "8px",
              padding: "8px",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? colors.primary[400]
                    : colors.primary[700]
              }
            }}
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                backgroundColor: colors.purpleAccent[500],
                color: "#fff",
                fontSize: "14px",
                fontWeight: "bold"
              }}
            >
              R
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;
