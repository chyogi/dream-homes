

import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FloorPlans } from "./FloorPlans";
import "./FloorPlans.css"

export const FloorPlansList = () => {
    const [floorPlanList, setFloorPlanList] = useState([])

    useEffect(
    () => {
      
      const fetchData = async () => {
        const response = await fetch(`http://localhost:8088/readyToGoFloorPlans`);
        const floorPlanListFromAPI = await response.json();
        setFloorPlanList(floorPlanListFromAPI)
      };
      fetchData();
    },
    [] // When this array is empty, you are observing initial component state
  );


    return <>
    <section className="floorplan--container">
        {
            floorPlanList.map((floorPlan) => {
                return (
                    <FloorPlans className="floorplan--item" key={floorPlan.id} props={floorPlan} />
                        

                
                )
            }
            )


        }

    </section>
    
    </>


}