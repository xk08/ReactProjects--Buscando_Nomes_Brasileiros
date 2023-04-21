
export default async function useFetch(baseUrl) {

    ///TODO: Refazer esse component com base em:
   // https://dev.to/techcheck/custom-react-hook-usefetch-eid
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