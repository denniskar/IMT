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

export default function TypographyPage() {
  const [client, setClient] = useState("");

  useEffect(() => {
    UserService.payment().then((response) => {
      console.log(response);
    });
  }, []);

  useEffect(() => {
    UserService.client().then((response) => {
      const clients = response.data.map((client) => ({
        value: client.clientId,
        label: client.clientName,
      }));
      console.log(clients);
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
    console.log(value.value);
  };

  return (
    <>
      <PageTitle title="payments" />
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
                    <TextField
                      fullWidth
                      label="Other Name "
                      name="city"
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number "
                      name="city"
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label=" Email Address"
                      name="city"
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="country Name"
                      name="city"
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="state"
                      name="city"
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Select options={client} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Select options={options} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Select options={options} onChange={handleChange} />
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
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
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
                </Grid>
              </Paper>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
