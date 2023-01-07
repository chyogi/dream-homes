import React, { useState, useEffect } from "react";

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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

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

export const FloorPlans = ({ floorPlan, isFav, setFavsChanged }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);
  const [favsListToDelete, setFavsListToDelete] = React.useState([]);
  const appUser = JSON.parse(localStorage.getItem("app_user"));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setFavorite(isFav);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`floorPlan in delete api`, floorPlan);

      const favsListToDeleteFromApi = await fetch(
        `http://localhost:8088/savedFloorPlans?readyToGoFloorPlanId=${floorPlan.id}&userId=${appUser.id}`
      );

      const favsListToDeleteFromApiResponse =
        await favsListToDeleteFromApi.json();
      setFavsListToDelete(favsListToDeleteFromApiResponse);
      console.log(
        "favs list to delete from api",
        favsListToDeleteFromApiResponse
      );
    };
    fetchData();
  }, [favorite]);

  return (
    <Card sx={{ maxWidth: 345, background: "#f1f7ee" }}>
      <CardHeader title={floorPlan.name} subheader={floorPlan.type} />
      <CardMedia
        component="img"
        height="250"
        image={floorPlan.titleImage}
        alt="Floor Plans"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`${floorPlan.description.substring(0, 150)} ....`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={(e) => {
            console.log(`fav button clicked`);
            e.preventDefault();

            if (setFavsChanged) setFavsChanged(favsListToDelete);

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

            const deleteFavApiCall = async () => {
              const options = {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              };

              for (const fav of favsListToDelete) {
                console.log(`fav to be deleted`, fav);
                const response = await fetch(
                  `http://localhost:8088/savedFloorPlans/${fav.id}`,
                  options
                );

                const responseFromApi = await response.json();
                console.log("fav deleted", responseFromApi);
              }
            };

            if (!favorite) {
              addToFavApiCall();
              setFavorite(true);
            } else {
              deleteFavApiCall();
              setFavorite(false);
            }
          }}
        >
          {favorite ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
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
