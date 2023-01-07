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
import { FloorPlans } from "../floorPlans/FloorPlans";
import "./Home.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

export const AboutUs = () => {
  const [floorPlanList, setFloorPlanList] = useState([]);
  const [customFloorPlanList, setCustomFloorPlanList] = useState([]);
  const appUser = JSON.parse(localStorage.getItem("app_user"));

  return (
    <>
      <Box sx={{ width: "100%", height: "100vh", background: "#f1f7ee" }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ textAlign: "center", padding: "1rem" }}
        >
          Our Story.....
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ textAlign: "center", padding: "1rem" }}
        >
          We design and build modern open architecture homes. We are 100%
          committed to your purchase satisfaction, as well as your success in
          what is sure to be one of life’s most fulfilling undertakings – that
          of building a house which you’ll make into a home. Here are some other
          reasons you should feel confident placing your business with us:
        </Typography>
        <Divider />
        <List sx={{ textAlign: "center", padding: "1rem" }}>
          <ListItem>
            <ListItemText
              sx={{
                fontStyle: "italic",
                fontSize: "x-large",
                fontWeight: "bolder",
              }}
              primary="We Know Construction Inside and Out"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{
                fontStyle: "italic",
                fontSize: "x-large",
                fontWeight: "bolder",
              }}
              primary="Modern Exclusive Plans and Best Sellers"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{
                fontStyle: "italic",
                fontSize: "x-large",
                fontWeight: "bolder",
              }}
              primary="Best Price Guarantee"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{
                fontStyle: "italic",
                fontSize: "x-large",
                fontWeight: "bolder",
              }}
              primary="Knowledgeable and Courteous Staff"
            />
          </ListItem>
        </List>
        <Divider />
      </Box>
    </>
  );
};
