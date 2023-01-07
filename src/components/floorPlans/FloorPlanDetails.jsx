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

//https://www.floorplans.com/plan/2455-square-feet-3-bedroom-2-00-bathroom-2-garage-country-traditional-sp303180

// const itemData = [
//   {
//     img: "https://cdn.houseplansservices.com/product/umjjl0g7a8obgu2a12bcliotj8/w800x533.jpg?v=2",
//     title: "PLAN 1064-234",
//   },
//   {
//     img: "https://cdn.houseplansservices.com/product/umjjl0g7a8obgu2a12bcliotj8/w800x533.jpg?v=2",
//     title: "PLAN 1064-234",
//   },
//   {
//     img: "https://cdn.houseplansservices.com/product/kulvhumrr2fd1074jbq51bvsvu/w800x533.jpg?v=2",
//     title: "PLAN 1064-234",
//   },
//   {
//     img: "https://cdn.houseplansservices.com/product/8n40ip7boqrdsj9v0hg7pf1ch7/w800x533.jpg?v=2",
//     title: "PLAN 1064-234",
//   },
//   {
//     img: "https://cdn.houseplansservices.com/product/ic64c6br9o33ph3mfdde676cd/w800x533.jpg?v=2",
//     title: "PLAN 1064-234",
//   },
//   {
//     img: "https://cdn.houseplansservices.com/product/44q3t0fq2pk5l8uh4o4e950dna/w600.jpg?v=2",
//     title: "Floor Plan - Main Floor",
//   },
//   {
//     img: "https://cdn.houseplansservices.com/product/rg79r3mj0sr60q20a9aumi568m/w600.jpg?v=2",
//     title: "Floor Plan - Lower Floor",
//   },
// ];

export default function FloorPlanDetails() {
  const { floorPlanId } = useParams();
  const { state } = useLocation();
  const [index, setIndex] = useState(0);
  const [floorPlanImages, setFloorPlanImages] = useState([]);

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
    <Box sx={{ width: "100%", height: "100%", background: "#f1f7ee" }}>
      <Typography
        sx={{ textAlign: "center", padding: "1rem" }}
        variant="h3"
        gutterBottom
      >
        {state.floorPlan.name}
      </Typography>
      <Typography
        sx={{ textAlign: "center", padding: "1rem" }}
        variant="body1"
        gutterBottom
      >
        {state.floorPlan.description}
      </Typography>
      <Box sx={{ width: "50%", marginLeft: "25%" }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ textAlign: "center" }}
        >
          <Grid item xs={6}>
            <Item sx={{ fontWeight: "900" }}>Type</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{state.floorPlan.type}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ fontWeight: "900" }}>Stories</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{state.floorPlan.stories}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ fontWeight: "900" }}>Sq Ft</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{state.floorPlan.sqFt}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ fontWeight: "900" }}>Bedrooms</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{state.floorPlan.bedrooms}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ fontWeight: "900" }}>Full Baths</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{state.floorPlan.fullBaths}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ fontWeight: "900" }}>Half Baths</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{state.floorPlan.halfBaths}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ fontWeight: "900" }}>Garage</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{state.floorPlan.garage}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ fontWeight: "900" }}>Price</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{state.floorPlan.price}</Item>
          </Grid>
        </Grid>
      </Box>
      <Carousel
        className="floor--plan--carousel"
        activeIndex={index}
        onSelect={handleSelect}
      >
        {floorPlanImages.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100 floor--plan--image"
              src={item.img}
              alt={item.title}
            />
            <Carousel.Caption>
              <h3>{item.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Box>
  );
}
