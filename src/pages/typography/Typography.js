import React, { useState, useEffect } from "react";
import { Checkbox, Grid, Paper, TextField } from "@material-ui/core";
import UserService from "../../services/user.service";
//import Card from "react-credit-cards";
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
import { mainSchema } from "../validations/formValidation";
import LocalError from "../validations/error";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Formik, Form, Field } from "formik";
import Card from "./card/Card";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./card/CardUtils";

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
  const [prefix, setPprefix] = useState("");
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");

  //modified select values
  const [schemess, setSchemes] = useState("");
  const [ustates, setUStates] = useState("");
  const [country, setCountry] = useState("");
  const [currencyPair, setCurrencyPair] = useState("");
  const [converted, setConverted] = useState("");
  const [country2, setcountry2] = useState("");
  //const[singleCurrency,setSingleCurrrency]=useState("");

  toast.configure();

  const reload = () => {
    setEmail1("");
    setEmail2("");
    setAddress1("");
    setAddress2("");
    setAmount("");
    setBfirstName("");
    setBsecondname("");
    setDescription("");
    setfTransactionTypeCode("");
    setPprefix("");
    setCountry("");
    setConverted("");
    setcountry2("");
  };

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
    { value: "1", label: "FOSA" },
    { value: "2", label: "LOAN" },
    { value: "3", label: "SCHEME" },
  ];

  const handleChange = (value) => {
    SetStoreValue(value.value);
  };

  const fetchSchemes = (value) => {
    const code = value.label;
    setfTransactionTypeCode(code);
    if (value.value == "3") {
      userService.schemes(storeValue).then((response) => {
        const schemes = response.data.map((scheme) => ({
          value: scheme.code,
          label: scheme.name,
        }));

        setFinalOption(schemes);
      });
    } else if (value.value == "2") {
      userService.loans(storeValue).then((response) => {
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
    console.log(value);
    console.log(value.value);
    setCountry(value.value);
    setCode1(value.label);

    setPhonePrefix("+" + value.phoneCode);

    userService.states(value.value).then((res) => {
      const states = res.data.map((state) => ({
        value: state.code,
        label: state.state,
      }));

      console.log(states);
      SetUnitedStates(states);
    });
  };
  const selectCountry = (value) => {
    setPprefix("+" + value.phoneCode);
    setcountry2(value.value);
    setCode2(value.label);
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
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = {
      purposeOfFund: description,
      transactionType: ftransactionTypeCode, // only allows  FOSA,LOAN,SCHEME
      transactionTypeCode: schemess, // if transactionType is FOSA,leave blank else provide either schemeCode or loanTypeCode
      email: email1,
      amount: converted,
      currencyPair: currencyPair,
      exchangeRate: 107.1,
      beneficiary: {
        firstName: bFirstname,
        lastName: bSecondName,
        clientId: storeValue, // clientId of client to which beneficiary belongs
        phone: {
          phone: prefix,
          countryCode: country2,
        },
      },
      billingInformation: {
        cardData: {
          creditCardNumber: number, // takes a valid credit card number
          cardSecurityCode: cvc, // card CVC - 3 digits long
          expiryDate: expiry, // card expiry date in the format MM/YY
        },
        firstName: name,
        lastName: secondName,
        phone: {
          phone: phonePrefix,
          countryCode: country,
        },
        currency: currencyLabel1, // retrieve from currency pair in question
        state: ustates, // if country is US ,use USA states
        country: code1,
        address1: address1,
        address2: adress2,
      },
    };

    axios
      .post("/api/qsend/v1/transactions", formData, { headers: authHeader() })
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
    <Formik
      initialValues={{
        firstName: "",
        email: "",
      }}
      validationSchema={mainSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={true}>
              <Widget title="Sender Information" disableWidgetMenu>
                <div className={classes.layout}>
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
                        label="First Name"
                        name="firstName"
                        variant="outlined"
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={(e) => setFocus(e.target.name)}
                      />
                    </Grid>
                    <LocalError
                      touched={touched.firstName}
                      error={errors.firstName}
                    />
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Second Name "
                        name="name"
                        variant="outlined"
                        onChange={(e) => setSecondNmae(e.target.value)}
                        margin="normal"
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
                        placeholder="State"
                        label=" select States"
                        options={unitedstates}
                        onChange={selectedState}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label=" phone number "
                        value={phonePrefix}
                        onChange={(e) => setPhonePrefix(e.target.value)}
                        margin="normal"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Addreess "
                        variant="outlined"
                        margin="normal"
                        name="email"
                        value={email1}
                        onChange={(e) => setEmail1(e.target.value)}
                      />
                      <LocalError
                        touched={touched.email}
                        error={errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Address 1 "
                        id="outlined-basic"
                        name="city"
                        variant="outlined"
                        margin="normal"
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Address 2 "
                        name="city"
                        variant="outlined"
                        margin="normal"
                        onChange={(e) => setAddress2(e.target.value)}
                        helperText={errors.email?.message}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Select
                        fullWidth
                        placeholder="Currency Pair"
                        options={storePair}
                        onChange={currencyRate}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={"Enter Amount in " + currencyLabel}
                        name="lastName"
                        variant="outlined"
                        onChange={(e) => converter(e.target.value)}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={"Amount converted to" + currencyLabel1}
                        name="lastName"
                        variant="outlined"
                        value={afterExchage * 109.1}
                        onChange={(e) => setAmount(e.target.value)}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </div>
              </Widget>
            </Grid>
            <Grid item xs={12} md={true}>
              <Widget title="Beneficiary Details" disableWidgetMenu>
                <div>
                  <Paper className={classes.layout}>
                    <Grid className={classes.paper} container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Beneficiary firstName "
                          name="city"
                          variant="outlined"
                          margin="normal"
                          onChange={(e) => setBfirstName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Beneficiary SecondName "
                          name="city"
                          variant="outlined"
                          margin="normal"
                          onChange={(e) => setBsecondname(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address "
                          name="city"
                          variant="outlined"
                          margin="normal"
                          onChange={(e) => setEmail2(e.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Select
                          label="Country"
                          placeholder="Country"
                          options={countryCode}
                          onChange={selectCountry}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Beneficiary phone number "
                          value={prefix}
                          variant="outlined"
                          onChange={(e) => setPprefix(e.target.value)}
                          margin="normal"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Select
                          options={client}
                          onChange={handleChange}
                          placeholder="Client"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Select
                          options={options}
                          onChange={fetchSchemes}
                          placeholder="Schemes"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Select
                          options={finalOption}
                          placeholder="Details"
                          onChange={schemes}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Brief Description"
                          name="lastName"
                          onChange={(e) => setDescription(e.target.value)}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div>
                          <input
                            type="checkbox"
                            checked={showScheduled}
                            onChange={scheduled}
                          />

                          <span>schedule payment</span>
                          {showScheduled && (
                            <Grid item xs={12} sm={12}>
                              <TextField
                                fullWidth
                                label=" "
                                type="date"
                                name="city"
                                variant="outlined"
                                margin="normal"
                              />
                              <input type="checkbox" /> <span>every month</span>
                            </Grid>
                          )}
                        </div>
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
          </Grid>
        </form>
      )}
    </Formik>
  );
}
