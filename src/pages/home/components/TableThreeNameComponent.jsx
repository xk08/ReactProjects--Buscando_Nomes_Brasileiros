import formatNumberWithDots from '../../../global/format_number_with_dots';

function TableThreeNamesComponent(props) {
    return (

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

                    {props.apiDataOk ? <tbody>
                        {
                            props.apiRankingThreeNames.map(
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
    );
}

export default TableThreeNamesComponent;