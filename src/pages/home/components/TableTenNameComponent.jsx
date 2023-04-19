import formatNumberWithDots from '../../../global/format_number_with_dots';

function TableTenNamesComponent(props) {
    return (

        <div>
            <h2>Top 10 nomes brasileiros</h2>
            <table>
                <thead>
                    <tr>
                        <td>Posição</td>
                        <td>Nome</td>
                        <td>Frequência</td>
                    </tr>

                    {props.apiDataOk ? <tbody>
                        {
                            props.apiRankingTenNames.map(
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
                            <h4>Não foi possivel carregar o Top 10</h4>
                        </div>}

                </thead>
            </table>
        </div>
    );
}

export default TableTenNamesComponent;