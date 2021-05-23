import React from "react";
import { Grid, Paper, TextField } from "@material-ui/core";

// styles
import useStyles from "./styles";
import Select from "react-select";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";

export default function NotificationsPage() {
  var classes = useStyles();

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
                      label="Beneficiary firstName "
                      name="city"
                      variant="outlined"
                      margin="normal"
                      //   onChange={(e) => setBfirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Beneficiary SecondName "
                      name="city"
                      variant="outlined"
                      margin="normal"
                      //  onChange={(e) => setBsecondname(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address "
                      name="city"
                      variant="outlined"
                      margin="normal"
                      //    onChange={(e) => setEmail2(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <Select
                      label="Country"
                      placeholder="Country"
                      //   options={countryCode}
                      //  onChange={selectState}
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Beneficiary phone number "
                      // value={"+" + phonePrefix}
                      variant="outlined"
                      // onChage={(e) => setPhonePrefix(e.target.value)}
                      margin="normal"
                    >
                      <Select />
                    </TextField>
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <Select
                      fullWidth
                      placeholder="State"
                      label=" select States"
                      //  options={unitedstates}
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <Select
                      //  options={client}
                      //  onChange={handleChange}
                      placeholder="Client"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Select
                      //options={options}
                      //onChange={fetchSchemes}
                      placeholder="Schemes"
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <Select
                      //   options={finalOption}
                      placeholder="Details"
                      //  onChange={schemes}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Brief Description"
                      name="lastName"
                      variant="outlined"
                      //  onChange={(e) => setDescription(e.target.value)}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="payment details" disableWidgetMenu>
            <div className={classes.PaymentBar}>
              <Paper className={classes.layout}>
                <Grid className={classes.paper} container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <Select
                      fullWidth
                      placeholder="Currency Pair"
                      // options={storePair}
                      // onChange={currencyRate}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      //  label={"Enter Amount in " + currencyLabel}
                      name="lastName"
                      variant="outlined"
                      // onChange={(e) => converter(e.target.value)}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={"Amount converted to"}
                      name="lastName"
                      variant="outlined"
                      // value={afterExchage * 109.1}
                      // onChange={(e) => setAmount(e.target.value)}
                      margin="normal"
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
