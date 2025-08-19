"use client";

import {
  Alert,
  Box,
  TextField,
  Typography,
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

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values, { resetForm }) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = (data) => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      setError("timeout of 5000ms exceeded");
      setLoading(false);
    }, 5000);
  };

  return (
    <>
      {error && (
        <Box mb={3} className="w-full">
          <Alert
            severity="error"
            sx={{ textAlign: "center" }}
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        </Box>
      )}

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
          color="success"
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
          color="success"
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
                  color: "#007C02",
                }}
              />
            }
            label="Remember me"
            style={{ color: "#20AF01" }}
          />
          <Typography
            variant="body2"
            color="primary"
            onClick={() => setForgotPass(true)}
            sx={{ cursor: "pointer", color: "#20AF01", fontWeight: "500" }}
          >
            Forgot Password?
          </Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          size="large"
          sx={{
            backgroundColor: "#007C02",
            color: "white",
            "&.Mui-disabled": {
              backgroundColor: "#A7C27D",
              color: "white",
            },
          }}
          className="w-full px-6 py-3 rounded-md shadow-sm flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              SIGNING IN...
              <CircularProgress size={20} sx={{ color: "white" }} />
            </>
          ) : (
            " SIGN IN"
          )}
        </Button>

        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <Typography
              component="span"
              sx={{ cursor: "pointer", fontWeight: 400, color: "#20AF01" }}
            >
              Create An Account
            </Typography>
          </Link>
        </Typography>
      </form>
    </>
  );
};

export default LoginForm;
