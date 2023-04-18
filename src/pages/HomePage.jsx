import { useEffect, useState } from "react";
import formatNumberWithDots from '../global/format_number_with_dots';

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
            <div>
                <h2>Top 3 nomes brasileiros</h2>
                {/* TOP 3 NOMES BRASILEIROS*/}
                <table>
                    <thead>
                        <tr>
                            <td>Posição</td>
                            <td>Nome</td>
                            <td>Frequência</td>
                        </tr>

                        {apiDataOk ? <tbody>
                            {
                                apiRankingThreeNames.map(
                                    dados =>

                                        <td key={dados.ranking}>
                                            <tr >
                                                <td>{dados.ranking}

                                                </td>
                                            </tr>

                                            <tr >

                                                <td>{dados.nome}</td>

                                            </tr>

                                            <tr >
                                                <td>{formatNumberWithDots(dados.frequencia)}
                                                </td>
                                            </tr>

                                        </td>
                                )
                            }
                        </tbody>
                            :
                            <div>
                                <h4>Não foi possivel carregar o Top 3</h4>
                            </div>}

                    </thead>
                </table>
            </div>

            {/* TOP 10 NOMES BRASILEIROS*/}
            {
                showTenRankingSection ?
                    <div>
                        <h2>Top 10 nomes brasileiros</h2>
                        <table>
                            <thead>
                                <tr>
                                    <td>Posição</td>
                                    <td>Nome</td>
                                    <td>Frequência</td>
                                </tr>

                                {apiDataOk ? <tbody>
                                    {
                                        apiRankingTenNames.map(
                                            dados =>

                                                <td key={dados.ranking}>
                                                    <tr >
                                                        <td>{dados.ranking}

                                                        </td>
                                                    </tr>

                                                    <tr >
                                                        <td>{dados.nome}</td>
                                                    </tr>

                                                    <tr >
                                                        <td>{formatNumberWithDots(dados.frequencia)}
                                                        </td>
                                                    </tr>
                                                </td>
                                        )
                                    }
                                </tbody>
                                    :
                                    <div>
                                        <h4>Não foi possivel carregar o Top 3</h4>
                                    </div>}

                            </thead>
                        </table>
                    </div>
                    :
                    <div></div>

            }
            <button onClick={() => handleShowSectionTopTenNames()}>Ver top 10 nomes Brasileiros</button>
        </>
    );
}

export default HomePage;