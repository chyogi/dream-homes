import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const floorPlanTypes = [
  {
    value: "singleFamily",
    label: "Single Family",
  },
  {
    value: "townHome",
    label: "Town Home",
  },
  {
    value: "dulpex",
    label: "Duplex",
  },
];

const stories = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
];

const bedrooms = [
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
];

const fullBaths = [
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
];

const halfBaths = [
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
];

const garage = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
];

export const CustomFloorPlanForm = () => {
  const navigate = useNavigate();
  const [userEnteredName, setUserEnteredName] = useState("");
  const [userEnteredtype, setUserEnteredType] = useState("");
  const [userEnteredStories, setUserEnteredStories] = useState("");
  const [userEnteredSqft, setUserEnteredSqft] = useState("");
  const [userEnteredBedrooms, setUserEnteredBedrooms] = useState("");
  const [userEnteredFullBaths, setUserEnteredFullBaths] = useState("");
  const [userEnteredHalfBaths, setUserEnteredHalfBaths] = useState("");
  const [userEnteredGarage, setUserEnteredGarage] = useState("");
  const [userEnteredIsFav, setUserEnteredIsFav] = useState(true);

  const handleAddButton = (e) => {
    e.preventDefault();

    const appUser = JSON.parse(localStorage.getItem("app_user"));
    const customFloorPlanObject = {};

    customFloorPlanObject.userId = appUser.id;
    customFloorPlanObject.name = userEnteredName;
    customFloorPlanObject.type = userEnteredtype;
    customFloorPlanObject.stories = userEnteredStories;
    customFloorPlanObject.sqFt = userEnteredSqft;
    customFloorPlanObject.bedrooms = userEnteredBedrooms;
    customFloorPlanObject.fullBaths = userEnteredFullBaths;
    customFloorPlanObject.halfBaths = userEnteredHalfBaths;
    customFloorPlanObject.garage = userEnteredGarage;
    customFloorPlanObject.isFav = userEnteredIsFav;
    customFloorPlanObject.price = 100000;

    if (customFloorPlanObject.bedrooms > 3)
      customFloorPlanObject.price = 550000;
    else if (customFloorPlanObject.bedrooms > 2)
      customFloorPlanObject.price = 450000;
    else customFloorPlanObject.price = 250000;

    console.log(customFloorPlanObject);

    const postDataToDB = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customFloorPlanObject),
      };

      const response = await fetch(
        `http://localhost:8088/customFloorPlans`,
        options
      );

      const responseFromApi = await response.json();
      navigate(`/custom-floor-plans`);
    };

    postDataToDB();
  };
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Typography
        sx={{ textAlign: "center", padding: "1rem" }}
        variant="h3"
        gutterBottom
      >
        Add a new custom floor plan
      </Typography>
      <Box
        component="form"
        // sx={{
        //   "& > :not(style)": { m: 1, width: "50ch" },
        //   marginLeft: "20%",
        // }}
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
          textAlign: "center",
          padding: "1rem",
        }}
        noValidate
        autoComplete="off"
      >
        {/* <Box sx={{}}> */}

        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          sx={{ width: "50ch" }}
          value={userEnteredName}
          onChange={(e) => {
            setUserEnteredName(e.target.value);
          }}
        />

        <TextField
          id="outlined-basic"
          label="Type"
          variant="outlined"
          sx={{ width: "50ch" }}
          select
          value={userEnteredtype}
          onChange={(e) => {
            setUserEnteredType(e.target.value);
          }}
        >
          {floorPlanTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-basic"
          label="Stories"
          variant="outlined"
          sx={{ width: "50ch" }}
          select
          value={userEnteredStories}
          onChange={(e) => {
            setUserEnteredStories(e.target.value);
          }}
        >
          {stories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-basic"
          label="Sq.Ft"
          variant="outlined"
          sx={{ width: "50ch" }}
          value={userEnteredSqft}
          onChange={(e) => {
            setUserEnteredSqft(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Bedrooms"
          variant="outlined"
          sx={{ width: "50ch" }}
          select
          value={userEnteredBedrooms}
          onChange={(e) => {
            setUserEnteredBedrooms(e.target.value);
          }}
        >
          {bedrooms.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-basic"
          label="Full Baths"
          variant="outlined"
          sx={{ width: "50ch" }}
          select
          value={userEnteredFullBaths}
          onChange={(e) => {
            setUserEnteredFullBaths(e.target.value);
          }}
        >
          {fullBaths.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-basic"
          label="Half Baths"
          variant="outlined"
          sx={{ width: "50ch" }}
          select
          value={userEnteredHalfBaths}
          onChange={(e) => {
            setUserEnteredHalfBaths(e.target.value);
          }}
        >
          {halfBaths.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-basic"
          label="Garage"
          variant="outlined"
          sx={{ width: "50ch" }}
          select
          value={userEnteredGarage}
          onChange={(e) => {
            setUserEnteredGarage(e.target.value);
          }}
        >
          {garage.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ width: "100%", textAlign: "center", marginTop: "3%" }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    [`&, &.${checkboxClasses.checked}`]: {
                      color: "#80ed99",
                    },
                  }}
                  defaultChecked
                />
              }
              label="Add to Favorite"
              value={userEnteredIsFav}
              sx={{ marginLeft: "40vw", width: "50ch" }}
              onChange={(e) => {
                setUserEnteredIsFav(e.target.checked);
              }}
            />
          </FormGroup>
        </Box>

        {/* <TextField
        id="outlined-basic"
        label="Price Range"
        variant="outlined"
        sx={{ width: "50ch" }}
      /> */}

        {/* </Box> */}
        <Box sx={{ width: "100%", textAlign: "center", marginTop: "5%" }}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ marginLeft: "30vw", marginTop: "10%", width: "100%" }}
          >
            <Button
              sx={{
                backgroundColor: "#80ed99",
                width: "50%",
                fontSize: "large",
                fontWeight: "bold",
                color: "#1f2421",
                "&:hover": {
                  background: "#9fffcb",
                },
              }}
              variant="contained"
              onClick={handleAddButton}
            >
              Add
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "#fcfffc",
                width: "50%",
                fontSize: "large",
                fontWeight: "bold",
                color: "#1f2421",
                "&:hover": {
                  background: "#fcfffc",
                },
              }}
              onClick={() => navigate(`/custom-floor-plans`)}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
