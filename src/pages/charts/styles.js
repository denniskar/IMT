import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  dashedBorder: {
    border: "1px dashed",
    borderColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
  },
  text: {
    marginBottom: theme.spacing(2),
  },

  button: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  PaymentBar: {
    position: "relative",
    paddingRight: 10,
    paddingLeft: 10,
  },
  svg: {
    verticalAlign: "middle",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    padding: theme.spacing(0),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(8),
      padding: theme.spacing(0),
    },
  },
}));
