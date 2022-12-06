import { GuestUserViews } from "./GuestUserViews";
import { RegisteredUserViews } from "./RegisteredUserViews";

export const ApplicationViews = () => {
  const appUser= localStorage.getItem("app_user");
  const appUserObject = JSON.parse(appUser);

  if (appUserObject.isRegisteredUser) {
    return <RegisteredUserViews />;
    
  }
  else {

    return <GuestUserViews />;
  }

  
};
