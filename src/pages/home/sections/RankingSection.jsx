import { useEffect, useState } from "react";

import TableThreeNamesComponent from '../components/TableThreeNameComponent';
import TableTenNamesComponent from '../components/TableTenNameComponent';
import EmptyComponent from '../../../global/components/EmptyComponent';
import SimpleButtonComponent from '../../../global/components/buttons/SimpleButtonComponent';
import RankingFiltersComponent from '../components/RankingFiltersComponent';

import customFetch from '../../../global/Api/custom_fetch';
import { apiBaseUrlIbge } from '../../../global/Api/api_config';

function RankingSection() {

    /// Estado da API de Nomes
    const [apiRankingTenNames, setApiRankingTenNames] = useState([]);
    const [apiRankingThreeNames, setApiRankingThreeNames] = useState([]);


    /// Estados booleanos de controle
    const [apiDataOk, setApiDataOk] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonFilterIsDisabled, setButtonFilterIsDisabled] = useState(true);
    const [showTenRankingSection, setShowTenRankingSection] = useState(false);


    /// Estados de componentes filhos
    const [sexSetedByChildComponent, setSexSetedByChildComponent] = useState();
    const [decadaSetedByChildComponent, setDecadaSetedByChildComponent] = useState();

    /// Executa automáticamente ao montar a seção (apenas 1x)
    useEffect(() => {
        findRankingNamesInApi();
    }, []);

    /// Funções Handle
    const handleShowSectionTopTenNames = () => {
        setShowTenRankingSection(!showTenRankingSection)
    }

    /// Funções Handle: Captruando o estado de componentes filhos
    const handleChildSexFilterCallback = (childData) => {
        setSexSetedByChildComponent(childData);
        setButtonFilterIsDisabled(false);
    }

    const handleChildDecadaFilterCallback = (childData) => {
        setDecadaSetedByChildComponent(childData);
        ///TODO: Repensar a lógica com mais de uma validação...
        //setButtonFilterIsDisabled(false);
    }


    const filtersValidator = (sexFilter, decadaFilter) => {
        let filtersIsValid = false;

        if (sexFilter != undefined && decadaFilter != undefined) {
            filtersIsValid = true;
        }
        return filtersIsValid;
    }

    const handleExecuteFilterInsideComponent = () => {

        let filterIsValid = filtersValidator(sexSetedByChildComponent, decadaSetedByChildComponent);

        if (filterIsValid) {
            //findRankingNamesInApi("sexo");
            findRankingNamesInApi("decada");
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

        switch (filter) {
            case "sexo":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?sexo=${sexSetedByChildComponent}`;
                break;

            case "decada":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?decada=${decadaSetedByChildComponent}`;
                break;

            case "localidade":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/localidade=3300100`;
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
            {showTenRankingSection ?
                <TableTenNamesComponent
                    apiRankingTenNames={apiRankingTenNames}
                    apiDataOk={apiDataOk}
                    isLoading={isLoading}
                />
                : <EmptyComponent />}

            <br />
            {(apiDataOk && showTenRankingSection) ?
                <RankingFiltersComponent
                    parentCallbackRadioOption={handleChildSexFilterCallback}
                    parentCallbackDecada={handleChildDecadaFilterCallback}
                    fn={handleExecuteFilterInsideComponent}
                    disabled={buttonFilterIsDisabled}


                />
                : <EmptyComponent />
            }
            <br />

            {apiDataOk ?
                <SimpleButtonComponent
                    label={!showTenRankingSection ? "Ver top 10 nomes Brasileiros"
                        : "Fechar top 10 nomes Brasileiros"}
                    fn={handleShowSectionTopTenNames} />
                : <EmptyComponent />
            }

            <br />

            <div>
                <h5>Filtros capturados dos components filhos</h5>
                <p> Sexo capturado do filho: {sexSetedByChildComponent ?? "Sexo não selecionado"} </p>
                <p> Decada capturada do filho: {decadaSetedByChildComponent ?? "Decada não selecionada"} </p>
            </div>

        </>
    );
}

export default RankingSection;