import { Grid, Typography } from "@mui/material";

function FooterComponent() {
  return (
    <Grid content>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2">
          Rodapé da página
        </Typography>
      </Grid>
    </Grid>
  );
}
export default FooterComponent;
