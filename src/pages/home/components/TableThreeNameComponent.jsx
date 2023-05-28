import formatNumberWithDots from "../../../global/format_number_with_dots";
import ErrorTextComponent from "../../../global/components/ErrorTextComponent";
import LoadingSkeletonComponent from "../../../global/components/animations/SkeletonLoader/LoadingSkeletonComponent";
import { Grid, Typography, Button } from "@mui/material";
import RankComponent from "../../../global/components/rank/RankComponent";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import EmptyComponent from "../../../global/components/EmptyComponent";
import TitleClosable from "../../../global/components/title-closable/TitleClosable";

const rankingNumber = [1, 2, 3];

function TableThreeNamesComponent(props) {
  return (
    <Grid container spacing={2}>
      <TitleClosable verify={!props.isTableThreeClosed} title="Top 3 nomes" onClick={props.handleClosedTableThree} />

      {!props.isTableThreeClosed ? (
        props.isLoading ? (
          <>
            {rankingNumber.map((ranking) => (
              <Grid item xs={12} sm={6} md={4} key={ranking}>
                <LoadingSkeletonComponent exibeThreeNamesCardSkeleton={true} exibeNameDataCardSkeleton={false} />
              </Grid>
            ))}
          </>
        ) : props.apiDataOk ? (
          props.apiRankingThreeNames.map((dados) => <RankComponent key={dados.ranking} ranking={dados.ranking} nome={dados.nome} frequencia={formatNumberWithDots(dados.frequencia)}></RankComponent>)
        ) : (
          <ErrorTextComponent title={"Informação desconhecida"} description="Não foi possível encontrar o Ranking de Top 3 nomes brasileiros." />
        )
      ) : (
        <EmptyComponent />
      )}
    </Grid>
  );
}

export default TableThreeNamesComponent;
