import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
import userService from "../../services/user.service";

export default function Icons() {
  const [transactionData, setTransaction] = useState([]);

  useEffect(() => {
    userService.transaction().then((res) => {
      setTransaction(res.data.data);
    });
  }, []);

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

  const modifiedData = transactionData.map((datas) => ({
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
    { name: "beneficiaryPhone", label: "BeneficiaryPhone" },
    { name: "amount", label: "Amount" },
    { name: "currencyPair", label: "Currency Pair" },
    { name: "client", label: "client" },
    { name: "transactionType", label: "Trans Type" },
    { name: "transactionTypeCode", label: "trs code" },
    { name: "status", label: "Status" },
    { name: "comment", label: "comment" },
  ];

  const useStyles = makeStyles((theme) => ({
    tableOverflow: {
      overflow: "auto",
    },
  }));

  const classes = useStyles();
  return (
    <>
      <PageTitle title="Transactions Table" />
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
