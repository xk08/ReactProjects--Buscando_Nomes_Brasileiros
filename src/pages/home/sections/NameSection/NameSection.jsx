import { useState } from "react";

import customFetch from "../../../../global/Api/custom_fetch";
import { apiBaseUrlIbge } from "../../../../global/Api/api_config";

import formatNumberWithDots from "../../../../global/format_number_with_dots";
import textLengthValidation from "../../../../global/validators/text_length_validator";

import ErrorTextComponent from "../../../../global/components/ErrorTextComponent";
import TitleClosable from "../../../../global/components/title-closable/TitleClosable";
import EmptyComponent from "../../../../global/components/EmptyComponent";
import SimpleInputComponent from "../../../../global/components/inputs/SimpleInputComponent";
import LoadingSkeletonComponent from "../../../../global/components/animations/SkeletonLoader/LoadingSkeletonComponent";

import styles from "./NameSection.module.css";
import { Grid, Table, TableHead, TableRow, TableCell, TableBody, Card, Typography, Button, TextField } from "@mui/material";

function NameSection() {
  /* Estados */
  const [name, setName] = useState("");
  const [lastNameSearched, setLastNameSearched] = useState("");
  const [apiData, setApiData] = useState([]);

  /* Estados - Validações */
  const [requestValid, setRequestValid] = useState();
  const [textLengthIsNotValid, setTextLengthIsNotValid] = useState(true);
  const [textLengthValidationSmall, setTextLengthValidationSmall] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNameClosed, setIsNameClosed] = useState(false);

  /* Funções Handle */
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleButtonClicked = async () => {
    setIsLoading(true);
    let resposta = await customFetch(`${apiBaseUrlIbge}/v2/censos/nomes/${name}`);

    setTimeout(() => {
      let dados = resposta.data;
      if (dados.length == 1) {
        setApiData(dados[0].res);
        setRequestValid(true);
      } else {
        setRequestValid(false);
      }
      setIsLoading(false);
    }, 1300);

    setLastNameSearched(name);
    setName("");
    setTextLengthIsNotValid(true);
  };

  /* Validações */
  const textLengthValidator = (event, minLength) => {
    let text = textLengthValidation(event, minLength);
    if (!text.isValid) {
      setTextLengthIsNotValid(true);
      setTextLengthValidationSmall(minLength - text.textLength == 1 ? `Necessário +${minLength - text.textLength} caractere` : `Necessário +${minLength - text.textLength} caracteres`);
    } else {
      setTextLengthIsNotValid(false);
      setTextLengthValidationSmall("");
    }
  };

  function handleCloseName() {
    setIsNameClosed(!isNameClosed);
  }

  /* Renderização da tela */
  return (
    <Grid container spacing={2} justifyContent="center">
      <TitleClosable verify={!isNameClosed} title="Busca por nome" onClick={handleCloseName} />

      {!isNameClosed ? (
        <>
          <Grid item xs={12} sm={6} container alignItems="center" justifyContent="center">
            <TextField type="text" value={name} onChange={handleNameChange} onKeyUp={(event) => textLengthValidator(event, 3)} label="Nome" variant="outlined" fullWidth margin="normal" />

            <Button variant="contained" color="primary" onClick={handleButtonClicked} disabled={textLengthIsNotValid} fullWidth>
              Buscar nome
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ borderRadius: 5, boxShadow: 3 }}>
              <div className={styles.div}>
                {requestValid != null ? <h3>Nome: {lastNameSearched.toUpperCase()}</h3> : <EmptyComponent />}

                {isLoading ? (
                  <LoadingSkeletonComponent exibeThreeNamesCardSkeleton={false} exibeNameDataCardSkeleton={true} />
                ) : requestValid ? (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          <Typography variant="body1" component="p" align="center" color="primary">
                            Período
                          </Typography>
                        </TableCell>

                        <TableCell style={{ fontWeight: "bold" }}>
                          <Typography variant="body1" component="p" align="center" color="primary">
                            Quantidade
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {apiData.map((data, index) => (
                        <TableRow key={data.periodo} sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff" }}>
                          <TableCell color="primary">
                            <Typography variant="body1" component="p" align="center" color="textSecondary">
                              {data.periodo.replace(/[\[\],]/g, (match) => (match === "," ? ", " : ""))}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography variant="body1" component="p" align="center" color="textSecondary">
                              {formatNumberWithDots(data.frequencia)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : requestValid == null ? (
                  <EmptyComponent />
                ) : (
                  <ErrorTextComponent title={`O nome ${lastNameSearched} não foi encontrado`} description="Escolha outro nome e tente novamente." />
                )}
              </div>
            </Card>
          </Grid>
        </>
      ) : (
        <EmptyComponent />
      )}
    </Grid>
  );
}

export default NameSection;
