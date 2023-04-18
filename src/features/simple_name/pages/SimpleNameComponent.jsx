import { useState } from "react";
import formatNumberWithDots from '../../../global/format_number_with_dots';
import simpleNameController from '../controllers/simple_name_controller';

function SimpleNameComponent() {

    const [name, setName] = useState("");
    const [apiData, setApiData] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleButtonClicked = async () => {
        const response = await simpleNameController(name ?? "xk08");
        setApiData(response)
    }
    return (
        <>
            <div>
                <input type="text" value={name} onChange={handleNameChange} />
                <br />
                <button onClick={() => handleButtonClicked()}>Buscar nome</button>
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