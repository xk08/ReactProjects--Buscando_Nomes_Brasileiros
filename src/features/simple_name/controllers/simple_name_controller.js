import findSimpleNameService from '../services/find_simple_name_service'

const simpleNameController = async (name) => {

    let responseData;

    const response = await findSimpleNameService(name);

    if(response.data.length > 0) {
        responseData = response.data;

    }else {
        responseData = [];
    }
    return responseData;
}
export default simpleNameController;