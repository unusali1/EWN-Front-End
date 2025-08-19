"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const personInfoValidationSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  phone: yup.string().required("Phone is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  role: yup.string().required("Role is required"),
  national_id: yup.string().required("National ID is required"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Must contain 6 characters, one uppercase, one lowercase, one number, and one special character"
    ),
  confirm_password: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function ContactPersonForm({ onNext, onBack }) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      role: "",
      national_id: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: personInfoValidationSchema,
    onSubmit: (values) => {
      setError("");
      onNext(values);
    },
  });

  return (
    <Box className="flex  mt-4">
      <Box className="bg-white w-full ">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              fullWidth
              id="first_name"
              label="First Name*"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
              InputProps={{ sx: { height: "52px",padding: "6px" } }}
            />
            <TextField
              fullWidth
              id="last_name"
              label="Last Name*"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
              InputProps={{ sx: { height: "52px",padding: "6px" } }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <PhoneInput
                country={"bd"}
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue("phone", phone)}
                style={{ width: "100%", height: "48px" }} // adjust height if needed
                inputStyle={{
                  width: "100%",
                  borderRadius: "0.2rem",
                  height: "52px",
                  border:
                    formik.touched.phone && formik.errors.phone
                      ? "1px solid red"
                      : "1px solid #ccc",
                }}
              />
              {formik.touched.phone && formik.errors.phone && (
                <span className="text-red-600 text-sm mt-1">
                  {formik.errors.phone}
                </span>
              )}
            </div>

            <div className="w-full">
              <TextField
                fullWidth
                id="email"
                label="Email*"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{ sx: { height: "52px",padding: "6px" } }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              fullWidth
              id="role"
              label="Role*"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              InputProps={{ sx: { height: "52px",padding: "6px" } }}
            />
            <TextField
              fullWidth
              id="national_id"
              label="National ID*"
              name="national_id"
              value={formik.values.national_id}
              onChange={formik.handleChange}
              error={
                formik.touched.national_id && Boolean(formik.errors.national_id)
              }
              helperText={
                formik.touched.national_id && formik.errors.national_id
              }
              InputProps={{ sx: { height: "52px",padding: "6px" } }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              fullWidth
              id="password"
              label="Password*"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                sx: { height: "52px",padding: "6px" },
                endAdornment: formik.values.password && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </IconButton>
                  </InputAdornment>
                ),
                className: "rounded-lg",
              }}
            />

            <TextField
              fullWidth
              id="confirm_password"
              label="Confirm Password*"
              name="confirm_password"
              type={showPassword ? "text" : "password"}
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              error={
                formik.touched.confirm_password &&
                Boolean(formik.errors.confirm_password)
              }
              helperText={
                formik.touched.confirm_password &&
                formik.errors.confirm_password
              }
              InputProps={{
                sx: { height: "52px",padding: "6px" },
                endAdornment: formik.values.confirm_password && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                className: "rounded-lg",
              }}
            />
          </div>

          <div className="flex justify-between gap-4 mt-6 w-full">
            <Button
              type="button"
              onClick={onBack}
              variant="outlined"
              className="bg-gray-200 text-green-600 px-4 py-2 rounded-md shadow-sm w-full"
              sx={{ color: "green", border: "1px solid green" }}
            >
              BACK
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#688228" }}
              className="bg-amber-600 w-full text-white px-6 py-2 rounded-md shadow-sm hover:bg-green-800 focus:outline-none"
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  );
}
