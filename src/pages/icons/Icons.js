import {
  Button,
  Grid,
  makeStyles,
  Paper,
  LinearProgress,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import UserService from "../../services/user.service";
import { TextInput } from "../../components/controls/FormControls";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
  },
}));

const schema = yup.object().shape({
  clientId: yup.string().required("Field is required"),

  email: yup.string().required("Field is required"),

  clientName: yup
    .string()
    .required("Field is required")
    .test("len", "Must be more than 1 characters", (val) => val.length > 1)
    .matches(/^([^0-9]*)$/, "Field cannot contain numbers"),
});

toast.configure();

const MemberMainBanks = () => {
  const classes = useStyles();

  const values = {
    clientId: "",
    clientName: "",
    email: "",
    businessNo: "",
    phoneNumber: "",
    lastModified: "",
  };

  const [selected, setSelected] = useState(values);
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(true);

  const { handleSubmit, errors, reset, control, setValue } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: values,
  });

  const columns = [
    { name: "clientId", label: "Client Id" },
    { name: "clientName", label: "client Name" },
    { name: "email", label: "Email" },
    { name: "businessNo", label: "Business Number" },
    { name: "phoneNumber", label: "phoneNumber" },
    { name: "lastModified", label: "last modified" },
  ];

  const tableOptions = {
    filter: false,
    download: false,
    print: true,
    viewColumns: false,
    elevation: 0,
    selectableRows: "single",
    selectableRowsOnClick: true,
    selectToolbarPlacement: "none",
    onRowSelectionChange: (row, all, rows) => {
      if (rows.length > 0) {
        let current = data[rows[0]];
        setSelected(current);

        Object.keys(current).map((key) => {
          setValue(key, current[key]);
        });
      } else {
        newRecord();
      }
    },
  };

  const newRecord = () => {
    setSelected(values);
    reset(values);
  };

  const deleteRecord = () => {
    Swal.fire({
      text: "Do you want to Delete record => " + selected.clientName + "?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("fxt-maintenance/v1/deleteBank", {
            clientId: selected.clientId,
          })
          .then((res) => {
            if (res.data.status === 0) {
              // Swal.fire(
              //     '',
              //     'Record successfully deleted',
              //     'success'
              // )
              toast.success(res.data.message, {
                position: toast.POSITION.TOP_CENTER,
              });

              newRecord();
              fetchAll();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const save = (data) => {
    console.log(123);
    axios
      .post("/api/qsend/v1/ /clients", data)
      .then(function (res) {
        isLoading(false);

        if (res.data.status === 0) {
          // Swal.fire(
          //     '',
          //     res.data.message,
          //     'success'
          // )
          toast.success(res.data.status, {
            position: toast.POSITION.TOP_CENTER,
          });

          // reset form
          newRecord();
          fetchAll();
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
      })
      .catch(function (error) {
        isLoading(false);
        console.log(error);
      });
  };

  const onSubmit = (formData) => {
    var edit = selected.clientId;

    var data = {
      oldBankCode: edit,
      ...formData,
    };

    if (edit) {
      Swal.fire({
        text: "Do you want to update record => " + selected.clientName + "?",
        icon: "warning",
        reverseButtons: true,
        showCancelButton: true,
        focusCancel: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          save(data);
        }
      });
    } else {
      save(data);
    }
  };

  const fetchAll = () => {
    UserService.client()
      .then(function (res) {
        // console.log(JSON.stringify(res.data));
        console.log(res.data);
        setData(res.data);
        isLoading(false);
      })
      .catch(function (error) {
        isLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextInput
                      control={control}
                      error={!!errors.clientId}
                      helperText={errors?.clientId?.message}
                      label="client Id"
                      name="clientId"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextInput
                      control={control}
                      //  error={!!errors.clientName}
                      //helperText={errors?.clientName?.message}
                      label="Client Name"
                      name="clientName"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextInput
                      control={control}
                      // error={!!errors.email}
                      //  helperText={errors?.email?.message}
                      label="Email"
                      name="email"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextInput
                      control={control}
                      // error={!!errors.businessNo}
                      // helperText={errors?.businessNo?.message}
                      label="Account Length"
                      name="Business Number"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextInput
                      control={control}
                      // error={!!errors.phoneNumber}
                      // helperText={errors?.phoneNumber?.message}
                      label="Phone Number"
                      name="phoneNumber"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextInput
                      control={control}
                      //  error={!!errors.lastModified}
                      //  helperText={errors?.lastModified?.message}
                      label=" Address "
                      name="lastModified"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {selected.clientId ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          deleteRecord();
                        }}
                        fullWidth
                      >
                        Delete
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      onClick={() => {
                        newRecord();
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      fullWidth
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item md={12}>
                    {loading ? (
                      <LinearProgress />
                    ) : (
                      <MUIDataTable
                        data={data}
                        columns={columns}
                        options={tableOptions}
                      />
                    )}
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default MemberMainBanks;
