import { Outlet, Route, Routes } from "react-router-dom";
import { CustomFloorPlanForm } from "../customFloorPlans/CustomFloorPlanForm";
import { CustomFloorPlansList } from "../customFloorPlans/CustomFloorPlansList";
import { EditCustomFloorPlan } from "../customFloorPlans/EditCustomFloorPlan";
import FloorPlanDetails from "../floorPlans/FloorPlanDetails";
import { FloorPlans } from "../floorPlans/FloorPlans";
import { FloorPlansList } from "../floorPlans/FloorPlansList";
import { Home } from "../home/Home";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AboutUs } from "../home/AboutUs";
import Profile from "../profile/Profile";

export const RegisteredUserViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Box>
            <Box>
              <Outlet />
            </Box>

            <Box
              sx={{
                // marginTop: "10vh",
                height: "10vh",
                backgroundColor: "#0d0a0b",
                color: "#ffffff",
              }}
            >
              <Typography
                variant="caption"
                gutterBottom
                sx={{
                  textAlign: "center",
                  marginLeft: "40%",
                  marginTop: "50%",
                }}
              >
                © 2022 Dream Homes. All Rights Reserved.
              </Typography>
            </Box>
          </Box>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="floor-plans" element={<FloorPlansList />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="custom-floor-plans" element={<CustomFloorPlansList />} />
        <Route
          path="custom-floor-plans/add"
          element={<CustomFloorPlanForm />}
        />
        <Route
          path="custom-floor-plans/edit"
          element={<EditCustomFloorPlan />}
        />
        <Route path="floor-plans/:floorPlanId" element={<FloorPlanDetails />} />
      </Route>
    </Routes>
  );
};
