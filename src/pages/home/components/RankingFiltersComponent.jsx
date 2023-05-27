import SimpleButtonComponent from "../../../global/components/buttons/SimpleButtonComponent"
import decadasList from "../data/decadas_list"

function RankingFiltersComponent({ sex, handleChangeSex, decade, handleChangeDecade, disabled, fnOnClick }) {

    return (
        <>
            <div>

                <p>Sexo:</p>

                <input
                    type="radio"
                    name="radioGroup"
                    value="M"
                    id="M"
                    checked={sex == "M"}
                    onChange={handleChangeSex}
                />
                <label htmlFor="M">Maculino</label>

                <br />
                <input
                    type="radio"
                    name="radioGroup"
                    value="F"
                    id="F"
                    checked={sex == "F"}
                    onChange={handleChangeSex}
                />
                <label htmlFor="F">Feminino</label>

            </div>



            <br />



            <p>Década:</p>

            <div>
                <select
                    value={decade}
                    onChange={handleChangeDecade}>
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