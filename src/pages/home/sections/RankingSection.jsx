import { useEffect, useState } from "react";

import TableThreeNamesComponent from '../components/TableThreeNameComponent';
import TableTenNamesComponent from '../components/TableTenNameComponent';
import EmptyComponent from '../../../global/components/EmptyComponent';
import SimpleButtonComponent from '../../../global/components/buttons/SimpleButtonComponent';

import useFetch from '../../../global/Hooks/useFetch';

function RankingSection() {

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
       let response = await useFetch("https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking")
       if(response.status == 200){
        defineFilters(response.data[0].res ?? [])
       }else{
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
            {/* TOP 3 NOMES BRASILEIROS*/}
            <TableThreeNamesComponent apiRankingThreeNames={apiRankingThreeNames} apiDataOk={apiDataOk} />

            {/* TOP 10 NOMES BRASILEIROS*/}
            {showTenRankingSection ?
                <TableTenNamesComponent apiRankingTenNames={apiRankingTenNames} apiDataOk={apiDataOk} />
                :
                <EmptyComponent />}

            <SimpleButtonComponent label="Ver top 10 nomes Brasileiros" fn={handleShowSectionTopTenNames} />
        </>
    );
}

export default RankingSection;