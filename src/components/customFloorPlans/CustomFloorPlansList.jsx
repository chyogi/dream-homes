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
  const [customFloorPlanList, setCustomFloorPlanList] = useState([]);

  useEffect(
    () => {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:8088/customFloorPlans`);
        const customFloorPlanListFromApi = await response.json();
        setCustomFloorPlanList(customFloorPlanListFromApi);
      };
      fetchData();
    },
    [] // When this array is empty, you are observing initial component state
  );

  return (
    <>
      <Box sx={{ width: "100%", textAlign: "center", padding: "1rem" }}>
        {/* {customFloorPlanList.map((customFloorPlan) => {
          return (
            // <div
            //   className="custom--floorplan--item"
            //   key={customFloorPlan.id}
            //   floorPlan={customFloorPlan}
            // />
            <div>{customFloorPlan.id}</div>
          );
        })} */}
        <Button sx={{ backgroundColor: "#031f0a" }} variant="contained" onClick ={() => {navigate(`/custom-floor-plans/add`)}}>
          Add New Custom Floor Plan
        </Button>
        <CustomFloorPlans customFloorPlans={customFloorPlanList} />
      </Box>
    </>
  );
};
