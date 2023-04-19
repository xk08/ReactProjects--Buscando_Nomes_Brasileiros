export default async function useFetchApi(baseUrl) {
    try {
        const resposta = await fetch(baseUrl);
        if (resposta.status == 200) {
            const data = await resposta.json()

            let response = {
                status: resposta.status,
                data: data
            }
            return response;
        } else {
            throw resposta;
        }
    } catch (error) {
        
        let response = {
            status: error.status,
            data: null
        }
        return response;
    }
}