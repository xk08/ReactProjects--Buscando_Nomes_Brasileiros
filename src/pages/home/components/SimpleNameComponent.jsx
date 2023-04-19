import { useState } from "react";
import formatNumberWithDots from '../../../global/format_number_with_dots';
import SimpleButtonComponent from '././Buttons/SimpleButtonComponent';

function SimpleNameComponent() {

    const [name, setName] = useState("");
    const [apiData, setApiData] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleButtonClicked = async () => {
        const response = await findSimpleNameService(name ?? "xk08");
        setApiData(response)
    }



    const findSimpleNameService = async (name) => {

        let responseApi = [];
    
        try {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`);
    
            if (response.status == 200) {
                const responseJs = await response.json();
                responseJs.map(
                    data => {
                        if (data.res != undefined) {
                            responseApi = data.res;
                        } else {
                            responseApi = [];
                        }
                    }
                );
    
            } else {
                throw response;
            }
    
        } catch (error) {
            ///TODO: Melhorar essa validação
            responseApi = [];
        }
    
        return responseApi;
    }

    return (
        <>
            <div>
                <input type="text" value={name} onChange={handleNameChange} />
                <br />
                <SimpleButtonComponent label="Buscar nome" fn={handleButtonClicked} />

            </div>

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
        </>
    );
}

export default SimpleNameComponent;