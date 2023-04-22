import { useState } from "react";

import customFetch from '../../../global/Api/custom_fetch';
import {apiBaseUrlIbge} from '../../../global/Api/api_config';

import formatNumberWithDots from '../../../global/format_number_with_dots';
import textLengthValidation from '../../../global/validators/text_length_validator';

import ErrorTextComponent from '../../../global/components/ErrorTextComponent';
import SimpleInputComponent from '../../../global/components/inputs/SimpleInputComponent';
import SimpleButtonComponent from '../../../global/components/buttons/SimpleButtonComponent';
import EmptyComponent from '../../../global/components/EmptyComponent';

import LoadingSkeletonComponent from '../../../global/components/animations/SkeletonLoader/LoadingSkeletonComponent';
//import LoadingSpinnerComponent from '../../../global/components/animations/LoadingSpinner/LoadingSpinnerComponent';

function NameSection() {

    /* Estados */
    const [name, setName] = useState("");
    const [lastNameSearched, setLastNameSearched] = useState("");
    const [apiData, setApiData] = useState([]);

    /* Estados - Validações */
    const [requestValid, setRequestValid] = useState();
    const [textLengthIsNotValid, setTextLengthIsNotValid] = useState(true);
    const [textLengthValidationSmall, setTextLengthValidationSmall] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    /* Funções Handle */
    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleButtonClicked = async () => {

        setIsLoading(true);
        let resposta = await customFetch(`${apiBaseUrlIbge}/v2/censos/nomes/${name}`);

        setTimeout(() => {
            let dados = resposta.data;
            if (dados.length == 1) {
                setApiData(dados[0].res)
                setRequestValid(true);
            } else {
                setRequestValid(false);
            }
            setIsLoading(false);
        }, 1300);

        setLastNameSearched(name);
        setName("");
        setTextLengthIsNotValid(true);
    
    }

    /* Validações */
    const textLengthValidator = (event, minLength) => {
        let text = textLengthValidation(event, minLength)
        if (!text.isValid) {
            setTextLengthIsNotValid(true);
            setTextLengthValidationSmall((minLength - text.textLength) == 1 ? `Necessário +${minLength - text.textLength} caractere` : `Necessário +${minLength - text.textLength} caracteres`);
        } else {
            setTextLengthIsNotValid(false);
            setTextLengthValidationSmall("");
        }
    }

    /* Renderização da tela */
    return (
        <>
            <div>
                <SimpleInputComponent
                    type={"text"}
                    value={name}
                    fnOnChange={handleNameChange}
                    fnOnKeyUp={(event) => textLengthValidator(event, 3)}
                    smallDescription={textLengthValidationSmall}
                />

                <br />
                <SimpleButtonComponent
                    label="Buscar nome"
                    fn={handleButtonClicked}
                    disabled={textLengthIsNotValid}
                />

            </div>

            {
                (requestValid != null) ?
                    <h2>Informações sobre o nome: {lastNameSearched}</h2>
                    : <EmptyComponent />
            }

            {
                isLoading ?
                <LoadingSkeletonComponent 
                    exibeThreeNamesCardSkeleton={false}
                    exibeNameDataCardSkeleton={true}
            />
                    : requestValid
                        ? <table>
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
                        : (requestValid == null) ?
                            <EmptyComponent />
                            : <ErrorTextComponent
                                title={`O nome ${lastNameSearched} não foi encontrado`}
                                description="Escolha outro nome e tente novamente."
                            />
            }
        </>
    );
}

export default NameSection;