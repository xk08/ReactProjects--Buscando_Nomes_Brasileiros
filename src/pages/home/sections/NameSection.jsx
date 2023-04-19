import { useState } from "react";
import formatNumberWithDots from '../../../global/format_number_with_dots';
import SimpleButtonComponent from '../../../global/components/buttons/SimpleButtonComponent';
import UseFetchApi from '../../../global/Hooks/UseFetchApi';

function NameSection() {

    const [name, setName] = useState("");
    const [apiData, setApiData] = useState([]);
    const [requestValid, setRequestValid] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleButtonClicked = async () => {
        let resposta = await UseFetchApi(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`);
        let dados = await resposta.data;
        if (dados.length == 1) {
            setApiData(dados[0].res)
            setRequestValid(true);
        } else {
            setRequestValid(false);
        }
    }
    return (
        <>
            <div>
                <input type="text" value={name} onChange={handleNameChange} />
                <br />
                <SimpleButtonComponent label="Buscar nome" fn={handleButtonClicked} />

            </div>

            {requestValid ?
                <table>
                    <thead>
                        <tr>
                            <td>Periodo</td>
                            <td>Quantidade</td>
                        </tr>
                    </thead>

                    <tbody>
                        {apiData.map(
                            data =>
                                <tr key={data.periodo}>
                                    <td>{data.periodo}</td>
                                    <td>{formatNumberWithDots(data.frequencia)}</td>
                                </tr>
                        )}
                    </tbody>

                </table>
                :
                /* ///TODO: Trocar para um componente de erro personalizado... */
                <div>
                    Nada pra exibir aqui
                </div>
            }
        </>
    );
}

export default NameSection;