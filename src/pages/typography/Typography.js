import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField } from "@material-ui/core";
import UserService from "../../services/user.service";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
// styles
import useStyles from "./styles";

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

export default function TypographyPage() {
  const [client, setClient] = useState("");
  const [storeValue, SetStoreValue] = useState("");
  const [finalOption, setFinalOption] = useState("");
  const [phone, setPhone] = useState("");
  const [unitedstates, SetUnitedStates] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [storePair, setStorePair] = useState("");
  const [afterExchage, setAfterExchane] = useState("");

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

  const options = [
    { value: "1", label: "Fosa" },
    { value: "2", label: "Loan" },
    { value: "3", label: "Schemes" },
  ];

  const handleChange = (value) => {
    SetStoreValue(value.value);
  };

  const fetchSchemes = (value) => {
    console.log(value);
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
    userService.states(value.value).then((res) => {
      const states = res.data.map((state) => ({
        value: state.code,
        label: state.state,
      }));
      SetUnitedStates(states);
    });
  };

  useEffect(() => {
    userService.country().then((res) => {
      const countries = res.data.map((country) => ({
        value: country.countryCode,
        label: country.countryName,
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
    userService.exchangeRate().then((response) => {
      console.log(response);
    });
  };

  const exchange = (e) => {
    console.log(e);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Widget title="Personal Information" disableWidgetMenu>
            <div className={classes.PaymentBar}>
              <Paper className={classes.layout}>
                <Grid className={classes.paper} container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name "
                      name="city"
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Second Name "
                      name="city"
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <PhoneInput
                      international="true"
                      smartCaret="false"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(setPhone, selectState)}
                      fullWidth
                      required
                      variant="outlined"
                      padding={10}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Beneficiary firstName "
                      name="city"
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Beneficiary SecondName "
                      name="city"
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <button></button>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Beneficiary phone number "
                      name="city"
                      variant="outlined"
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
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Select
                      fullWidth
                      placeholder="State"
                      label=" select States"
                      options={unitedstates}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Select
                      fullWidth
                      placeholder="Currency Pair"
                      options={storePair}
                      onChange={currencyRate}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Select
                      options={client}
                      onChange={handleChange}
                      placeholder="Client"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Select
                      options={options}
                      onChange={fetchSchemes}
                      placeholder="Schemes"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Select options={finalOption} placeholder="Details" />
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="Card Details" disableWidgetMenu>
            <div className={classes.PaymentBar}>
              <Paper className={classes.layout}>
                <Grid className={classes.paper} container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Card
                      cvc={cvc}
                      number={number}
                      expiry={expiry}
                      name={name}
                      focus={focus}
                      preview="true"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="tel"
                      label="Card Number"
                      value={number}
                      name="lastName"
                      variant="outlined"
                      margin="normal"
                      onChange={(e) => setNumber(e.target.value)}
                      onFocus={(e) => setFocus(e.target.name)}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Card Name Holder"
                      name="lastName"
                      variant="outlined"
                      margin="normal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={(e) => setFocus(e.target.name)}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Card Expiry Date"
                      placeholder="mm/yy"
                      name="date"
                      // type="date"
                      defaultValue="2021-12"
                      margin="normal"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      onFocus={(e) => setFocus(e.target.name)}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Cvc"
                      name="lastName"
                      variant="outlined"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      onFocus={(e) => setFocus(e.target.name)}
                      margin="normal"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Amount"
                      name="lastName"
                      variant="outlined"
                      onChange={(e) => setAfterExchane(e.target.value)}
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Amount After Exchange"
                      name="lastName"
                      variant="outlined"
                      disabled
                      value={afterExchage * 109.1}
                      onChange={(e) => setCvc(e.target.value)}
                      onFocus={(e) => setFocus(e.target.name)}
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Brief Description"
                      name="lastName"
                      variant="outlined"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      onFocus={(e) => setFocus(e.target.name)}
                      margin="normal"
                      required
                    />
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
