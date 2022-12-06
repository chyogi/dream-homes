import { Outlet, Route, Routes } from "react-router-dom";

export const RegisteredUserViews = () => {
 return (
   <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Welcome, Registered User</h1>

            <Outlet />
          </>
        }
      >
        <Route path="account-home" element={<hi>account home</hi>} />
        <Route path="floor-plans" element={<hi>floor plans</hi>} />
        <Route path="about-us" element={<hi>about us</hi> } />
        <Route path="profile" element={<hi>profile</hi>} />
      </Route>
    </Routes>
 
 )

}