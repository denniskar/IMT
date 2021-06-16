import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import userService from "../../services/user.service";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import axios from "axios";

// data
import mock from "../dashboard/mock";
const user = JSON.parse(localStorage.getItem("user"));

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

export default function Tables() {
  const [userData, setUserData] = useState([]);

  const data = [
    {
      id: 4,
      transactionReference: "5622808806225903",
      payer: {
        name: "Agnes Kisaya",
        phone: "254 704 034231",
        email: "test@gmail.com",
        country: "USA",
        creditCardNumber: "***************1890",
      },
      beneficiary: {
        name: "Andrew KISANGA",
        phone: "254 796 774343",
      },
      currency: {
        currency: "USD",
        exchangeRate: 107.83,
        currencyPair: "USD - KES",
      },
      amount: 10.0,
      purposeOfFunds: "scheme contribution",
      transactionType: "LOAN",
      transactionTypeCode: "nn",
      status: "SUCCESS",
      comment: "Paid Out",
      dateTransacted: "2021-04-20 18:35:05",
      client: "Test Client",
    },
  ];

  const modifiedData = userData.map((datas) => ({
    amount: datas.amount,
    payer: datas.payer.name,
    beneficiary: datas.beneficiary.name,
    beneficiaryPhone: datas.beneficiary.phone,
    currencyPair: datas.currency.currencyPair,
    transactionType: datas.transactionType,
    transactionTypeCode: datas.transactionTypeCode,
    date: datas.dateTransacted,
    status: datas.status,
    client: datas.client,
    purposeOfFunds: datas.purposeOfFunds,
    comment: datas.comment,
  }));

  const columns = [
    { name: "date", label: " Date" },
    { name: "payer", label: "Payer" },
    { name: "beneficiary", label: "Beneficiary Name" },
    /// { name: "beneficiaryPhone", label: "Benef Phone" },
    { name: "amount", label: "Amount" },
    { name: "currencyPair", label: "Currency Pair" },
    { name: "client", label: "client" },
    { name: "transactionType", label: "Trans Type" },
    { name: "transactionTypeCode", label: "trs code" },
    { name: "status", label: "Status" },
    // { name: "comment", label: "comment" },
  ];

  useEffect(() => {
    userService.userTransactions(user.data.id).then((res) => {
      console.log(res.data.data);
      setUserData(res.data.data);
    });
  }, []);

  const classes = useStyles();
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Transactions"
            data={modifiedData}
            columns={columns}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
