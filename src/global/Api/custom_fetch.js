
import { executeOnDebugMode } from "../Api/api_config";

export default async function customFetch(baseUrl, requestInit, actionDescription) {
    let response = {
        status: null,
        data: null
    }
    try {
        const resposta = await fetch(baseUrl, requestInit);
        if (resposta.status == 200 || resposta.status == 201) {
            const data = await resposta.json();

            response = {
                status: resposta.status,
                data: data
            }

            if (executeOnDebugMode) {
                console.log(`###############\nAPI-FETCH-LOG ###\n->Action-Description: ${actionDescription}\n->Status: ${resposta.status}\n->Endpoint: ${baseUrl}\n->JSON: ${JSON.stringify(data)}\n###############\n`);
            } else {
                console.log(`###############\nAPI-FETCH-LOG ###\n->Action-Description: ${actionDescription}\n->Status: ${resposta.status}\n->Endpoint: ${baseUrl}\n###############\n`);
            }

        } else {
            throw resposta;
        }
    } catch (error) {
        response = {
            status: error.status,
            data: error
        }
    }
    return response;
}