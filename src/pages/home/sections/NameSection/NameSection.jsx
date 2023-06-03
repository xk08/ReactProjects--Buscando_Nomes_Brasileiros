
import { useEffect, useState } from "react";

import customFetch from "../../../../global/Api/custom_fetch";
import { apiBaseUrlIbge } from "../../../../global/Api/api_config";

import formatNumberWithDots from "../../../../global/format_number_with_dots";
import textLengthValidation from "../../../../global/validators/text_length_validator";

import ErrorTextComponent from "../../../../global/components/ErrorTextComponent";
import TitleClosable from "../../../../global/components/title-closable/TitleClosable";
import EmptyComponent from "../../../../global/components/EmptyComponent";
import LoadingSkeletonComponent from "../../../../global/components/animations/SkeletonLoader/LoadingSkeletonComponent";

import styles from "./NameSection.module.css";
import { Box, FormControl, InputLabel, MenuItem, Select, Grid, Table, TableHead, TableRow, TableCell, TableBody, Card, Typography, Button, TextField } from "@mui/material";

import sexList from "../../data/sex_list";
import SimpleButtonComponent from "../../../../global/components/buttons/SimpleButtonComponent";

import ColorsUtils from '../../../../global/Utils/colors';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import BackspaceIcon from '@mui/icons-material/Backspace';




function NameSection() {
  /* Estados */
  const [name, setName] = useState("");
  const [lastNameSearched, setLastNameSearched] = useState("");
  const [apiData, setApiData] = useState([]);

  /* Estados - Validações */
  const [requestValid, setRequestValid] = useState();
  const [textLengthIsNotValid, setTextLengthIsNotValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isNameClosed, setIsNameClosed] = useState(false);


  const [isFiltersClosed, setIsFiltersClosed] = useState(false);
  const [isFiltersValid, seIsFiltersValid] = useState(false);


  const [sex, setSex] = useState("");
  const [locality, setLocality] = useState("");


  useEffect(() => {
    if (sex && name.length >= 3) {
      seIsFiltersValid(true);
    } else {
      seIsFiltersValid(false);
    }
  }, [sex, name]);


  const handleClosedFilters = () => {
    setIsFiltersClosed(!isFiltersClosed);
  };

  /* Funções Handle */
  const handleNameChange = (event) => {
    setName(event.target.value.trim());
  };

  const handleChangeSex = (e) => {
    setSex(e.target.value);
  };

  const handleChangeLocality = (e) => {
    setLocality(e.target.value);
  };

  const handleButtonClicked = () => {
    handleExecuteFilters(sex, locality); /// TODO: @@@ Falta a quantidade ??
  };

  const findNameInApi = async (filter) => {
    setIsLoading(true);

    const baseUrl = defineBaseUrlBasedOnFilters(filter);

    let response = await customFetch(baseUrl, null, "Buscando primeiro nome");

    setTimeout(() => {
      let dados = response.data;
      if (dados.length == 1) {
        setApiData(dados[0].res);
        setRequestValid(true);
      } else {
        setRequestValid(false);
      }
      setIsLoading(false);
    }, 1300);

    setLastNameSearched(name);
    seIsFiltersValid(true);
    setTextLengthIsNotValid(true);

  };

  const handleExecuteFilters = async (sex, locality, registersQtd) => {

    //setNRegistersOldState(registersQtd); /// TODO: Verificar se teremos algo do tipo

    if (sex && locality) {
      await findNameInApi("sex&locality");
    } else if (locality) {
      await findNameInApi("locality");
    } else if (sex) {
      await findNameInApi("sex");
    } else {
      await findNameInApi();
    }
  };

  const defineBaseUrlBasedOnFilters = (filter) => {
    let baseUrlWithFilterSeted = "";

    switch (filter) {

      case "sex&locality":
        baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/${name}?sexo=${sex}&localidade=${locality}`;
        break;

      case "sex":
        baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/${name}?sexo=${sex}`;
        break;

      case "locality":
        baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/${name}?localidade=${locality}`;
        break;

      default:
        baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/${name}`;
        break;
    }
    return baseUrlWithFilterSeted;
  };

  const clearNameFilters = () => {
    setLastNameSearched(name);
    setName("");
    setTextLengthIsNotValid(true);
    setSex("");
    setLocality("");
    setApiData([]);
    setRequestValid(undefined);
    seIsFiltersValid(false);
  }

  const textLengthValidator = (event, minLength) => {
    let text = textLengthValidation(event, minLength);
    if (!text.isValid) {
      setTextLengthIsNotValid(true);
    } else {
      setTextLengthIsNotValid(false);
    }
  };

  function handleCloseName() {
    setIsNameClosed(!isNameClosed);
  }

  /* Renderização da tela */
  return (
    <Grid container spacing={2} justifyContent="center">
      <TitleClosable
        verify={!isNameClosed}
        title="Busca primeiro nome"
        onClick={handleCloseName} />

      {!isNameClosed ? (
        <>
          <Grid item xs={12} sm={6} container alignItems="center" justifyContent="center">
            <TextField
              type="text"
              value={name}
              onChange={handleNameChange}
              onKeyUp={(event) => textLengthValidator(event, 3)}
              label="Primeiro nome"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ borderRadius: 5, boxShadow: 3 }}>
              <div className={styles.div}>
                {requestValid != null ? <h3>Nome: {lastNameSearched.toUpperCase()}</h3> : <EmptyComponent />}

                {isLoading ? (
                  <LoadingSkeletonComponent
                    exibeThreeNamesCardSkeleton={false}
                    exibeNameDataCardSkeleton={true}
                  />
                ) : requestValid ? (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          <Typography
                            variant="body1"
                            component="p"
                            align="center"
                            color="primary"
                          >
                            Período
                          </Typography>
                        </TableCell>

                        <TableCell style={{ fontWeight: "bold" }}>
                          <Typography
                            variant="body1"
                            component="p"
                            align="center"
                            color="primary">
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
                              {data.periodo.replace(/[\[\],]/g, (match) => (match === "," ? " a " : ""))}
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
                  <ErrorTextComponent
                    title={`O nome ${lastNameSearched.toUpperCase()} não foi encontrado`}
                    description=""
                  />
                )}
              </div>
            </Card>
          </Grid>


          {/* @@@@ AQUIIIIIIIIII */}
          <Grid container wrap="wrap">
            <TitleClosable
              verify={!isFiltersClosed}
              title="Filtros personalizados"
              onClick={handleClosedFilters}
            />

            {!isFiltersClosed ? (
              <>






                {/*  <Grid item xs={12} sm={12}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div>
                      <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="estate-label">Estado</InputLabel>
                        <Select labelId="estate-label" id="estate" value={localitiesStatesSelected} onChange={handleChangeLocalitiesStatesSelected} autoWidth label="Estado" disabled={isLoadingLocalitiesStates} sx={{ width: "200px" }}>
                          {localitiesStates.map((option) => (
                            <MenuItem key={option.nome} value={option.id}>
                              {option.nome}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div>
                      <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="city-label">Cidade</InputLabel>
                        <Select labelId="city-label" id="city" value={localitiesCitiesSelected} onChange={handleChangeLocalitiesCitiesSelected} autoWidth label="Cidade" disabled={isLoadingLocalitiesCities || !localitiesStatesSelected} sx={{ width: "200px" }}>
                          {localitiesCities.map((option) => (
                            <MenuItem key={option.nome} value={option.id}>
                              {option.nome}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </Grid> */}

                {/*  <Grid item xs={12} sm={12}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ marginBottom: "5px" }}>
                      <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="nRegister-label">Nº Registros</InputLabel>
                        <Select labelId="nRegister-label" id="nRegister" value={nRegistersState} onChange={handleChangeNRegisters} autoWidth label="Nº Registros" sx={{ width: "200px" }}>
                          {nRegisterList.map((option) => (
                            <MenuItem key={option.label} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </Grid> */}

                {/* <Grid item xs={12}>
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "0px" }}>
                    <SimpleButtonComponent key="ranking_filter_button" label="Filtrar busca" fn={fnOnClick} disabled={disabled} endIcon={<FilterAltIcon />} />

                    <Box ml={2}>
                      <SimpleButtonComponent label="Limpar filtros" fn={handleClearRankingChildrenFilters} disabled={disabled} endIcon={<BackspaceIcon />} />
                    </Box>
                  </div>
                </Grid> */}
              </>
            ) : (
              <EmptyComponent />
            )}

            <Grid item xs={12} sm={12}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div>
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="sex-label">Sexo</InputLabel>
                    <Select labelId="sex-label" id="sex" value={sex} onChange={handleChangeSex} autoWidth label="Sexo" sx={{ width: "200px" }}>
                      {sexList.map((option) => (
                        <MenuItem key={option.label} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

              </div>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                <SimpleButtonComponent
                  key="ranking_filter_button"
                  label={isFiltersValid ? "Buscar com filtros" : "Buscar"}
                  fn={handleButtonClicked}
                  endIcon={<FilterAltIcon />}
                  disabled={textLengthIsNotValid}
                />


                <Box ml={2}>
                  <SimpleButtonComponent
                    label="Limpar"
                    fn={clearNameFilters}
                    disabled={!isFiltersValid}
                    endIcon={<BackspaceIcon />}
                  />
                </Box>
              </div>
            </Grid>
          </Grid>
        </>
      ) : (
        <EmptyComponent />
      )}
    </Grid>
  );
}

export default NameSection;
