import { useEffect, useState } from "react";
import customFetch from '../../../../global/Api/custom_fetch';
import { apiBaseUrlIbge } from '../../../../global/Api/api_config';

import TableThreeNamesComponent from '../../components/TableThreeNameComponent';
import TableCustomNamesComponent from '../../components/TableCustomNameComponent';
import EmptyComponent from '../../../../global/components/EmptyComponent';
import SimpleButtonComponent from '../../../../global/components/buttons/SimpleButtonComponent';
import RankingFiltersComponent from '../../components/RankingFiltersComponent';


function RankingSection() {

    const [apiRankingTenNames, setApiRankingTenNames] = useState([]);
    const [apiRankingThreeNames, setApiRankingThreeNames] = useState([]);

    const [apiDataOk, setApiDataOk] = useState(false);
    const [showTenRankingSection, setShowTenRankingSection] = useState(false);

    const [sexChild, setSexChild] = useState("");
    const [decadeChild, setDecadeChild] = useState("");
    const [localitiesStatesSelectedChild, setLocalitiesStatesSelectedChild] = useState("");
    const [localityChild, setLocalityChild] = useState("");

    const [isLoadingRankingNames, setIsLoadingRankingNames] = useState(false);
    const [isLoadingLocalitiesStates, setIsLoadingLocalitiesStates] = useState(false);

    const [localitiesStatesChild, setLocalitiesStatesChild] = useState([]);
    const [localitiesCitiesChild, setLocalitiesCitiesChild] = useState([]);

    const [nRegistersState, setNRegistersState] = useState(10);
    const [nRegistersOldState, setNRegistersOldState] = useState(10);


    useEffect(() => {
        findRankingNamesInApi();
        findLocalitiesStatesInApi();
    }, []);

    const handleShowSectionTopTenNames = () => {
        setShowTenRankingSection(!showTenRankingSection)
    }

    const handleChangeSexChild = (e) => {
        setSexChild(e.target.value);
    }

    const handleChangeDecadeChild = (e) => {
        setDecadeChild(e.target.value);
    }

    const handleChangeNRegistersChild = (e) => {
        setNRegistersState(e.target.value);
    }

    const handleChangeLocalityChild = (e) => {
        setLocalityChild(e.target.value);
    }

    const handleChangeLocalitiesStatesSelectedChild = (e) => {
        setLocalitiesStatesSelectedChild(e.target.value);
        handleChangeLocalityChild(e)
    }

    const handleClearRankingChildrenFilters = () => {
        setSexChild("");
        setDecadeChild("");
        setLocalityChild("");
        setLocalitiesStatesSelectedChild("");
        setNRegistersState(10);
        handleExecuteFilterInsideComponent("", "", "", 10);
    }

    const verifyStatesAndDisableButton = () => {
        return (sexChild || decadeChild || localityChild || nRegistersState !== 10) ? false : true
    }

    const findLocalitiesStatesInApi = async () => {

        setIsLoadingLocalitiesStates(true)
        const baseUrl = `${apiBaseUrlIbge}/v1/localidades/estados`
        let response = await customFetch(baseUrl, null, "Buscando estados brasileiros [UFs]");

        if (response.status == 200) {
            if (response.data.length > 0) {
                setLocalitiesStatesChild(response.data);
            } else {
                setLocalitiesStatesChild([]);
            }
        } else {
            setLocalitiesStatesChild([]);
        }
        setIsLoadingLocalitiesStates(false);
    }


    const handleExecuteFilterInsideComponent = async (sex, decade, locality, registersQtd) => {

        setNRegistersOldState(registersQtd)

        /// sex - decade - locality
        if (sex && decade && locality) {
            await findRankingNamesInApi("sex&decade&locality");
            /// decade - locality
        } else if (decade && locality) {
            await findRankingNamesInApi("decade&locality");
            /// sex - locality
        } else if (sex && locality) {
            await findRankingNamesInApi("sex&locality");
            /// sex - decade
        } else if (sex && decade) {
            await findRankingNamesInApi("sex&decade");
            /// locality
        } else if (locality) {
            await findRankingNamesInApi("locality");
            /// decade
        } else if (decade) {
            await findRankingNamesInApi("decade");
            /// sex
        } else if (sex) {
            await findRankingNamesInApi("sex");
        }
        else {
            await findRankingNamesInApi();
        }
    }

    const findRankingNamesInApi = async (filter) => {

        setIsLoadingRankingNames(true)
        const baseUrl = defineBaseUrlBasedOnFilters(filter)
        let response = await customFetch(baseUrl, null, "Buscando o Ranking de Nomes");

        setTimeout(async () => {

            if (response.status == 200 || response.status == 201) {
                if (response.data.length > 0) {
                    defineFilters(response.data[0].res ?? [])
                } else {
                    setApiDataOk(false);
                }
            } else {
                setApiDataOk(false);
            }
            setIsLoadingRankingNames(false);

        }, 1300);
    }

    const defineBaseUrlBasedOnFilters = (filter) => {

        let baseUrlWithFilterSeted = "";

        switch (filter) {

            case "sex":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?sexo=${sexChild}`;
                break;

            case "decade":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?decada=${decadeChild}`;
                break;

            case "locality":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?localidade=${localityChild}`;
                break;

            case "sex&decade":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?sexo=${sexChild}&decada=${decadeChild}`;
                break;

            case "sex&locality":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?sexo=${sexChild}&localidade=${localityChild}`;
                break;

            case "decade&locality":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?decada=${decadeChild}&localidade=${localityChild}`;
                break;

            case "sex&decade&locality":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?sexo=${sexChild}&decada=${decadeChild}&localidade=${localityChild}`;
                break;

            default:
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/`;
                break;
        }
        return baseUrlWithFilterSeted;
    };

    const defineFilters = (responseDataApi) => {
        try {
            // TODO: Ajustar o estado quando o usuario limpa o filtro, está pegando o estado anterior
            setApiRankingTenNames(responseDataApi.filter(data => (data.ranking >= 1 && data.ranking <= nRegistersState)));
            setApiRankingThreeNames(responseDataApi.filter(data => (data.ranking >= 1 && data.ranking <= 3)))
            setApiDataOk(true);
        } catch (_) {
            setApiDataOk(false);
        }
    }

    return (
        <>
            {/* TOP 3 NOMES BRASILEIROS*/}
            <TableThreeNamesComponent
                apiRankingThreeNames={apiRankingThreeNames}
                apiDataOk={apiDataOk}
                isLoading={isLoadingRankingNames}
            />

            <br />

            {
                (apiDataOk) ?
                    <RankingFiltersComponent

                        sex={sexChild}
                        decade={decadeChild}
                        locality={localityChild}
                        localitiesStates={localitiesStatesChild}
                        localitiesStatesSelected={localitiesStatesSelectedChild}
                        nRegistersState={nRegistersState}

                        handleChangeSex={handleChangeSexChild}
                        handleChangeDecade={handleChangeDecadeChild}
                        handleChangeNRegisters={handleChangeNRegistersChild}
                        handleChangeLocality={handleChangeLocalityChild}
                        handleChangeLocalitiesStatesSelected={handleChangeLocalitiesStatesSelectedChild}
                        handleClearRankingChildrenFilters={handleClearRankingChildrenFilters}

                        isLoadingLocalitiesStates={isLoadingLocalitiesStates}

                        disabled={verifyStatesAndDisableButton()}

                        fnOnClick={
                            () => handleExecuteFilterInsideComponent(sexChild, decadeChild, localityChild, nRegistersState)
                        }
                    />
                    : <EmptyComponent />
            }



            {/* TOP 10 NOMES BRASILEIROS*/}
            {
                showTenRankingSection ?
                    <TableCustomNamesComponent
                        apiRankingTenNames={apiRankingTenNames}
                        apiDataOk={apiDataOk}
                        isLoading={isLoadingRankingNames}
                        nRegisters={nRegistersOldState}
                    />
                    : <EmptyComponent />
            }

            <br />
            <br />

            {
                apiDataOk ?
                    <SimpleButtonComponent
                        label={!showTenRankingSection ? `Ver top ${nRegistersOldState} nomes Brasileiros`
                            : `Fechar top ${nRegistersOldState} nomes Brasileiros`}
                        fn={handleShowSectionTopTenNames} />
                    : <EmptyComponent />
            }

            <br />
            <br />


        </>
    );
}

export default RankingSection;