import NameSection from "./sections/NameSection/NameSection";
import RankingSection from "./sections/RankingSection/RankingSection";
import HeaderSection from "./sections/HeaderSection/HeaderSection";
import FooterSection from "./sections/FooterSection/FooterSection";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HeaderSection />
        </Grid>

        <Grid item xs={12}>
          <RankingSection />
        </Grid>

        <Grid item xs={12}>
          <br />
          <NameSection />
        </Grid>

        <Grid item xs={12}>
          <FooterSection />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
