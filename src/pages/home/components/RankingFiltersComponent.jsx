import SimpleButtonComponent from "../../../global/components/buttons/SimpleButtonComponent"
import decadasList from "../data/decadas_list";
import nRegisterList from "../data/n_registers_list";

import { Grid, Radio, RadioGroup, FormControlLabel, Select, MenuItem, FormControl, InputLabel, FormLabel } from '@mui/material';

function RankingFiltersComponent(
    {
        sex,
        decade,
        localitiesStates,
        localitiesStatesSelected,
        nRegistersState,
        handleChangeDecade,
        handleChangeNRegisters,
        handleChangeSex,
        handleChangeLocalitiesStatesSelected,
        isLoadingLocalitiesStates,
        fnOnClick,
        disabled,
        handleClearRankingChildrenFilters,
        handleShowSectionTopTenNames
    }
) {

    return (
        <Grid container>
            <Grid item xs={12}>
                <h2>Filtros personalizados</h2>
            </Grid>

            <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <div>
                        <FormLabel id="sex-label">Sexo</FormLabel>
                    </div>

                    <div>
                        <InputLabel id="decade-label">Década</InputLabel>
                    </div>

                    <div>
                        <InputLabel id="estate-label">Estado</InputLabel>
                    </div>

                    <div>
                        <InputLabel id="estate-label">Nº Registros</InputLabel>
                    </div>
                </div>
            </Grid>

            <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <div>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="sex-label"
                                name="sex"
                                value={sex}
                                onChange={handleChangeSex}
                            >
                                <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                                <FormControlLabel value="F" control={<Radio />} label="Feminino" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <div>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
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

                    <div>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
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
                    </div>

                    <div>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <Select
                                    labelId="nRegister-label"
                                    id="nRegister"
                                    value={nRegistersState}
                                    onChange={handleChangeNRegisters}
                                    autoWidth
                                    label="nRegister"
                                >
                                    {
                                        nRegisterList.map((option) => (
                                            <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </Grid>

            <Grid item xs={12}>
                <SimpleButtonComponent
                    key="ranking_filter_button"
                    label="Filtrar busca"
                    fn={fnOnClick}
                    disabled={disabled}
                />

                &nbsp;
                &nbsp;

                <SimpleButtonComponent
                    label="Limpar filtros"
                    fn={handleClearRankingChildrenFilters}
                    disabled={disabled}
                />
            </Grid>
        </Grid>
    );
}

export default RankingFiltersComponent;