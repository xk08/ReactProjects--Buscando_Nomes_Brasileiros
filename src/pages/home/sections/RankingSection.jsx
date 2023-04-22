import { useEffect, useState } from "react";

import TableThreeNamesComponent from '../components/TableThreeNameComponent';
import TableTenNamesComponent from '../components/TableTenNameComponent';
import EmptyComponent from '../../../global/components/EmptyComponent';
import SimpleButtonComponent from '../../../global/components/buttons/SimpleButtonComponent';

import customFetch from '../../../global/Api/custom_fetch';
import {apiBaseUrlIbge} from '../../../global/Api/api_config';

function RankingSection() {

    /// Objetos de estado da API de Nomes
    const [apiRankingTenNames, setApiRankingTenNames] = useState([]);
    const [apiRankingThreeNames, setApiRankingThreeNames] = useState([]);


    /// Variaveis booleanos de controle
    const [apiDataOk, setApiDataOk] = useState(false);
    const [showTenRankingSection, setShowTenRankingSection] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    /// Executa automáticamente ao montar a seção (apenas 1x)
    useEffect(() => {
        findRankingNamesInApi();
    }, []);

    const handleShowSectionTopTenNames = () => {
        setShowTenRankingSection(!showTenRankingSection)
    }

    const findRankingNamesInApi = async () => {

        setIsLoading(true);

        let response = await customFetch(`${apiBaseUrlIbge}/v2/censos/nomes/ranking`)

        /// Atrasando o processamento da resposta, para melhorar a UX deste recurso.
        setTimeout(async () => {

            if (response.status == 200 || response.status == 201) {
                defineFilters(response.data[0].res ?? [])
            } else {
                setApiDataOk(false);
            }
            setIsLoading(false);

        }, 1300);
    }

    const defineFilters = (responseDataApi) => {
        if (responseDataApi.length > 0) {
            try {
                setApiRankingTenNames(responseDataApi.filter(data => (data.ranking >= 1 && data.ranking <= 10)));
                setApiRankingThreeNames(responseDataApi.filter(data => (data.ranking >= 1 && data.ranking <= 3)))
                setApiDataOk(true);
            } catch (_) {
                setApiDataOk(false);
            }
        } else {
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
            {showTenRankingSection ?
                <TableTenNamesComponent
                    apiRankingTenNames={apiRankingTenNames}
                    apiDataOk={apiDataOk}
                    isLoading={isLoading}
                />
                : <EmptyComponent />}

            {apiDataOk ?
                <SimpleButtonComponent
                    label="Clique para ver top 10 nomes Brasileiros"
                    fn={handleShowSectionTopTenNames} />
                : <EmptyComponent />
            }
        </>
    );
}

export default RankingSection;