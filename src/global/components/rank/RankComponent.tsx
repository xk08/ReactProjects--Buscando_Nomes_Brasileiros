import * as React from 'react';
import { Card, CardContent, Grid, Typography } from "@mui/material";

function RankComponent({ranking, nome, frequencia}) {
    return <Grid 
        item 
        xs={12} 
        sm={6} 
        md={4} 
    >
      <Card
        sx={{boxShadow: 3}}
        >
        <CardContent>
          <Typography variant="h6" component="h1">
            {ranking}
          </Typography>

          <Typography variant="body1" component="h2">
            {nome}
          </Typography>
          
          <Typography variant="body2" component="p">
            {frequencia}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
}

export default RankComponent;