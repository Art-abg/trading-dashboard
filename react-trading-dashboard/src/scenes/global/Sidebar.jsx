import { useState, memo, useCallback, useEffect } from "react";
import {
  Sidebar as ProSidebarComponent,
  Menu,
  MenuItem
} from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Avatar,
  Tooltip
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CandlestickChartOutlinedIcon from "@mui/icons-material/CandlestickChartOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const Item = memo(({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100]
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
});

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [selected, setSelectedState] = useState("Dashboard");

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const setSelected = useCallback((title) => {
    setSelectedState(title);
  }, []);

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
          boxShadow:
            theme.palette.mode === "dark"
              ? "2px 0px 10px rgba(0, 0, 0, 0.2)"
              : "2px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRight: `1px solid ${
            theme.palette.mode === "dark"
              ? colors.primary[500]
              : colors.primary[300]
          }`
        }
      }}
    >
      <ProSidebarComponent
        collapsed={isCollapsed}
        rootStyles={{
          ".ps-sidebar-container": {
            background: `${colors.primary[400]} !important`,
            height: "100%"
          },
          border: "none"
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              return {
                color: disabled ? colors.grey[600] : colors.grey[100],
                backgroundColor: active
                  ? theme.palette.mode === "dark"
                    ? colors.primary[500]
                    : colors.primary[500]
                  : "transparent",
                padding: "9px 35px 9px 20px !important",
                margin: "6px 0",
                borderRadius: "8px",
                fontWeight: active ? 600 : 400,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.2s ease-in-out",
                "&:after": active
                  ? {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "4px",
                      height: "60%",
                      backgroundColor: active
                        ? theme.palette.mode === "dark"
                          ? colors.blueAccent[400]
                          : colors.blueAccent[600]
                        : "transparent",
                      borderRadius: "0 4px 4px 0"
                    }
                  : {},
                "&:hover": {
                  color: `${
                    theme.palette.mode === "dark"
                      ? colors.blueAccent[400]
                      : colors.blueAccent[600]
                  } !important`,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? colors.primary[500]
                      : colors.primary[600]
                }
              };
            },
            icon: ({ active }) => ({
              backgroundColor: "transparent !important",
              color: active
                ? theme.palette.mode === "dark"
                  ? colors.blueAccent[400]
                  : colors.blueAccent[600]
                : colors.grey[100],
              marginRight: "12px",
              fontSize: "20px"
            })
          }}
        >
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "15px 0 20px 0",
              color: colors.grey[100]
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    background: `linear-gradient(90deg, ${colors.blueAccent[500]}, ${colors.purpleAccent[500]})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  TRADING PRO
                </Typography>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  size="large"
                  sx={{
                    color: colors.grey[100],
                    "&:hover": {
                      color: colors.blueAccent[400],
                      backgroundColor: colors.primary[500]
                    }
                  }}
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .MuiAvatar-root": {
                    border: `3px solid ${
                      theme.palette.mode === "dark"
                        ? colors.primary[500]
                        : colors.primary[300]
                    }`,
                    boxShadow: `0px 0px 10px ${
                      theme.palette.mode === "dark"
                        ? "rgba(0,0,0,0.2)"
                        : "rgba(0,0,0,0.1)"
                    }`
                  }
                }}
              >
                <Avatar
                  alt="profile-user"
                  sx={{
                    width: 80,
                    height: 80,
                    fontSize: "32px",
                    backgroundColor: colors.purpleAccent[500]
                  }}
                >
                  R
                </Avatar>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Rob Miller
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? colors.greenAccent[400]
                        : colors.greenAccent[500],
                    m: "0 0 5px 0"
                  }}
                >
                  VP Trading Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box
            paddingLeft={isCollapsed ? undefined : "10%"}
            paddingRight={isCollapsed ? undefined : "10%"}
          >
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {!isCollapsed && (
              <Divider
                sx={{
                  my: 1.5,
                  opacity: 0.2,
                  borderColor:
                    theme.palette.mode === "dark"
                      ? colors.primary[300]
                      : colors.primary[700]
                }}
              />
            )}

            <Item
              title="Trading"
              to="/trading"
              icon={<CandlestickChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Live Markets"
              to="/trading"
              icon={<TrendingUpIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {!isCollapsed && (
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{
                  m: "20px 0 8px 0",
                  pl: "20px",
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  opacity: 0.7
                }}
              >
                Data
              </Typography>
            )}
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {!isCollapsed && (
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{
                  m: "20px 0 8px 0",
                  pl: "20px",
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  opacity: 0.7
                }}
              >
                Pages
              </Typography>
            )}
            <Item
              title="Profile"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {!isCollapsed && (
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{
                  m: "20px 0 8px 0",
                  pl: "20px",
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  opacity: 0.7
                }}
              >
                Charts
              </Typography>
            )}
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {!isCollapsed && (
              <Box
                mt="40px"
                p="20px"
                borderRadius="12px"
                bgcolor={
                  theme.palette.mode === "dark"
                    ? colors.primary[500]
                    : colors.primary[500]
                }
                sx={{
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    theme.palette.mode === "dark"
                      ? `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[400]} 100%)`
                      : `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[500]} 100%)`
                }}
              >
                <Typography
                  variant="h5"
                  color={colors.grey[100]}
                  sx={{
                    fontWeight: 600,
                    textAlign: "center",
                    mb: 1
                  }}
                >
                  Need Help?
                </Typography>
                <Typography
                  variant="body2"
                  color={colors.grey[300]}
                  sx={{
                    textAlign: "center",
                    mb: 2,
                    fontSize: "12px"
                  }}
                >
                  Check our documentation for quick answers
                </Typography>
                <Link
                  to="/faq"
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Box
                    p="8px 16px"
                    borderRadius="6px"
                    bgcolor={colors.blueAccent[500]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: colors.blueAccent[600]
                      }
                    }}
                  >
                    <Typography
                      color="#fff"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      View FAQ
                    </Typography>
                  </Box>
                </Link>
              </Box>
            )}
          </Box>
        </Menu>
      </ProSidebarComponent>
    </Box>
  );
};

export default Sidebar;
