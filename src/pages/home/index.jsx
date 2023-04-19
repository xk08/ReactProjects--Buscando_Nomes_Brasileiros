import { useEffect, useState } from "react";

import SimpleNameComponent from './components/SimpleNameComponent';
import HeaderComponent from './components/HeaderComponent';

import TableThreeNamesComponent from './components/TablesComponent/TableThreeNameComponent';
import TableTenNamesComponent from './components/TablesComponent/TableTenNameComponent';
import EmptyComponent from './components/EmptyComponent';

import SimpleButtonComponent from './components/Buttons/SimpleButtonComponent';

function HomePage() {

    /// Objetos de estado da API de Nomes
    const [apiRankingTenNames, setApiRankingTenNames] = useState([]);
    const [apiRankingThreeNames, setApiRankingThreeNames] = useState([]);

    /// Variaveis booleanos de controle
    const [apiDataOk, setApiDataOk] = useState(false);
    const [showTenRankingSection, setShowTenRankingSection] = useState(false);

    /// Executa automáticamente ao montar a página (apenas 1x)
    useEffect(() => {
        findRankingNamesInApi();
    }, []);

    const findRankingNamesInApi = async () => {

        try {
            const resposta = await fetch("https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking");
            if (resposta.status == 200) {
                const dados = await resposta.json();
                defineFilters(dados[0].res ?? [])
            } else {
                throw resposta;
            }
        } catch (_) {
            setApiDataOk(false);
        }
    }

    const defineFilters = (dataApi) => {
        if (dataApi.length > 0) {
            setApiRankingTenNames(dataApi.filter(data => (data.ranking >= 1 && data.ranking <= 10)));
            setApiRankingThreeNames(dataApi.filter(data => (data.ranking >= 1 && data.ranking <= 3)))
            setApiDataOk(true);
        } else {
            setApiDataOk(false);
        }
    }

    const handleShowSectionTopTenNames = () => {
        setShowTenRankingSection(!showTenRankingSection)
    }

    return (
        <>
            <HeaderComponent />

            {/* TOP 3 NOMES BRASILEIROS*/}
            <TableThreeNamesComponent apiRankingThreeNames={apiRankingThreeNames} apiDataOk={apiDataOk} />

            {/* TOP 10 NOMES BRASILEIROS*/}
            {showTenRankingSection ?
                <TableTenNamesComponent apiRankingTenNames={apiRankingTenNames} apiDataOk={apiDataOk} />
                :
                <EmptyComponent />}

            <SimpleButtonComponent label="Ver top 10 nomes Brasileiros" fn={handleShowSectionTopTenNames} />

            <SimpleNameComponent />
        </>
    );
}

export default HomePage;