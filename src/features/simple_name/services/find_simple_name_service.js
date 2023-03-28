const findSimpleNameService = async (name) => {

    const responseApi = {
        "data": []
    }

    try {
        ///TODO: Garantir que o nome jamais seja vazio...se não, chama outro endpoint.
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`);

        if (response.status == 200) {
            const responseJs = await response.json();


    
            responseJs.map(
                data => {
                    if (data.res != undefined) {
                        responseApi.data = data.res;
                    } else {
                        responseApi.data = [];
                    }
                }
            );

        } else {
            throw response;
        }

    } catch (error) {
        ///TODO: Melhorar essa validação
        responseApi.data = [];
    }

    return responseApi;
}

export default findSimpleNameService;