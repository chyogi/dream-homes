export const ApplicationViews = () => {
  const appUser= localStorage.getItem("app_user");
  const appUserObject = JSON.parse(appUser);

  if (appUserObject.isRegisteredUser) {
    return "<h1>Welcome Registered User!!</h1>";
    
  }
  else {

    return "<h1>Welcome Guest User!!</h1>";
  }

  
};
