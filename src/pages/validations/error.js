import * as React from "react";
import Box from "@material-ui/core/Box";

const LocalError = ({ error }) => {
  if (error) {
    return <Box color="error.main">{error}</Box>;
  }
  return <div />;
};

export default LocalError;
