import { useState } from "react";
import SimpleButtonComponent from "../../../global/components/buttons/SimpleButtonComponent"
import decadasList from "../data/decadas_list"

function RankingFiltersComponent(props) {

    /// Filtro: Sexo
    const [radioOption, setRadioOption] = useState()

    const handleSetRadioOption = (e) => {
        setRadioOption(e.target.value)
        /// Envia por callBack, o valor selecionado neste componente, para o componente pai
        props.parentCallbackRadioOption(e.target.value ?? "Sexo não selecionado");
    }

    /// Filtro: Decadas
    const [decada, setDecada] = useState("");

    const handleSetDecada = (e) => {
        setDecada(e.target.value)
        /// Envia por callBack, o valor selecionado neste componente, para o componente pai
        props.parentCallbackDecada(e.target.value ?? "Década não selecionada");
    }



    return (
        <>
            <div>




                <p>Sexo:</p>

                <input
                    type="radio"
                    name="radioGroup"
                    value="M"
                    id="M"
                    checked={radioOption == "M"}
                    onChange={handleSetRadioOption}
                />
                <label htmlFor="M">Maculino</label>

                <br />
                <input
                    type="radio"
                    name="radioGroup"
                    value="F"
                    id="F"
                    checked={radioOption == "F"}
                    onChange={handleSetRadioOption}
                />
                <label htmlFor="F">Feminino</label>

            </div>



            <br />



            <p>Década:</p>

            <div>
                <select
                    value={decada}
                    onChange={handleSetDecada}>
                    {decadasList.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>


            <SimpleButtonComponent
                label="Buscar (com filtros)"
                fn={props.fn}
                disabled={props.disabled}
            />

            <br />




        </>
    );
}

export default RankingFiltersComponent;