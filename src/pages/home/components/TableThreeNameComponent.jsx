import formatNumberWithDots from "../../../global/format_number_with_dots";
import ErrorTextComponent from "../../../global/components/ErrorTextComponent";
import LoadingSkeletonComponent from "../../../global/components/animations/SkeletonLoader/LoadingSkeletonComponent";
import { Grid, Typography, Button } from "@mui/material";
import RankComponent from "../../../global/components/rank/RankComponent";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import EmptyComponent from "../../../global/components/EmptyComponent";

const rankingNumber = [1, 2, 3];

function TableThreeNamesComponent(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} onClick={props.handleClosedTableThree}>
        {!props.isTableThreeClosed ? (
          <Button variant="text" endIcon={<ArrowDropDownCircleIcon style={{ transform: "rotate(180deg)" }} />} style={{ fontSize: "18px", border: "none", outline: "none", color: "black" }}>
            <Typography variant="h5" component="h2">
              T<span style={{ textTransform: "lowercase" }}>op 3 nomes</span>
            </Typography>
          </Button>
        ) : (
          <Button variant="text" endIcon={<ArrowDropDownCircleIcon />} style={{ fontSize: "18px", border: "none", outline: "none", color: "black" }}>
            <Typography variant="h5" component="h2" style={{ fontWeight: 700 }}>
              T<span style={{ textTransform: "lowercase" }}>op 3 nomes</span>
            </Typography>
          </Button>
        )}
      </Grid>

      {!props.isTableThreeClosed ? (
        props.isLoading ? (
          <>
            {rankingNumber.map((ranking) => (
              <Grid key={ranking} item xs={12} sm={6} md={4}>
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
