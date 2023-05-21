import SimpleButtonComponent from "../../../global/components/buttons/SimpleButtonComponent"
import decadasList from "../data/decadas_list"

function RankingFiltersComponent({ sexo, handleChangeSexo, decada, handleChangeDecada, disabled, fnOnClick }) {

    return (
        <>
            <div>

                <p>Sexo:</p>

                <input
                    type="radio"
                    name="radioGroup"
                    value="M"
                    id="M"
                    checked={sexo == "M"}
                    onChange={handleChangeSexo}
                />
                <label htmlFor="M">Maculino</label>

                <br />
                <input
                    type="radio"
                    name="radioGroup"
                    value="F"
                    id="F"
                    checked={sexo == "F"}
                    onChange={handleChangeSexo}
                />
                <label htmlFor="F">Feminino</label>

            </div>



            <br />



            <p>Década:</p>

            <div>
                <select
                    value={decada}
                    onChange={handleChangeDecada}>
                    {decadasList.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <br />

            <SimpleButtonComponent
                label="Buscar (com filtros)"
                fn={fnOnClick}
                disabled={disabled}
            />
            <br />


        </>
    );
}

export default RankingFiltersComponent;