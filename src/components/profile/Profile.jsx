import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useLocation, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Carousel from "react-bootstrap/Carousel";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Profile() {
  const { floorPlanId } = useParams();
  const { state } = useLocation();
  const [index, setIndex] = useState(0);
  const [floorPlanImages, setFloorPlanImages] = useState([]);

  const appUser = JSON.parse(localStorage.getItem("app_user"));

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(
    () => {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:8088/FloorPlanImages?readyToGoFloorPlanId=${floorPlanId}`
        );
        const floorPlanImagesFromAPI = await response.json();
        console.log(floorPlanImagesFromAPI);
        setFloorPlanImages(floorPlanImagesFromAPI);
      };
      fetchData();
    },
    [] // When this array is empty, you are observing initial component state
  );

  return (
    <Box sx={{ width: "100%", height: "90vh" }}>
      <Typography sx={{ textAlign: "center" }} variant="h3" gutterBottom>
        User Profile
      </Typography>
      <Box sx={{ width: "50%", marginLeft: "25%" }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ textAlign: "center" }}
        >
          <Grid item xs={6}>
            <Item sx={{ fontWeight: "900" }}>First Name</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{appUser.firstName}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ fontWeight: "900" }}>Last Name</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{appUser.lastName}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ fontWeight: "900" }}>Email</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{appUser.email}</Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
