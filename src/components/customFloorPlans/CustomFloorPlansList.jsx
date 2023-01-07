import React, { useState, useEffect } from "react";
import CustomFloorPlans from "./CustomFloorPlans";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

// import { CustomFloorPlans } from "./CustomFloorPlans";
import "./CustomFloorPlans.css";
import { Navigate } from "react-router-dom";

export const CustomFloorPlansList = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ textAlign: "center", padding: "1rem" }}
        >
          Customer Floor Plans
        </Typography>
        <Button
          // sx={{ backgroundColor: "#031f0a" }}
          sx={{
            backgroundColor: "#80ed99",
            width: "30%",
            fontSize: "large",
            fontWeight: "bold",
            color: "#1f2421",
            "&:hover": {
              background: "#9fffcb",
            },
          }}
          variant="contained"
          onClick={() => {
            navigate(`/custom-floor-plans/add`);
          }}
        >
          Add New Custom Floor Plan
        </Button>
        <CustomFloorPlans />
      </Box>
    </>
  );
};
