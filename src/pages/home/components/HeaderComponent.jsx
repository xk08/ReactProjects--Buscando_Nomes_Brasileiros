import { Grid } from "@mui/material";

function HeaderComponent() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h1 style={{ margin: 0 }}>
          Nomes{" "}
          <span style={{ display: "inline-block" }}>
            Brazukas
            <span
              style={{
                display: "block",
                height: "4px",
                background: "linear-gradient(to right, #009735, #F6D900)",
              }}
            />
          </span>
        </h1>
      </Grid>
    </Grid>
  );
}

export default HeaderComponent;
