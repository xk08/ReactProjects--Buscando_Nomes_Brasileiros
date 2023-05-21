import formatNumberWithDots from '../../../global/format_number_with_dots';
import ErrorTextComponent from '../../../global/components/ErrorTextComponent';
import LoadingSkeletonComponent from '../../../global/components/animations/SkeletonLoader/LoadingSkeletonComponent';
import { Grid } from '@mui/material';
import RankComponent from '../../../global/components/rank/RankComponent';

const rankingNumber = [1, 2, 3];

function TableThreeNamesComponent(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Top 3 nomes brasileiros</h2>
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
        props.apiRankingThreeNames.map((dados) => (
          <RankComponent
            key={dados.ranking}
            ranking={dados.ranking}
            nome={dados.nome}
            frequencia={formatNumberWithDots(dados.frequencia)}
          ></RankComponent>
        ))
      ) : <ErrorTextComponent title={"Informação desconhecida"} description="Não foi possível encontrar o Ranking de Top 3 nomes brasileiros." />
      }
    </Grid>
  );
}

export default TableThreeNamesComponent;