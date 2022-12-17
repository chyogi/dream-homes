import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

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

export const EditCustomFloorPlan = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [userEnteredName, setUserEnteredName] = useState("");
  const [userEnteredtype, setUserEnteredType] = useState("");
  const [userEnteredStories, setUserEnteredStories] = useState("");
  const [userEnteredSqft, setUserEnteredSqft] = useState("");
  const [userEnteredBedrooms, setUserEnteredBedrooms] = useState("");
  const [userEnteredFullBaths, setUserEnteredFullBaths] = useState("");
  const [userEnteredHalfBaths, setUserEnteredHalfBaths] = useState("");
  const [userEnteredGarage, setUserEnteredGarage] = useState("");
  const [userEnteredIsFav, setUserEnteredIsFav] = useState(true);

  const handleSaveChanges = (e) => {
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
    customFloorPlanObject.price = 100000;

    console.log(customFloorPlanObject);

    const putDataToDB = async () => {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customFloorPlanObject),
      };

      const response = await fetch(
        `http://localhost:8088/customFloorPlans/${state?.id}`,
        options
      );

      const responseFromApi = await response.json();
      navigate(`/custom-floor-plans`);
    };

    putDataToDB();
  };

  useEffect(() => {
    console.log(state);
    setUserEnteredName(state?.name);
    setUserEnteredType(state?.type);
    setUserEnteredStories(state?.stories);
    setUserEnteredSqft(state?.sqFt);
    setUserEnteredBedrooms(state?.bedrooms);
    setUserEnteredFullBaths(state?.fullBaths);
    setUserEnteredHalfBaths(state?.halfBaths);
    setUserEnteredGarage(state?.garage);
    setUserEnteredIsFav(state?.is);
  }, [state]);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "50ch" },
        marginLeft: "20%",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h3" gutterBottom>
        Edit custom floor plan
      </Typography>
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
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Add to Favorite"
          value={userEnteredIsFav}
          onChange={(e) => {
            setUserEnteredIsFav(e.target.checked);
          }}
        />
      </FormGroup>

      {/* <TextField
        id="outlined-basic"
        label="Price Range"
        variant="outlined"
        sx={{ width: "50ch" }}
      /> */}

      {/* </Box> */}
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={handleSaveChanges}>
          Save Changes
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(`/custom-floor-plans`)}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};
