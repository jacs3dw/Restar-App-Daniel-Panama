import { fetchApiUnauthenticated } from "Api/utils/fetchUnauthenticated";
import { ResponseApp, ResponseApi } from "src/types/api/ApiInstanceType";
import { infoErrorApi, responseApi } from "src/utils/responseApi";

/**
 * Obtener todas la entidades
 * @returns {Promise<{ data: any, message: string, status: boolean }>} - Respuesta estándar con estructura personalizada.
 */


export const loginUser = async (body: any) => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = '/auth/login-password';

    const respApi: ResponseApi = await fetchApiUnauthenticated.post(path, body);
    console.log('respApi:', respApi);
    const { status, data } = respApi;

    if (status) {        
        response.message = 'Inicio de sesión exitoso'; 
        response.data = data.data;       
        return response;
    }

    return infoErrorApi(data, 'Error al Iniciar Sesión');
};

export const generateCode = async (body: any) => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = '/auth/generate-code';

    const respApi: ResponseApi = await fetchApiUnauthenticated.post(path, body);
    console.log('respApi:', respApi);
    const { status, data } = respApi;

    if (status) {        
        response.message = 'Inicio de sesión exitoso'; 
        response.data = data.data;       
        return response;
    }

    return infoErrorApi(data, 'Error al Iniciar Sesión');
};

export const LoginCode = async (body: any) => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = '/auth/login-code';

    const respApi: ResponseApi = await fetchApiUnauthenticated.post(path, body);
    console.log('respApi:', respApi);
    const { status, data } = respApi;

    if (status) {        
        response.message = 'Inicio de sesión exitoso'; 
        response.data = data.data;       
        return response;
    }

    return infoErrorApi(data, 'Error al Iniciar Sesión');
};