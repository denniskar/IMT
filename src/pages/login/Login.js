import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import authHeader from "../../services/auth-header";
import userService from "../../services/user.service";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import axios from "axios";
import { mdiReload } from "@mdi/js";

toast.configure();
function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  const [courntryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [sName, setSname] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [code, setCode] = useState("");

  const Reload = () => {
    setCountryCode("");
    setPhoneNumber("");
    setEmail("");
    setFirstName("");
    setSname("");
    setPassword("");
    setCountry("");
    setCode("");
    activeTabId(0);
  };

  useEffect(() => {
    userService.country().then((res) => {
      const countries = res.data.map((country) => ({
        value: country.countryCode,
        label: country.countryName,
        phoneCode: country.phonePrefix,
      }));
      console.log(countries);
      setCountryCode(countries);
    });
  }, []);

  const phoneDetails = (value) => {
    const co = value.value;
    setCountry(co);
    setPhoneNumber("+" + value.phoneCode);
    setCode(value.label);
  };

  const register = () => {
    const formData = {
      firstName: firstName,
      otherName: "",
      lastName: sName,
      email: email,
      phoneNumber: {
        phone: phoneNumber,
        countryCode: country,
      },
      password: password,
      country: code,
    };

    console.log(formData);

    axios
      .post("/api/qsend/v1/users/self-register", formData)
      .then(function (res) {
        if (res.data.status === 0) {
          // Swal.fire(
          //     '',
          //     res.data.message,
          //     'success'
          // )
          toast.success(
            " Hi,you have been registered Successfully,please Login",
            {
              position: toast.POSITION.TOP_CENTER,
            },
          );

          Reload();
        } else {
          // Swal.fire(
          //     '',
          //     res.data.message,
          //     'error'
          // )
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Qsend System</Typography>
      </div>
      <div className={classes.formContainer}>
        <Grid item xs={12} sm={6} md={6} className={classes.grid}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <Grid>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <div className={classes.formDivider} />
              </div>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forget Password
                </Button>
              </div>
            </Grid>
          )}

          {activeTabId === 1 && (
            <Grid>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>

              <TextField
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                margin="normal"
                placeholder="first Name"
                type="text"
                fullWidth
              />

              <TextField
                value={sName}
                onChange={(e) => setSname(e.target.value)}
                margin="normal"
                placeholder="Second Name"
                type="text"
                fullWidth
              />

              <Select
                onChange={phoneDetails}
                margin="normal"
                placeholder="Select Country"
                type="text"
                fullWidth
                options={courntryCode}
              />

              <TextField
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                margin="normal"
                placeholder="Phone Number"
                type="text"
                fullWidth
              />

              <TextField
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />

              <TextField
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />

              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() => register()}
                    disabled={
                      password.length === 0 ||
                      email.length === 0 ||
                      sName.length === 0 ||
                      firstName.length === 0 ||
                      courntryCode.length === 0 ||
                      phoneNumber.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create Account
                  </Button>
                )}
              </div>
            </Grid>
          )}
        </Grid>
        <Typography color="primary" className={classes.copyright}>
          © {new Date().getFullYear()}{" "}
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://lanstar.co.ke"
            rel="noopener noreferrer"
            target="_blank"
          >
            lanster
          </a>
          , All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
