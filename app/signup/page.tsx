import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gray-100 ">
      <Typography
        variant="h5"
        sx={{ mb: 4, fontWeight:"bold", color: "#1f2937" }}
      >
        Choose Account Type
      </Typography>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Individual Card */}
        <div className="flex justify-center">
          <Card
            sx={{
              width: 350,
              paddingTop:6,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 4,
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 60, color: "#1976d2", mb: 2 }} />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#1f2937", mb: 1 }}
              >
                Individual
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#4b5563", mb: 3 }}
              >
                For personal use (Regular courier service)
              </Typography>
              <Link href="/signup/individual">
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#F84A01",
                  color: "#F84A01",
                  textTransform: "none",
                  fontWeight: 500,
                  px: 4,
                }}
              >
                SIGN UP
              </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Business Card */}
        <div className="flex justify-center">
          <Card
            sx={{
              width: 350,
              padding:6,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",             
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 4,
              }}
            >
              <StorefrontIcon sx={{ fontSize: 60, color: "#f97316", mb: 2 }} />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#f97316", mb: 1 }}
              >
                Business
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#4b5563", mb: 3 }}
              >
                For business use
              </Typography>
              <Link href="/signup/business">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#f97316",
                  textTransform: "none",
                  fontWeight: 500,
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#e86a14",
                  },
                }}
              >
                SIGN UP
              </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;