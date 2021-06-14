import React, { useState, useEffect } from "react";
import { Checkbox, Grid, Paper, TextField } from "@material-ui/core";
import UserService from "../../services/user.service";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// styles
import useStyles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import authHeader from "../../services/auth-header";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import Select from "react-select";
import userService from "../../services/user.service";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-input-2/lib/style.css";
import { mdiVideoMinusOutline } from "@mdi/js";
import axios from "axios";
import MUIDataTable from "mui-datatables";
export default function TypographyPage() {
  //const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    userService.users().then((res) => {
      console.log(res.data);
      setUserData(res.data);
    });
  }, []);
  const data = [
    {
      status: "Active",
      phoneNumber: "254704034231",
      roles: {
        role: "USER",
        privileges: [],
      },
      email: "test1@lanstar.co.ke",
      dateCreated: "2021-04-16 11:57:03",
      firstName: "Test",
      otherName: "",
      lastName: "Test",
      id: 6,
      country: "Kenya",
    },
  ];

  const modifiedData = userData.map((datas) => ({
    firstName: datas.firstName,
    lastName: datas.lastName,
    roles: datas.roles.role,
    email: datas.email,
    country: datas.country,
    date: datas.dateCreated,
    status: datas.status,
    phoneNumber: datas.phoneNumber,
  }));

  const columns = [
    { name: "firstName", label: " fName" },
    { name: "lastName", label: "LName" },
    { name: "roles", label: " Role" },
    { name: "phoneNumber", label: "Pnumber" },
    { name: "country", label: " country" },
    { name: "status", label: "status" },
  ];

  //const[singleCurrency,setSingleCurrrency]=useState("");
  const [name, setName] = useState("");
  const [sname, setSecond] = useState("");
  const [passwordi, setPasswordi] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  var classes = useStyles();

  const options = [
    { value: "1", label: "USER" },
    { value: "2", label: "ADMIN" },
    { value: "3", label: "CLIENTADMIN" },
    { value: "4", label: "CLIENTUSER" },
  ];

  const selectState = (value) => {
    console.log(value);
    setCountry(value.label);
    setCode(value.value);
    setPhone("+" + value.phoneCode);
  };

  const handleRoles = (values) => {
    console.log(values.label);
    setRoles(values.label);
  };

  useEffect(() => {
    userService.country().then((res) => {
      const countries = res.data.map((country) => ({
        value: country.countryCode,
        label: country.countryName,
        phoneCode: country.phonePrefix,
      }));
      setCountryCode(countries);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName: name,
      otherName: "",
      lastName: sname,
      email: email,
      phoneNumber: {
        phone: phone,
        countryCode: code,
      },
      password: passwordi,
      country: country,
      role: roles,
    };

    console.log(formData);
    axios
      .post("/api/qsend/v1/users", formData, { headers: authHeader() })
      .then(function (res) {
        if (res.data.status === 0) {
          // Swal.fire(
          //     '',
          //     res.data.message,
          //     'success'
          // )
          toast.success(res.data.status, {
            position: toast.POSITION.TOP_CENTER,
          });
          // reset for
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
      });

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={true}>
          <Widget title="User Details" disableWidgetMenu>
            <div className={classes.PaymentBar}>
              <Paper className={classes.layout}>
                <Grid className={classes.paper} container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstname"
                      variant="outlined"
                      value={name}
                      margin="normal"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Second Name "
                      name="city"
                      variant="outlined"
                      value={sname}
                      onChange={(e) => setSecond(e.target.value)}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Select
                      label="Country"
                      placeholder="Country"
                      options={countryCode}
                      onChange={selectState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Select
                      fullWidth
                      placeholder="role"
                      label=" select States"
                      options={options}
                      onChange={handleRoles}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="phoneNumber "
                      variant="outlined"
                      value={phone}
                      margin="normal"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email "
                      name="city"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="password "
                      type="password"
                      variant="outlined"
                      margin="normal"
                      value={passwordi}
                      onChange={(e) => setPasswordi(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Paper>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12} md={true}>
          <Widget title="users  tables" disableWidgetMenu>
            <div className={classes.PaymentBar}>
              <MUIDataTable
                title="Transactions"
                data={modifiedData}
                columns={columns}
                options={{
                  filterType: "checkbox",
                  rowsPerPage: 6,
                }}
              />
            </div>
          </Widget>
        </Grid>
      </Grid>
    </form>
  );
}
