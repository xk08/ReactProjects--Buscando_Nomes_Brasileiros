import { useState } from "react";
function SimpleName() {

    const [name, setName] = useState("");
    const [apiData, setApiData] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    function formatNumberWithDots(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const findNameDataInIbgeApi = async () => {

        try {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`);
            const apiData = await response.json();
            apiData.map(
                data => {
                    setApiData(data.res);
                }
            );
        } catch (error) {
            alert(error);
        }
    }
    return (
        <>
            <div>
                <input type="text" value={name} onChange={handleNameChange} />
                <br />
                <button onClick={() => findNameDataInIbgeApi()}>Buscar nome</button>
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

export default SimpleName;