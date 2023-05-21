import { useEffect, useState } from "react";

import TableThreeNamesComponent from '../../components/TableThreeNameComponent';
import TableTenNamesComponent from '../../components/TableTenNameComponent';
import EmptyComponent from '../../../../global/components/EmptyComponent';
import SimpleButtonComponent from '../../../../global/components/buttons/SimpleButtonComponent';
import RankingFiltersComponent from '../../components/RankingFiltersComponent';

import customFetch from '../../../../global/Api/custom_fetch';
import { apiBaseUrlIbge } from '../../../../global/Api/api_config';


function RankingSection() {

    /// Estado dos array de top nomes
    const [apiRankingTenNames, setApiRankingTenNames] = useState([]);
    const [apiRankingThreeNames, setApiRankingThreeNames] = useState([]);


    /// Estados booleanos de controle dos filtros
    const [apiDataOk, setApiDataOk] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonFilterIsDisabled, setButtonFilterIsDisabled] = useState(false); /// @@@ Rever este fittro (deve estar habilitado, se pelo menos 1 dos filtros estiver marcado)
    const [showTenRankingSection, setShowTenRankingSection] = useState(false);


    /// Estados dos componentes filhos: Radio Options (M ou F)
    const [sexoChild, setSexoChild] = useState();

    /// Estados dos componentes filhos: Década
    const [decadaChild, setDecadaChild] = useState();

    /// Estados dos componentes filhos: Localidade
    const [localidadeChild, setLocalidadeChild] = useState(); /// 3300100 (São Borja)



    /// Executa automáticamente ao montar a seção (apenas 1x)
    useEffect(() => {
        findRankingNamesInApi();
    }, []);


    /// Funções Handle que alteram os estados
    const handleShowSectionTopTenNames = () => {
        setShowTenRankingSection(!showTenRankingSection)
    }

    const handleChangeSexoChild = (e) => {
        setSexoChild(e.target.value);
    }

    const handleChangeDecadaChild = (e) => {
        setDecadaChild(e.target.value);
    }

    const handleChangeLocalidadeChild = (e) => {
        setLocalidadeChild(e.target.value);
    }

    const handleClearRankingChildrenFilters = () => {
        setSexoChild("");
        setDecadaChild("");
        setLocalidadeChild("");
        handleExecuteFilterInsideComponent("", "", "");
    }


    const handleExecuteFilterInsideComponent = (sexo, decada, localidade) => {

        /// TODO: Pensar em uma lógica melhor (menos verbosa) pra essa verificação

        /// SEXO - DECADA - LOCALIDADE
        if (sexo && decada && localidade) {
            findRankingNamesInApi("sexo&decada&localidade");
            /// DECADA - LOCALIDADE
        } else if (decada && localidade) {
            findRankingNamesInApi("decada&localidade");
            /// SEXO - LOCALIDADE
        } else if (sexo && localidade) {
            findRankingNamesInApi("sexo&localidade");
            /// SEXO - DECADA
        } else if (sexo && decada) {
            findRankingNamesInApi("sexo&decada");
            /// LOCALIDADE
        } else if (localidade) {
            findRankingNamesInApi("localidade");
            /// DECADA
        } else if (decada) {
            findRankingNamesInApi("decada");
            /// SEXO
        } else if (sexo) {
            findRankingNamesInApi("sexo");
        }
        else {
            findRankingNamesInApi();

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

            case "sexo":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?sexo=${sexoChild}`;
                break;

            case "decada":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?decada=${decadaChild}`;
                break;

            case "localidade":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?localidade=${localidadeChild}`;
                break;

            case "sexo&decada":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?sexo=${sexoChild}&decada=${decadaChild}`;
                break;

            case "sexo&localidade":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?sexo=${sexoChild}&localidade=${localidadeChild}`;
                break;

            case "decada&localidade":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?decada=${decadaChild}&localidade=${localidadeChild}`;
                break;

            case "sexo&decada&localidade":
                baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?sexo=${sexoChild}&decada=${decadaChild}&localidade=${localidadeChild}`;
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
                    /// Enviando estados via props
                    sexo={sexoChild}
                    decada={decadaChild}
                    localidade={localidadeChild}

                    /// Enviando funções de callback (que alteram os estados dos filhos)
                    handleChangeSexo={handleChangeSexoChild}
                    handleChangeDecada={handleChangeDecadaChild}
                    handleChangeLocalidade={handleChangeLocalidadeChild}

                    disabled={buttonFilterIsDisabled}

                    fnOnClick={
                        () => handleExecuteFilterInsideComponent(sexoChild, decadaChild, localidadeChild)
                    }
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
            <br />

            <SimpleButtonComponent
                label="Limpar filtros"
                fn={handleClearRankingChildrenFilters}
                disabled={false}
            />

            <br />

        </>
    );
}

export default RankingSection;