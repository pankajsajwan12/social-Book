import React, { useState } from 'react'
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMode, setLogout } from 'redux/index';
import DisplayFlex from 'components/DisplayFlex';

const NavBar = () => {
  const [ isMobileMenuToggled, setIsMobileMenuToggled ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(user);
  const isDestopScreens = useMediaQuery("(min-width : 1000px)");

  const theme = useTheme();
  const neturalLightColor = theme.palette.neutral.ligth
  const dark = theme.palette.neutral.dark
  const backgroundColor = theme.palette.background.default;
  const primaryLightColor = theme.palette.primary.light;
  const alt = theme.palette.background.alt

  // const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <DisplayFlex backgroundColor={alt} padding="1rem 6%" >
      <DisplayFlex gap="6rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(2rem 3rem 3.25rem)"
          onClick={() => navigate("/home")}
          sx = {{
            "&:hover": {
              color : primaryLightColor,
              cursor : "pointer"
            },
          }}
        >
          socialBook
        </Typography>
        {
          isDestopScreens && (
            <DisplayFlex borderRadius="9px" padding="0.1rem 1.5rem" gap="3rem" backgroundColor={neturalLightColor}>
              <InputBase  placeholder='Search...' />
              <IconButton>
                <Search />
              </IconButton>
            </DisplayFlex>
          )}
      </DisplayFlex>
        {/* --------------- DESKTOP NAVBAR ---------------------- */}
        {
          isDestopScreens ? (
          <DisplayFlex gap="3rem">
            <IconButton onClick={() => dispatch(setMode())}>
             {
              theme.palette.mode === "light" ? (
              <DarkMode sx={{ fontSize : '25px'}} />) : (
                <LightMode sx={{ color: dark , fontSize : "25px" }} />
              )
             }
            </IconButton>
            <Message sx={{ fontSize : '25px'}} />
            <Notifications sx={{ fontSize : '25px'}} />
            <Help sx={{ fontSize : '25px'}} />
            <FormControl variant="standard" value={"Pankaj"}>
              <Select
                value={"Pankaj"}
                sx={{
                  backgroundColor : neturalLightColor,
                  width : "150px",
                  borderRadius : "0.25rem",
                  padding : "0.25rem 1rem",
                  "& .MuiSvgIcon-root:" :{
                    pr : "0.27rem",
                    width : "3.1rem"
                  },
                  "& .MuiSelect-select:focus":{
                    backgroundColor : neturalLightColor
                  }
                }}
                input = {<InputBase />}
              >
                <MenuItem value={"full Name"}>
                  <Typography>{"full Name"}</Typography>  
                </MenuItem>
                <MenuItem onClick={() =>dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </DisplayFlex>
          ):(
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Menu />
          </IconButton>
          )}
          {/* ------------------- MOBILE NAVBAR ------------------------- */}
          {!isDestopScreens &&  isMobileMenuToggled  && (
            <Box
              backgroundColor={backgroundColor}
              position="fixed"
              right="0"
              bottom="0"
              height="100%"
              zIndex="10"
              maxWidth="700px"
              minWidth="100%"

            >
              {/* CLOSE ICONS BUTTON */}
              <Box display="flex" p="1rem" justifyContent="flex-end">
                <IconButton
                 onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                  <Close />
                </IconButton>
              </Box>

              {/* MENU ITEM FOR MOBLIE SCREEN */}
             <DisplayFlex gap="2.5rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <IconButton onClick={() => dispatch(setMode())}>
             {
              theme.palette.mode === "light" ? (
              <DarkMode sx={{ fontSize : '25px'}} />) : (
                <LightMode sx={{ color: dark , fontSize : "25px" }} />
              )
             }
            </IconButton>
            <Message sx={{ fontSize : '25px'}} />
            <Notifications sx={{ fontSize : '25px'}} />
            <Help sx={{ fontSize : '25px'}} />
            <FormControl variant="standard" value={"name"}>
              <Select
                value={"Pankaj"}
                sx={{
                  backgroundColor : neturalLightColor,
                  width : "150px",
                  borderRadius : "0.25rem",
                  padding : "0.25rem 1rem",
                  "& .MuiSvgIcon-root:" :{
                    pr : "0.27rem",
                    width : "3.1rem"
                  },
                  "& .MuiSelect-select:focus":{
                    backgroundColor : neturalLightColor
                  }
                }}
                input = {<InputBase />}
              >
                <MenuItem value={"full Name"}>
                  <Typography>{"full Name"}</Typography>  
                </MenuItem>
                <MenuItem onClick={() =>dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </DisplayFlex>
            </Box>
          )}
    </DisplayFlex>
  )
}

export default NavBar