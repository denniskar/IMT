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

export default function TypographyPage() {
  const [client, setClient] = useState("");
  const [storeValue, SetStoreValue] = useState("");
  const [finalOption, setFinalOption] = useState("");
  const [phone, setPhone] = useState("");
  const [unitedstates, SetUnitedStates] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [storePair, setStorePair] = useState("");
  const [afterExchage, setAfterExchane] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("");
  const [currencyLabel, setCurrencyLabel] = useState("");
  const [currencyLabel1, setCurrencyLabel2] = useState("");
  const [showScheduled, setShowScheduled] = useState(false);

  ///submit values
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [address1, setAddress1] = useState("");
  const [adress2, setAddress2] = useState("");
  const [amount, setAmount] = useState("");
  const [bFirstname, setBfirstName] = useState("");
  const [bSecondName, setBsecondname] = useState("");
  const [description, setDescription] = useState("");
  const [ftransactionTypeCode, setfTransactionTypeCode] = useState("");

  //modified select values
  const [schemess, setSchemes] = useState("");
  const [ustates, setUStates] = useState("");
  const [country, setCountry] = useState("");
  const [currencyPair, setCurrencyPair] = useState("");
  const [converted, setConverted] = useState("");
  const [country2, setcountry2] = useState("");
  //const[singleCurrency,setSingleCurrrency]=useState("");

  console.log(amount);
  toast.configure();
  useEffect(() => {
    UserService.payment().then((response) => {});
  }, []);

  useEffect(() => {
    UserService.client().then((response) => {
      const clients = response.data.map((client) => ({
        value: client.clientId,
        label: client.clientName,
      }));

      setClient(clients);
    });
  }, []);

  var classes = useStyles();

  const [cvc, setCvc] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [secondName, setSecondNmae] = useState("");

  const options = [
    { value: "1", label: "Fosa" },
    { value: "2", label: "Loan" },
    { value: "3", label: "Schemes" },
  ];

  const handleChange = (value) => {
    SetStoreValue(value.value);
  };

  const fetchSchemes = (value) => {
    const code = value.label;
    setfTransactionTypeCode(code);
    if (value.value == "3") {
      userService.schemes(storeValue).then((response) => {
        console.log(response);
        const schemes = response.data.map((scheme) => ({
          value: scheme.code,
          label: scheme.name,
        }));

        setFinalOption(schemes);
      });
    } else if (value.value == "2") {
      userService.loans(storeValue).then((response) => {
        console.log(response);
        const loans = response.data.map((loan) => ({
          value: loan.code,
          label: loan.name,
        }));

        setFinalOption(loans);
      });
    } else if (value.value === null) {
      window.alert("please select the client ");
    } else {
      return 0;
    }
  };

  const selectState = (value) => {
    setCountry(value.value);
    setcountry2(value.value);
    setPhonePrefix(value.phoneCode);
    userService.states(value.value).then((res) => {
      const states = res.data.map((state) => ({
        value: state.code,
        label: state.state,
      }));

      console.log(states);
      SetUnitedStates(states);
    });
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

  useEffect(() => {
    userService.currencyPair().then((response) => {
      const pairs = response.data.map((pair) => ({
        value: pair.id,
        label: pair.pair,
      }));
      setStorePair(pairs);
    });
  }, []);

  const currencyRate = (value) => {
    setCurrencyPair(value.label);
    const split = value.label.toString();
    const splited = split.substring(0, 3);
    const splited2 = split.substring(5, 9);
    setCurrencyLabel(splited);
    setCurrencyLabel2(splited2);
    userService.exchangeRate().then((response) => {
      console.log(response);
    });
  };

  const exchange = (e) => {
    console.log(e);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName: "lanster",
      otherName: "",
      lastName: "lanster",
      email: "lanster@lanstar.co.ke",
      phoneNumber: {
        phone: "254704033541",
        countryCode: "KE",
      },
      password: "lanster",
      country: "KENYA",
      role: "USER",
    };
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

  const scheduled = () => {
    setShowScheduled(!showScheduled);
  };

  const converter = (values) => {
    setAfterExchane(values);
    setConverted(values * 109.9);
  };

  const selectedState = (value) => {
    setUStates(value.value);
  };
  const schemes = (value) => {
    setSchemes(value.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Widget title="User Details" disableWidgetMenu>
            <div className={classes.PaymentBar}>
              <Paper className={classes.layout}>
                <Grid className={classes.paper} container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstname"
                      variant="outlined"
                      margin="normal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={(e) => setFocus(e.target.name)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Second Name "
                      name="city"
                      variant="outlined"
                      onChange={(e) => setSecondNmae(e.target.value)}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <Select
                      label="Country"
                      placeholder="Country"
                      options={countryCode}
                      onChange={selectState}
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <Select
                      fullWidth
                      placeholder="role"
                      label=" select States"
                      options={unitedstates}
                      onChange={selectedState}
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Addreess "
                      variant="outlined"
                      margin="normal"
                      onchange={(e) => setEmail1(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="phoneNumber "
                      name="city"
                      variant="outlined"
                      margin="normal"
                      onchange={(e) => setAddress2(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="password "
                      name="city"
                      type="password"
                      variant="outlined"
                      margin="normal"
                      onchange={(e) => setAddress1(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="users  tables" disableWidgetMenu>
            <div className={classes.PaymentBar}>
              <Paper className={classes.layout}>
                <Grid className={classes.paper} container spacing={2}></Grid>
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
      </Grid>
    </form>
  );
}
