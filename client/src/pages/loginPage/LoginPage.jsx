import React from 'react'
import { Box , useTheme , useMediaQuery , Typography} from '@mui/material'
import Form from 'components/Form';

const LoginPage = () => {
  const theme = useTheme();
  const destopScreens = useMediaQuery("(min-width : 1000px)")

  return (
    <Box>
      <Box
        width="100%"
        p="1rem 6%"
        textAlign="center"
        backgroundColor={theme.palette.background.alt}
      >
      <Typography
          fontWeight="bold"
          fontSize="2rem"
          color="primary"
        >
          socialBook
        </Typography>
      </Box>
      <Box
       width={ destopScreens ?  "50%" : "93%"}
       p="2rem"
       m="2rem auto"
       borderRadius="1.5rem"
       backgroundColor={theme.palette.background.alt} 
      >
        <Typography fontWeight="500" varient="h5" sx={{ mb : '1.5rem'}} textAlign="center">
          Welcome to SocialBook, the Social Media for youths!
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage