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

export const Home = () => {
  const [floorPlanList, setFloorPlanList] = useState([]);
  const [customFloorPlanList, setCustomFloorPlanList] = useState([]);
  const [expanded, setExpanded] = React.useState("readyToGoPlans");
  const [favsChanged, setFavsChanged] = useState("");

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const appUser = JSON.parse(localStorage.getItem("app_user"));

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Name",
      width: 170,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Name"}</strong>,
    },
    {
      field: "type",
      headerName: "Type",
      width: 130,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Type"}</strong>,
    },
    {
      field: "stories",
      headerName: "Stories",
      type: "number",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Stories"}</strong>,
    },
    {
      field: "sqFt",
      headerName: "Sq Ft",
      type: "number",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Sq Ft"}</strong>,
    },
    {
      field: "bedrooms",
      headerName: "Bedrooms",
      type: "number",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Bedrooms"}</strong>,
    },
    {
      field: "fullBaths",
      headerName: "Full Baths",
      type: "number",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Full Baths"}</strong>,
    },
    {
      field: "halfBaths",
      headerName: "Half Baths",
      type: "number",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Half Baths"}</strong>,
    },
    {
      field: "garage",
      headerName: "Garage",
      type: "number",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Garage"}</strong>,
    },
    {
      field: "isFav",
      headerName: "Fav?",
      type: "text",
      width: 90,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Fav?"}</strong>,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 180,
      headerAlign: "center",
      renderHeader: () => <strong>{"Price"}</strong>,
      valueGetter: (params) => {
        return currencyFormatter.format(
          isNaN(params.row.price) ? 0.0 : params.row.price
        );
      },
    },
  ];

  const accordingChangeHandler = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(
    () => {
      const fetchReadyToGoFloorPlanData = async () => {
        const response = await fetch(
          `http://localhost:8088/savedFloorPlans?userId=${appUser.id}&_expand=readyToGoFloorPlan`
        );
        const floorPlanListFromAPI = await response.json();
        setFloorPlanList(floorPlanListFromAPI);
      };
      fetchReadyToGoFloorPlanData();

      const fetchCustomFloorPlanData = async () => {
        const response = await fetch(
          `http://localhost:8088/customFloorPlans?userId=${appUser.id}&isFav=true`
        );
        const customFloorPlanListFromAPI = await response.json();
        setCustomFloorPlanList(customFloorPlanListFromAPI);
      };
      fetchCustomFloorPlanData();
    },
    [] // When this array is empty, you are observing initial component state
  );

  useEffect(
    () => {
      const fetchReadyToGoFloorPlanData = async () => {
        const response = await fetch(
          `http://localhost:8088/savedFloorPlans?userId=${appUser.id}&_expand=readyToGoFloorPlan`
        );
        const floorPlanListFromAPI = await response.json();
        setFloorPlanList(floorPlanListFromAPI);
      };
      fetchReadyToGoFloorPlanData();

      const fetchCustomFloorPlanData = async () => {
        const response = await fetch(
          `http://localhost:8088/customFloorPlans?userId=${appUser.id}&isFav=true`
        );
        const customFloorPlanListFromAPI = await response.json();
        setCustomFloorPlanList(customFloorPlanListFromAPI);
      };
      fetchCustomFloorPlanData();
    },
    [favsChanged] // When this array is empty, you are observing initial component state
  );

  return (
    <>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ textAlign: "center", padding: "1rem" }}
        >
          Welcome to Dream Homes
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", padding: "1rem", fontWeight: "bolder" }}
        >
          Saved Floor Plans
        </Typography>
        <Accordion
          expanded={true}
          // expanded={expanded === "readyToGoPlans"}
          onChange={accordingChangeHandler("readyToGoPlans")}
          sx={{ padding: "0.5rem" }}
        >
          <AccordionSummary
            sx={{ background: "#b7efc5" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontSize: "x-large", fontWeight: "bold" }}>
              Ready To Go Floor Plans
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <section className="floorplan--container">
              {floorPlanList.map((floorPlan) => {
                console.log("floorPlan", floorPlan);
                return (
                  <FloorPlans
                    className="floorplan--item"
                    key={floorPlan.readyToGoFloorPlan.id}
                    floorPlan={floorPlan.readyToGoFloorPlan}
                    isFav={true}
                    setFavsChanged={setFavsChanged}
                  />
                );
              })}
            </section>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{ padding: "0.5rem" }}
          expanded={true}
          // expanded={expanded === "customFloorPlans"}
          onChange={accordingChangeHandler("customFloorPlans")}
        >
          <AccordionSummary
            sx={{ background: "#b7efc5" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontSize: "x-large", fontWeight: "bold" }}>
              Custom Floor Plans
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ height: 400, width: "100%", padding: "1rem" }}>
              <DataGrid
                rows={customFloorPlanList}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                initialState={{
                  columns: { columnVisibilityModel: { id: false } },
                }}
                sx={{
                  borderColor: "#181f1c",
                  border: 2,
                  boxShadow: 2,
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#d8f3dc",
                    fontSize: "1rem",
                    fontWeight: "bolder",
                  },
                  "& .MuiDataGrid-columnSeparator": {
                    color: "#181f1c",
                  },
                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#f1f7ee",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                  },
                  bgcolor: "background.paper",
                  overflow: "auto",
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};
