
export default async function customFetch(baseUrl, requestInit) {
    let response = {
        status: null,
        data: null
    }
    try {
        const resposta = await fetch(baseUrl, requestInit);
        if (resposta.status == 200 || resposta.status == 201) {
            const data = await resposta.json()
            response = {
                status: resposta.status,
                data: data
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