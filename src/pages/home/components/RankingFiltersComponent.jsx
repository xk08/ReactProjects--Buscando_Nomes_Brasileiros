import { useState } from "react";
import SimpleButtonComponent from "../../../global/components/buttons/SimpleButtonComponent"

function RankingFiltersComponent(props) {

    /// Radio Buttons (Filtro: Sexo)
    const [radioOption, setRadioOption] = useState();

    const handleSetRadioOption = (e) => {
        setRadioOption(e.target.value)
        /// Envia por callBack, o valor selecionado neste componente, para o componente pai
        props.parentCallback(e.target.value ?? "Não selecionado");
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