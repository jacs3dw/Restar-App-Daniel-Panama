import { ResponseApp, ResponseApi } from "src/types/api/ApiInstanceType";
// import type { PostEntityManagerType, ServiceSimulatorType } from "../../../types/api/services/entity_manager/EntityManagerType";
import { fetchApiAuthenticated } from "../../utils/fetchAuthenticated";
import { infoErrorApi, responseApi } from "src/utils/responseApi";

/**
 * Obtener el entity manager por el Id
 *  @param {
 *      id: string
 * }}
 * @returns {Promise<{ data: any, message: string, status: boolean }>} - Respuesta estándar con estructura personalizada.
 */
export const getAllUsers = async () => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = `/users/all`;

    const respApi: ResponseApi = await fetchApiAuthenticated.get(path);

    const { status, data } = respApi;

    if (status) {
        response.data = data.data;
        return response;
    }

    return infoErrorApi(data, 'Error al obtener el usuario');
};

export const getAllProducts = async () => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = `/products/all`;

    const respApi: ResponseApi = await fetchApiAuthenticated.get(path);

    const { status, data } = respApi;

    if (status) {
        response.data = data.data;
        return response;
    }

    return infoErrorApi(data, 'Error al obtener el usuario');
};

export const getperfills = async () => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = `/users/profile`;

    const respApi: ResponseApi = await fetchApiAuthenticated.get(path);

    const { status, data } = respApi;

    if (status) {
        response.data = data.data;
        return response;
    }

    return infoErrorApi(data, 'Error al obtener el usuario');
};

export const getAllorders = async () => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = `/order-management/by-user`;

    const respApi: ResponseApi = await fetchApiAuthenticated.get(path);
    const { status, data } = respApi;

    if (status) {
        response.data = data.data; // <- Todas las órdenes del usuario
        return response;
    }

    return infoErrorApi(data, 'Error al obtener las órdenes');
};


export const updatePerfil = async (id: string, body: any) => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = `/users/update/${id}`;

    const respApi: ResponseApi = await fetchApiAuthenticated.patch(path, body);
    console.log('respApi:', respApi);
    const { status, data } = respApi;

    if (status) {        
        response.message = 'Inicio de sesión exitoso'; 
        response.data = data.data;       
        return response;
    }

    return infoErrorApi(data, 'Error al Iniciar Sesión');
};


export const actualizarCarrito = async (body: any) => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = `/shopping-cart/save`;

    const respApi: ResponseApi = await fetchApiAuthenticated.post(path, body);
    console.log('respApi:', respApi);
    const { status, data } = respApi;

    if (status) {        
        response.message = 'Inicio de sesión exitoso'; 
        response.data = data.data;       
        return response;
    }

    return infoErrorApi(data, 'Error al Iniciar Sesión');
};

export const getproducto = async (id: string) => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = `/products/${id}`;

    const respApi: ResponseApi = await fetchApiAuthenticated.get(path);

    const { status, data } = respApi;

    if (status) {
        response.data = data.data;
        return response;
    }

    return infoErrorApi(data, 'Error al obtener el usuario');
};

export const getCarrito = async () => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = `/shopping-cart/user-logged`;

    const respApi: ResponseApi = await fetchApiAuthenticated.get(path);

    const { status, data } = respApi;

    if (status) {
        response.data = data.data;
        return response;
    }

    return infoErrorApi(data, 'Error al obtener el usuario');

    
};

export const removeCarrito = async (id: string) => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = `/shopping-cart/delete/${id}`;

    const respApi: ResponseApi = await fetchApiAuthenticated.remove(path);

    const { status, data } = respApi;

    if (status) {
        response.message = 'Producto eliminado del carrito';
        response.data = data.data;
        return response;
    }

    return infoErrorApi(data, 'Error al eliminar el producto del carrito');
};
