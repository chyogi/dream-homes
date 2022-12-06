import { GuestUserNav } from "./GuestUserNav";
import { RegisteredUserNav } from "./RegisteredUserNav";

export const NavBar = () => {
    const appUser= localStorage.getItem("app_user");
  const appUserObject = JSON.parse(appUser);

  if (appUserObject.isRegisteredUser) {
    return <RegisteredUserNav />;
    
  }
  else {

    return <GuestUserNav />;
  }

 
 
    
    
}