import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FloorPlans } from "./FloorPlans";
import Box from "@mui/material/Box";
import "./FloorPlans.css";

export const FloorPlansList = () => {
  const [floorPlanList, setFloorPlanList] = useState([]);
  const [savedFloorPlansList, setSavedFloorPlansList] = useState([]);
  const [finalFloorPlansList, setFinalFloorPlansList] = useState([]);
  const [favsChanged, setFavsChanged] = useState("");

  const appUser = JSON.parse(localStorage.getItem("app_user"));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8088/readyToGoFloorPlans`);
      const floorPlanListFromAPI = await response.json();
      console.log(`floorPlanListFromAPI`, floorPlanListFromAPI);
      setFloorPlanList(floorPlanListFromAPI);
    };
    fetchData();

    const fetchSavedFloorPlanData = async () => {
      const response = await fetch(
        `http://localhost:8088/savedFloorPlans?userId=${appUser.id}`
      );
      const savedFloorPlanListFromAPI = await response.json();
      console.log(`savedFloorPlanListFromAPI`, savedFloorPlanListFromAPI);
      setSavedFloorPlansList(savedFloorPlanListFromAPI);
    };
    fetchSavedFloorPlanData();
  }, []);

  useEffect(() => {
    for (const floorPlan of floorPlanList) {
      console.log(floorPlan);
      console.log(savedFloorPlansList);
      floorPlan.isFav = false;
      for (const fav of savedFloorPlansList) {
        if (fav.readyToGoFloorPlanId === floorPlan.id) floorPlan.isFav = true;
      }
    }

    console.log(`final floorPlanList`, floorPlanList);
    setFinalFloorPlansList(floorPlanList);
  }, [savedFloorPlansList]);

  // useEffect(
  //   () => {
  //     const fetchData = async () => {
  //       const response = await fetch(
  //         `http://localhost:8088/readyToGoFloorPlans`
  //       );
  //       const floorPlanListFromAPI = await response.json();
  //       console.log(`floorPlanListFromAPI`, floorPlanListFromAPI);
  //       setFloorPlanList(floorPlanListFromAPI);
  //     };
  //     fetchData();

  //     const fetchSavedFloorPlanData = async () => {
  //       const response = await fetch(
  //         `http://localhost:8088/savedFloorPlans?userId=${appUser.id}`
  //       );
  //       const savedFloorPlanListFromAPI = await response.json();
  //       console.log(`savedFloorPlanListFromAPI`, savedFloorPlanListFromAPI);
  //       setSavedFloorPlansList(savedFloorPlanListFromAPI);
  //     };
  //     fetchSavedFloorPlanData();

  //     for (const floorPlan of floorPlanList) {
  //       if (savedFloorPlansList.indexOf(floorPlan.id) !== -1) {
  //         floorPlan.isFav = true;
  //       } else {
  //         floorPlan.isFav = false;
  //       }
  //     }
  //   },
  //   [favsChanged] // When this array is empty, you are observing initial component state
  // );

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ textAlign: "center", padding: "1rem" }}
      >
        Ready To Go Designer Floor Plans
      </Typography>

      <section className="floorplan--container">
        {finalFloorPlansList.map((floorPlan) => {
          console.log(floorPlan);
          return (
            <FloorPlans
              className="floorplan--item"
              key={floorPlan.id}
              floorPlan={floorPlan}
              isFav={floorPlan.isFav}
              setFavsChanged={setFavsChanged}
            />
          );
        })}
      </section>
    </Box>
  );
};
