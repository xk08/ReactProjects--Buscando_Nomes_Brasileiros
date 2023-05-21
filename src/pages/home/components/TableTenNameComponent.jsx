import formatNumberWithDots from '../../../global/format_number_with_dots';
import ErrorTextComponent from '../../../global/components/ErrorTextComponent';
import LoadingSkeletonComponent from '../../../global/components/animations/SkeletonLoader/LoadingSkeletonComponent';
import RankComponent from '../../../global/components/rank/RankComponent';
import * as React from 'react';
import { Grid } from '@mui/material';

const rankingNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function TableTenNamesComponent(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Top 10 nomes brasileiros filtrados</h2>
      </Grid>

      {props.isLoading ? (

        <>
          {rankingNumber.map((ranking) => (
            <Grid
              key={ranking}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <LoadingSkeletonComponent
                exibeThreeNamesCardSkeleton={true}
                exibeNameDataCardSkeleton={false}
              />
            </Grid>
          ))}
        </>

      ) : props.apiDataOk ? (
        props.apiRankingTenNames.map((dados) => (
          <RankComponent
            key={dados.ranking}
            ranking={dados.ranking}
            nome={dados.nome}
            frequencia={formatNumberWithDots(dados.frequencia)}
          ></RankComponent>
        ))
      ) : <ErrorTextComponent title={"Informação desconhecida"} description="Não foi possível encontrar o Ranking de Top 10 nomes brasileiros." />
      }
    </Grid>
  );
}

export default TableTenNamesComponent;
