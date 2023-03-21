//import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
//import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState({
    userName:"",
    password:"",
    confirmPassword:""
  });

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    setLoading(true);
   // console.log("fdf"+formData);
    if(validateInput(formData)){
      const body={
        username: formData.userName,
        password: formData.password
      }
      try{
       const res =  await axios.post(config.endpoint+"/auth/register",body)
         //console.log(response);
         if(res.status === 201){
          enqueueSnackbar("Registered successfully",{variant:'success'});
          history.push("/login")
          // window.alert("sucess");
         }
         
          //setUser
      }catch(e){
        //window.alert(e); 
        //console.log(e.response);
        
         // window.alert(e.response.data.message)
          // window.alert("sucess");
          if(e.response.status === 400){
            // console.log(e.response.data.message);
             enqueueSnackbar("Username is already taken",{variant:'error'})
            }
         else{
          enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{variant:'error'});
        }
  
      }

      setLoading(false);

    }else return;
    
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
   // console.log("data"+data.userName);
    const un = data.userName;
    const pass = data.password;
    if(un.length === 0){
      enqueueSnackbar("Username is a required field",{variant:'warning'});
      return false;
    }else if(un.length<6){
      enqueueSnackbar("Username must be at least 6 characters",{variant:'warning'});
      return false;
    }else if(pass.length === 0){
      enqueueSnackbar("Password is a required field",{variant:'warning'});
      return false;
    }else if(pass.length<6){
      enqueueSnackbar("Password must be at least 6 characters",{variant:'warning'});
      return false;
    }else if(pass!==data.confirmPassword){
      enqueueSnackbar("Passwords do not match",{variant:'warning'});
      return false;
    }
    return true;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            onChange={(e)=>setFormData({...formData, userName:e.target.value})}
            placeholder="Enter Username"
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            onChange={(e)=>setFormData({...formData, password:e.target.value})}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={(e)=>setFormData({...formData, confirmPassword:e.target.value})}
            fullWidth
          />
           {loading?<Box display="flex" justifyContent="center"><CircularProgress/></Box>:<Button className="button" onClick={()=>register(formData)} variant="contained">
            Register Now
           </Button>}
          <p className="secondary-action">
            Already have an account?{" "}
             <Link className="link" to="/login">
              Login here
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
