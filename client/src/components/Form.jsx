import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import DisplayFlex from "./DisplayFlex";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "redux/index.js";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invaild email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invaild email").required("required"),
  password: yup.string().required("required"),
});

const initialValueRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initilValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for(let value in values){
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:8080/auth/register",{
        method : "POST",
        body : formData
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if(savedUser){
      setPageType("login");
    }
  }
  const login = async( values, onSubmitProps) => {
    const loggeddUserResponse = await fetch(
      "http://localhost:8080/auth/login",
      {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(values)
      });
      const loggedIn = await loggeddUserResponse.json();
      onSubmitProps.resetForm();

      if(loggedIn){
        dispatch(
          setLogin({
            user : loggedIn.user,
            token : loggedIn.token
          })
        );
        navigate("/home")
      }

  }
  const handleFormSubmit =async (values, onSubmitProps) => {
    if(isLogin) await login(values, onSubmitProps)
    if(isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initilValuesLogin : initialValueRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0,1fr))"
            gap="2rem"
            sx={{
              "& >div": {
                gridColumn: isNonMobileScreens ? undefined : "span 4",
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onChange={handleChange}
                  name="firstName"
                  onBlur={handleBlur}
                  value={values.firstName}
                  error={Boolean(
                    touched.firstName && Boolean(errors.firstName)
                  )}
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />

                <TextField
                  label="Last Name"
                  onChange={handleChange}
                  name="lastName"
                  onBlur={handleBlur}
                  value={values.lastName}
                  error={Boolean(touched.lastName && Boolean(errors.lastName))}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />

                <TextField
                  label="Location"
                  onChange={handleChange}
                  name="location"
                  onBlur={handleBlur}
                  value={values.location}
                  error={Boolean(touched.location && Boolean(errors.location))}
                  helperText={touched.location && errors.location}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />

                <TextField
                  label="Occupation"
                  onChange={handleChange}
                  name="occupation"
                  onBlur={handleBlur}
                  value={values.occupation}
                  error={Boolean(
                    touched.occupation && Boolean(errors.occupation)
                  )}
                  helperText={touched.occupation && errors.occupation}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                <Box
                  gridColumn="span 4"
                  borderRadius="5px"
                  p="1rem"
                  border={`1px solid ${palette.neutral.medium}`}
                >
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px solid ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "& :hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture here</p>
                        ) : (
                          <DisplayFlex>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </DisplayFlex>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
              value={values.email}
              error={Boolean(touched.email && Boolean(errors.email))}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: "span 4",
              }}
            />
            <TextField
              label="Password"
              type="password"
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
              value={values.password}
              error={Boolean(touched.password && Boolean(errors.password))}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 4",
              }}
            />
          </Box>

              {/* --------------------  BUTTON LOGIN/REGISTER ------------------*/}
          <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  p:"1rem",
                  m:"2.1rem 0rem",
                  color : palette.primary.main,
                  backgroundColor: palette.primary.main,
                  "&: hover":{
                    color : palette.primary.main
                  }
                }}
              >
                { isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login")
                  resetForm()
                }}
                sx={{
                  textDecoration: "underline",
                  color : palette.primary.alt,
                  "&:hover":{
                    cursor : "pointer",
                    color : palette.primary.light
                  },
                }}
              >
                {isLogin ? "Don't have an account? Sign Up here." : "Already have an account? Login here"}
              </Typography>
          </Box>

        </form>
      )}
    </Formik>
  );
};

export default Form;
