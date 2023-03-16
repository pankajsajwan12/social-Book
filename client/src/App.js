import HomePage from 'pages/homePage/HomePage';
import LoginPage from 'pages/loginPage/LoginPage';
import ProfilePage from 'pages/profilePage/ProfilePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline ,ThemeProvider } from "@mui/material";
import { createTheme} from '@mui/material/styles';
import { themeSettings} from './theme'
import NavBar from 'pages/navbar/NavBar';


function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/nav" element={<NavBar />}/>
    </Routes>
    </ThemeProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
