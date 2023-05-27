import SimpleButtonComponent from "../../../global/components/buttons/SimpleButtonComponent"
import decadasList from "../data/decadas_list";
import nRegisterList from "../data/n_registers_list";
import sexList from "../data/sex_list";

import { Grid, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

function RankingFiltersComponent(
    {
        sex,
        decade,
        localitiesStates,
        localitiesCities,
        localitiesStatesSelected,
        localitiesCitiesSelected,
        nRegistersState,
        handleChangeDecade,
        handleChangeNRegisters,
        handleChangeSex,
        handleChangeLocalitiesStatesSelected,
        handleChangeLocalitiesCitiesSelected,
        isLoadingLocalitiesStates,
        isLoadingLocalitiesCities,
        fnOnClick,
        disabled,
        handleClearRankingChildrenFilters
    }
) {

    return (
        <Grid container wrap="wrap">
            <Grid item xs={12}>
                <h2>Filtros personalizados</h2>
            </Grid>

            <Grid item xs={12} sm={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="decade-label">Sexo</InputLabel>
                            <Select
                                labelId="decade-label"
                                id="decade"
                                value={sex}
                                onChange={handleChangeSex}
                                autoWidth
                                label="decade"
                            >
                                {sexList.map((option) => (
                                    <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="decade-label">Década</InputLabel>
                            <Select
                                labelId="decade-label"
                                id="decade"
                                value={decade}
                                onChange={handleChangeDecade}
                                autoWidth
                                label="decade"
                            >
                                {decadasList.map((option) => (
                                    <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </Grid>

            <Grid item xs={12} sm={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="estate-label">Estado</InputLabel>
                            <Select
                                labelId="estate-label"
                                id="estate"
                                value={localitiesStatesSelected}
                                onChange={handleChangeLocalitiesStatesSelected}
                                autoWidth
                                label="estate"
                                disabled={isLoadingLocalitiesStates}
                            >
                                {
                                    localitiesStates.map((option) => (
                                        <MenuItem key={option.nome} value={option.id}>{option.nome}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>


                    {/* NOVO! */}
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="city-label">Cidade</InputLabel>
                            <Select
                                labelId="city-label"
                                id="city"
                                value={localitiesCitiesSelected}
                                onChange={handleChangeLocalitiesCitiesSelected}
                                autoWidth
                                label="city"
                                disabled={(isLoadingLocalitiesCities || !localitiesStatesSelected)}
                            >
                                {
                                    localitiesCities.map((option) => (
                                        <MenuItem key={option.nome} value={option.id}>{option.nome}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </Grid>

            <Grid item xs={12} sm={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="nRegister-label">Nº Registros</InputLabel>
                            <Select
                                labelId="nRegister-label"
                                id="nRegister"
                                value={nRegistersState}
                                onChange={handleChangeNRegisters}
                                autoWidth
                                label="nRegister"
                            >
                                {nRegisterList.map((option) => (
                                    <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

            </Grid>

            <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <SimpleButtonComponent
                        key="ranking_filter_button"
                        label="Filtrar busca"
                        fn={fnOnClick}
                        disabled={disabled}
                    />

                    <Box ml={2}>
                        <SimpleButtonComponent
                            label="Limpar filtros"
                            fn={handleClearRankingChildrenFilters}
                            disabled={disabled}
                        />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
}

export default RankingFiltersComponent;