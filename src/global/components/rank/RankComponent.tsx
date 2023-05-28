import * as React from "react";
import { Card, CardContent, Grid, Typography, Divider } from "@mui/material";

function RankComponent({ ranking, nome, frequencia }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="body1" component="p" align="center" color="textSecondary">
            Ranking: {ranking}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography variant="h5" component="h5" align="center" color="primary">
            {nome}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography variant="body1" component="p" align="center" color="textSecondary">
            Frequência: {frequencia}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default RankComponent;
