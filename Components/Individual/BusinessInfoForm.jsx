"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Box, Button } from "@mui/material";

const BusinessInfoValidationSchema = yup.object().shape({
  businessName: yup.string().required("Business Name is required"),
  websiteUrl: yup.string().required("Website or Social Media URL is required"),
  districtState: yup.string().required("District or State is required"),
  cityTown: yup.string().required("City or Town is required"),
  postcodeZipcode: yup.string().required("Postcode or Zipcode is required"),
  address: yup.string().required("Address is required"),
});

const BusinessInfoForm = ({ onNext, onBack, formData }) =>{
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      businessName: formData.businessName || "",
      websiteUrl: formData.websiteUrl || "",
      districtState: formData.districtState || "",
      cityTown: formData.cityTown || "",
      postcodeZipcode: formData.postcodeZipcode || "",
      address: formData.address || "",
    },
    validationSchema: BusinessInfoValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setError("");
      onNext(values);
    },
  });

  return (
    <Box className="flex items-center justify-center mt-4">
      <Box className="bg-white w-full">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              fullWidth
              id="business_name"
              label="Business Name*"
              name="businessName"
              value={formik.values.businessName}
              onChange={formik.handleChange}
              error={
                formik.touched.businessName &&
                Boolean(formik.errors.businessName)
              }
              helperText={
                formik.touched.businessName && formik.errors.businessName
              }
              color="success"
              InputProps={{ sx: { height: "52px", padding: "6px" } }}
            />
            <TextField
              fullWidth
              id="websiteUrl"
              label="Website or Social Media URL*"
              name="websiteUrl"
              value={formik.values.websiteUrl}
              onChange={formik.handleChange}
              error={
                formik.touched.websiteUrl && Boolean(formik.errors.websiteUrl)
              }
              helperText={formik.touched.websiteUrl && formik.errors.websiteUrl}
              color="success"
              InputProps={{ sx: { height: "52px", padding: "6px" } }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField
              fullWidth
              id="districtState"
              label="District / State*"
              name="districtState"
              value={formik.values.districtState}
              onChange={formik.handleChange}
              error={
                formik.touched.districtState &&
                Boolean(formik.errors.districtState)
              }
              helperText={
                formik.touched.districtState && formik.errors.districtState
              }
              color="success"
              InputProps={{ sx: { height: "52px", padding: "6px" } }}
            />
            <TextField
              fullWidth
              id="cityTown"
              label="City / Town*"
              name="cityTown"
              value={formik.values.cityTown}
              onChange={formik.handleChange}
              error={formik.touched.cityTown && Boolean(formik.errors.cityTown)}
              helperText={formik.touched.cityTown && formik.errors.cityTown}
              color="success"
              InputProps={{ sx: { height: "52px", padding: "6px" } }}
            />
            <TextField
              fullWidth
              id="postcodeZipcode"
              label="Postcode / Zipcode*"
              name="postcodeZipcode"
              value={formik.values.postcodeZipcode}
              onChange={formik.handleChange}
              error={
                formik.touched.postcodeZipcode &&
                Boolean(formik.errors.postcodeZipcode)
              }
              helperText={
                formik.touched.postcodeZipcode && formik.errors.postcodeZipcode
              }
              color="success"
              InputProps={{ sx: { height: "52px", padding: "6px" } }}
            />
          </div>

          <TextField
            fullWidth
            id="address"
            label="Address*"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            color="success"
            InputProps={{ sx: { height: "52px", padding: "6px" } }}
          />

          <div className="flex justify-between gap-4 mt-6 w-full">
            <Button
              type="button"
              onClick={onBack}
              variant="outlined"
              disabled={true}
              sx={{
                "&.Mui-disabled": {
                  color: "#A7C27D",
                  border: "1px solid #23C600",
                },
              }}
              className="bg-gray-200 text-gray-700 h-10 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none w-full"
            >
              BACK
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#688228" }}
              className="bg-amber-600 w-full h-10 text-white px-6 py-2 rounded-md shadow-sm hover:bg-green-800 focus:outline-none"
            >
              NEXT
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  );
}

export default BusinessInfoForm