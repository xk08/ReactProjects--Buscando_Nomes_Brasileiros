import findSimpleNameService from '../services/find_simple_name_service'

const simpleNameController = async (name) => {

    ///TODO: Colocar alguma validação
    const responseData = await findSimpleNameService(name);
    return responseData;
}
export default simpleNameController;