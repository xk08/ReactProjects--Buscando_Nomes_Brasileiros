import formatNumberWithDots from '../../../global/format_number_with_dots';
import ErrorTextComponent from '../../../global/components/ErrorTextComponent';
import LoadingSkeletonComponent from '../../../global/components/animations/SkeletonLoader/LoadingSkeletonComponent';
//import LoadingSpinnerComponent from '../../../global/components/animations/LoadingSpinner/LoadingSpinnerComponent';

function TableThreeNamesComponent(props) {
    return (

        <div>
            <h2>Top 3 nomes brasileiros</h2>
            {/* TOP 3 NOMES BRASILEIROS*/}

            {props.isLoading ?
            <LoadingSkeletonComponent 
                exibeThreeNamesCardSkeleton={true}
                exibeNameDataCardSkeleton={false}
            />
           
           : <table>
                    <thead>
                        <tr>
                            <td>Posição</td>
                            <td>Nome</td>
                            <td>Frequência</td>
                        </tr>

                        {props.apiDataOk ?
                            <tbody>
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
                            : <ErrorTextComponent title={"Informação desconhecida"} description="Não foi possível encontrar o Ranking de Top 3 nomes brasileiros." />
                        }
                    </thead>
                </table>
            }
        </div>
    );
}

export default TableThreeNamesComponent;