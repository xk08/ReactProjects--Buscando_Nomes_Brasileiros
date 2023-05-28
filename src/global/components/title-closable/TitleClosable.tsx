import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

function TitleClosable({ verify, onClick, title }) {
  return (
    <Grid item xs={12} onClick={onClick}>
      {verify ? (
        <Button variant="text" endIcon={<ArrowDropDownCircleIcon style={{ transform: "rotate(180deg)" }} />} style={{ fontSize: "18px", border: "none", outline: "none", color: "black" }}>
          <Typography variant="h5" component="h2">
            {title ? title[0] : ""}
            <span style={{ textTransform: "lowercase" }}>{title ? title.slice(1) : ""}</span>
          </Typography>
        </Button>
      ) : (
        <Button variant="text" endIcon={<ArrowDropDownCircleIcon />} style={{ fontSize: "18px", border: "none", outline: "none", color: "black" }}>
          <Typography variant="h5" component="h2" style={{ fontWeight: 700 }}>
            {title ? title[0] : ""}
            <span style={{ textTransform: "lowercase" }}>{title ? title.slice(1) : ""}</span>
          </Typography>
        </Button>
      )}
    </Grid>
  );
}

export default TitleClosable;
