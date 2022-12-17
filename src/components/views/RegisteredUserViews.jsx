import { Outlet, Route, Routes } from "react-router-dom";
import { CustomFloorPlanForm } from "../customFloorPlans/CustomFloorPlanForm";
import { CustomFloorPlansList } from "../customFloorPlans/CustomFloorPlansList";
import { EditCustomFloorPlan } from "../customFloorPlans/EditCustomFloorPlan";
import FloorPlanDetails from "../floorPlans/FloorPlanDetails";
import { FloorPlans } from "../floorPlans/FloorPlans";
import { FloorPlansList } from "../floorPlans/FloorPlansList";

export const RegisteredUserViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Welcome to Dream Homes</h1>

            <Outlet />
          </>
        }
      >
        <Route path="home" element={<h1>home</h1>} />
        <Route path="floor-plans" element={<FloorPlansList />} />
        <Route path="about-us" element={<h1>about us</h1>} />
        <Route path="profile" element={<h1>profile</h1>} />
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
