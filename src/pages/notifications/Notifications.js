import React from "react";
import { Grid, Paper, TextField } from "@material-ui/core";

// styles
import useStyles from "./styles";

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
                      label="First Name "
                      name="city"
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                    <TextField
                      fullWidth
                      label="Address 1"
                      name="city"
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Address 2"
                      name="city"
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="city"
                      variant="outlined"
                      margin="normal"
                      required
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      name="lastName"
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="CSV"
                      name="lastName"
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Card Expiry Date"
                      name="date"
                      // type="date"
                      defaultValue="2021-12"
                      margin="normal"
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
