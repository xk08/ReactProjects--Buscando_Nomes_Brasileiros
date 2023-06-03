import { useState } from "react";
import EmptyComponent from "../../../global/components/EmptyComponent";
import SimpleButtonComponent from "../../../global/components/buttons/SimpleButtonComponent";
import TitleClosable from "../../../global/components/title-closable/TitleClosable";
import decadasList from "../data/decadas_list";
import nRegisterList from "../data/n_registers_list";
import sexList from "../data/sex_list";
import { Grid, Select, MenuItem, FormControl, InputLabel, Box, Autocomplete, TextField } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';


// TODO: os states de abrir e fechar os títulos e de esconder os componentes foram passador por props, rever se nao seria melhor criar aqui mesmo
function RankingFiltersComponent({ sex, decade, localitiesStates, localitiesCities, localitiesStatesSelected, localitiesCitiesSelected, nRegistersState, handleChangeDecade, handleChangeNRegisters, handleChangeSex, handleChangeLocalitiesStatesSelected, handleChangeLocalitiesCitiesSelected, isLoadingLocalitiesStates, isLoadingLocalitiesCities, fnOnClick, disabled, handleClearRankingChildrenFilters }) {
  const [isFiltersClosed, setIsFiltersClosed] = useState(false);

  const handleClosedFilters = () => {
    setIsFiltersClosed(!isFiltersClosed);
  };

  return (
    /* TODO: Trocar o Select pelo AutoComplete -> https://mui.com/material-ui/react-autocomplete/#combo-box */
    <Grid container wrap="wrap">
      <TitleClosable verify={!isFiltersClosed} title="Filtros personalizados" onClick={handleClosedFilters} />

      {!isFiltersClosed ? (
        <>
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

              <div>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="decade-label">Década</InputLabel>
                  <Select labelId="decade-label" id="decade" value={decade} onChange={handleChangeDecade} autoWidth label="Década" sx={{ width: "200px" }}>
                    {decadasList.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={12}>
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
          </Grid>

          <Grid item xs={12} sm={12}>
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
          </Grid>

          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "0px" }}>
              <SimpleButtonComponent key="ranking_filter_button" label="Filtrar busca" fn={fnOnClick} disabled={disabled} endIcon={<FilterAltIcon />} />

              <Box ml={2}>
                <SimpleButtonComponent label="Limpar filtros" fn={handleClearRankingChildrenFilters} disabled={disabled} endIcon={<ClearIcon />} />
              </Box>
            </div>
          </Grid>
        </>
      ) : (
        <EmptyComponent />
      )}
    </Grid>
  );
}

export default RankingFiltersComponent;
