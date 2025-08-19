"use client";

import {
  Alert,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";

// Define the shape of form values
interface FormValues {
  email: string;
  password: string;
}

// Validation schema for form
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Must contain 6 characters, one uppercase, one lowercase, one number, and one special character"
    ),
});

const Home: React.FC = () => {
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [forgotPass, setForgotPass] = useState<boolean>(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values, { resetForm }) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = (data: FormValues) => {
    setError("");
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Add your API logic here
    }, 1000);
  };

  return (
    <Box
      bgcolor="#f5f5f5"
      minHeight="86vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={4}
    >
      <Container maxWidth="sm">
        {error && (
          <Box mb={3}>
            <Alert severity="error" sx={{ textAlign: "center" }}>
              {error}
            </Alert>
          </Box>
        )}
        <Box
          bgcolor="white"
          borderRadius={2}
          boxShadow={3}
          p={matchesSm ? 3 : 5}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant={matchesSm ? "h4" : "h3"} fontWeight={800} mb={2}>
            Sign In
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            mb={4}
            textAlign="center"
          >
            Fill in the fields below to sign in into your account.
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <TextField
              fullWidth
              id="email"
              label="Email*"
              variant="outlined"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 3 }}
              InputProps={{ sx: { height: "50px", padding: "6px" } }}
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              variant="outlined"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type={showPassword ? "text" : "password"}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                sx: { height: "50px", padding: "6px" },
                endAdornment: formik.values.password && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <AiFillEye size={20} color="#666" />
                      ) : (
                        <AiFillEyeInvisible size={20} color="#666" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    style={{
                      color: "#EF510F",
                    }}
                  />
                }
                label="Remember me"
                style={{ color: "#EF510F" }}
              />
              <Typography
                variant="body2"
                color="primary"
                onClick={() => setForgotPass(true)}
                sx={{ cursor: "pointer", color: "#EF510F", fontWeight: "500" }}
              >
                Forgot Password?
              </Typography>
            </Box>
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={loading && <CircularProgress size={20} />}
              sx={{
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                mb: 2,
                backgroundColor: "#007C02",
              }}
            >
              SIGN IN
            </Button>
            <Typography variant="body2" textAlign="center">
              Don&apos;t have an account?{" "}
              <Link href="/signup">
                <Typography
                  component="span"
                  sx={{ cursor: "pointer", fontWeight: 400, color: "#EF510F" }}
                >
                  Create An Account
                </Typography>
              </Link>
            </Typography>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
