import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { //Avatar, 
  Button, Stack } from "@mui/material";
//import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
 // console.log("children",children.searchBox);
  const history = useHistory();
  //  console.log("Auth buttons"+hasHiddenAuthButtons);
  let user = localStorage.getItem("username");

  // const userLogOut = () => {
  //   localStorage.clear();
  //   history.push("/");
  // };
  //console.log(user.length);
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      <div>
      {children}
      </div>
      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
          Back to explore
        </Button>
      ) : (
        <div>
          {user !== null ? (
            <Stack direction="row">
              <img src="avatar.png" alt={user} />
              <h5>{user}</h5>
              <Button
                name="logout"
                onClick={() => {
                  localStorage.clear();
                  history.push("/");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </Stack>
          ) : (
            <Stack direction="row">
              <Button onClick={() => history.push("/login")}>Login</Button>
              <Button
                onClick={() => history.push("/register")}
                variant="contained"
              >
                Register
              </Button>
            </Stack>
          )}
        </div>
      )}
    </Box>
  );
};

export default Header;
