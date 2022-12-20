import * as React from "react";

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
import Button from "@mui/material/Button";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const FloorPlans = ({ floorPlan }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const appUser = JSON.parse(localStorage.getItem("app_user"));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={floorPlan.name} subheader={floorPlan.type} />
      <CardMedia
        component="img"
        height="194"
        image={floorPlan.titleImage}
        alt="Floor Plans"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {floorPlan.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={(e) => {
            console.log(`add to fav clicked`);
            e.preventDefault();

            const addToFavObject = {};

            addToFavObject.userId = appUser.id;
            addToFavObject.readyToGoFloorPlanId = floorPlan.id;

            const addToFavApiCall = async () => {
              const options = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(addToFavObject),
              };

              const response = await fetch(
                `http://localhost:8088/savedFloorPlans/`,
                options
              );

              const responseFromApi = await response.json();
              console.log("add to fav posted", responseFromApi);
            };

            addToFavApiCall();
          }}
        >
          <FavoriteIcon />
        </IconButton>

        <Button
          size="small"
          onClick={() => {
            navigate(`/floor-plans/${floorPlan.id}`, { state: { floorPlan } });
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};
