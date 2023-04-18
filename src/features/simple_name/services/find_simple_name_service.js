const findSimpleNameService = async (name) => {

    let responseApi = [];

    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`);

        if (response.status == 200) {
            const responseJs = await response.json();
            responseJs.map(
                data => {
                    if (data.res != undefined) {
                        responseApi = data.res;
                    } else {
                        responseApi = [];
                    }
                }
            );

        } else {
            throw response;
        }

    } catch (error) {
        ///TODO: Melhorar essa validação
        responseApi = [];
    }

    return responseApi;
}

export default findSimpleNameService;