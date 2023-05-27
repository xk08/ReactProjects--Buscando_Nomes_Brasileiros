import { useEffect, useState } from "react";
import customFetch from '../../../../global/Api/custom_fetch';
import { apiBaseUrlIbge } from '../../../../global/Api/api_config';

import TableThreeNamesComponent from '../../components/TableThreeNameComponent';
import TableTenNamesComponent from '../../components/TableTenNameComponent';
import EmptyComponent from '../../../../global/components/EmptyComponent';
import SimpleButtonComponent from '../../../../global/components/buttons/SimpleButtonComponent';
import RankingFiltersComponent from '../../components/RankingFiltersComponent';


function RankingSection() {

    const [apiRankingTenNames, setApiRankingTenNames] = useState([]);
    const [apiRankingThreeNames, setApiRankingThreeNames] = useState([]);

    const [apiDataOk, setApiDataOk] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showTenRankingSection, setShowTenRankingSection] = useState(false);

    const [sexChild, setSexChild] = useState();
    const [decadeChild, setDecadeChild] = useState();
    const [localityChild, setLocalityChild] = useState(); /// 3300100 (São Borja)

    useEffect(() => {
        findRankingNamesInApi();
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

    const handleChangeLocalityChild = (e) => {
        setLocalityChild(e.target.value);
    }

    const handleClearRankingChildrenFilters = () => {
        setSexChild("");
        setDecadeChild("");
        setLocalityChild("");
        handleExecuteFilterInsideComponent("", "", "");
    }


    const handleExecuteFilterInsideComponent = async (sex, decade, locality) => {

        /// TODO: Pensar em uma lógica melhor (menos verbosa) pra essa verificação

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

        setIsLoading(true)

        const baseUrl = defineBaseUrlBasedOnFilters(filter)

        let response = await customFetch(baseUrl);

        /// Atrasando o processamento da resposta, para melhorar a UX deste recurso.
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
            setIsLoading(false);

        }, 1300);
    }

    const defineBaseUrlBasedOnFilters = (filter) => {

        let baseUrlWithFilterSeted = "";

        /// TODO: Pensar em uma lógica melhor (menos verbosa) pra essa verificação

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
            setApiRankingTenNames(responseDataApi.filter(data => (data.ranking >= 1 && data.ranking <= 10)));
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
                isLoading={isLoading}
            />

            {/* TOP 10 NOMES BRASILEIROS*/}
            {
                showTenRankingSection ?
                    <TableTenNamesComponent
                        apiRankingTenNames={apiRankingTenNames}
                        apiDataOk={apiDataOk}
                        isLoading={isLoading}
                    />
                    : <EmptyComponent />
            }

            <br />
            {
                (apiDataOk && showTenRankingSection) ?
                    <RankingFiltersComponent
                        sex={sexChild}
                        decade={decadeChild}
                        locality={localityChild}

                        handleChangeSex={handleChangeSexChild}
                        handleChangeDecade={handleChangeDecadeChild}
                        handleChangeLocality={handleChangeLocalityChild}

                        disabled={
                            (sexChild != "" || decadeChild != "" || localityChild != "") ? false : true
                        }

                        fnOnClick={
                            () => handleExecuteFilterInsideComponent(sexChild, decadeChild, localityChild)
                        }
                    />
                    : <EmptyComponent />
            }
            <br />

            {
                apiDataOk ?
                    <SimpleButtonComponent
                        label={!showTenRankingSection ? "Ver top 10 nomes Brasileiros"
                            : "Fechar top 10 nomes Brasileiros"}
                        fn={handleShowSectionTopTenNames} />
                    : <EmptyComponent />
            }

            <br />
            <br />

            <SimpleButtonComponent
                label="Limpar filtros"
                fn={handleClearRankingChildrenFilters}
                disabled={
                    (sexChild != "" || decadeChild != "" || localityChild != "") ? false : true
                }
            />

            <br />

        </>
    );
}

export default RankingSection;