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
import { mdiReload, mdiVideoMinusOutline } from "@mdi/js";
import axios from "axios";
import MUIDataTable from "mui-datatables";
export default function Charts() {
  const [clientData, setClientData] = useState([]);
  useEffect(() => {
    UserService.client().then((res) => {
      setClientData(res.data);
    });
  }, []);

  const data = [
    {
      clientId: 37,
      clientName: "Test Client",
      email: "test@lansta.co.ke",
      address: "tets",
      businessNo: "",
      phoneNumber: "",
      dateCreated: "2021-04-16T13:02:37+03:00",
      lastModified: "2021-04-16T13:09:14+03:00",
    },
  ];

  const columns = [
    { name: "clientId", label: " client ID" },
    { name: "clientName", label: "Client Name" },
    { name: "email", label: " Email" },
    { name: "phoneNumber", label: "Pnumber" },
    { name: "businessNo", label: "Business No" },
    //{ name: "lastModified", label: "last MOdified" },
  ];

  //const[singleCurrency,setSingleCurrrency]=useState("");
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [registration, setRegistration] = useState("");

  const reload = () => {
    setName("");
    setClientId("");
    setAddress("");
    setPhone("");
    setCode("");
    setEmail("");
    setCountryCode("");
    setRegistration("");
  };

  const refreshPage = () => {
    window.location.reload();
  };

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
      clientName: name,
      clientId: clientId,
      address: address,
      businessRegistrationNo: registration,
      phone: {
        phone: phone,
        countryCode: code,
      },
      email: email,
      country: "Kenya",
    };

    console.log(formData);
    axios
      .post("/api/qsend/v1/clients", formData, { headers: authHeader() })
      .then(function (res) {
        if (res.data.status === 0) {
          // Swal.fire(
          //     '',
          //     res.data.message,
          //     'success'
          // )
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          reload();
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
        <Grid item xs={12} md={6}>
          <Widget title="Client Details" disableWidgetMenu>
            <div className={classes.PaymentBar}>
              <Paper className={classes.layout}>
                <Grid className={classes.paper} container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="client Name"
                      name="firstname"
                      variant="outlined"
                      value={name}
                      margin="normal"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="client Id "
                      name="city"
                      variant="outlined"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Business Registration No"
                      name="city"
                      variant="outlined"
                      value={registration}
                      onChange={(e) => setRegistration(e.target.value)}
                      margin="normal"
                      required
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <Select
                      label="Country"
                      placeholder="Country"
                      options={countryCode}
                      onChange={selectState}
                      required
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="phoneNumber "
                      variant="outlined"
                      value={phone}
                      margin="normal"
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Email "
                      name="city"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Address "
                      variant="outlined"
                      margin="normal"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
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
        <Grid item xs={12} md={6}>
          <Widget title="clients" disableWidgetMenu>
            <div className={classes.PaymentBar}>
              <MUIDataTable
                title="Transactions"
                data={clientData}
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
