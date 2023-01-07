import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Login.css";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "app_user",
            JSON.stringify({
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              isRegisteredUser: true,
            })
          );

          navigate("/home");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  const guestUserClickHandler = () => {
    localStorage.setItem(
      "app_user",
      JSON.stringify({
        isRegisteredUser: false,
      })
    );
  };

  return (
    <main className="container--login">
      <h1 className="app--header">
        {" "}
        <img
          className="app--logo--title"
          src="images/logo-2.png"
          alt="company logo"
        ></img>
      </h1>
      <section className="form--login">
        <form onSubmit={handleLogin}>
          <h4>Please sign in</h4>
          <div className="form--item">
            <TextField
              type="email"
              required
              id="outlined-required"
              label="Email"
              InputLabelProps={{
                style: { color: "#000000" },
              }}
              className="form-control"
              onChange={(evt) => set(evt.target.value)}
              defaultValue={email}
              sx={{ width: "50vw", height: "auto" }}
            />
          </div>

          <div className="form--item">
            <Button
              sx={{
                backgroundColor: "#80ed99",
                width: "30%",
                fontSize: "large",
                fontWeight: "bold",
                color: "#1f2421",
                "&:hover": {
                  background: "#9fffcb",
                },
              }}
              type="submit"
              variant="contained"
            >
              Sign in
            </Button>
          </div>
        </form>

        <section>
          <Link className="link--register" to="/register">
            Create an account
          </Link>
        </section>

        {/* <section>
          <Link
            className="link--guest--user"
            to="/"
            onClick={guestUserClickHandler}
          >
            Continue Without Loging In
          </Link>
        </section> */}
      </section>
    </main>
  );
};
