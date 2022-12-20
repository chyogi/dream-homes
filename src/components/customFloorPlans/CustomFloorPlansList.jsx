import React, { useState, useEffect } from "react";
import CustomFloorPlans from "./CustomFloorPlans";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

// import { CustomFloorPlans } from "./CustomFloorPlans";
import "./CustomFloorPlans.css";
import { Navigate } from "react-router-dom";

export const CustomFloorPlansList = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ width: "100%", textAlign: "center", padding: "1rem" }}>
        <Button
          sx={{ backgroundColor: "#031f0a" }}
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
