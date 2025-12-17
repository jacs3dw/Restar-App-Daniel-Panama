import { ResponseApp, ResponseApi } from "src/types/api/ApiInstanceType";
// import type { PostEntityManagerType, ServiceSimulatorType } from "../../../types/api/services/entity_manager/EntityManagerType";
import { fetchApiAuthenticated } from "../../utils/fetchAuthenticated";
import { infoErrorApi, responseApi } from "src/utils/responseApi";

/**
 * Obtener el entity manager por el Id
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

/**
 * 🔥 Productos para el Home (solo estado Initial)
 */
export const getHomeProducts = async () => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = `/products/home-products`;

    const respApi: ResponseApi = await fetchApiAuthenticated.get(path);
    const { status, data } = respApi;

    if (status) {
        response.data = data.data;
        return response;
    }

    return infoErrorApi(data, 'Error al obtener productos del home');
};

/**
 * 🔥 NUEVO SERVICIO
 * Productos con estado DIFERENTE de Initial (History)
 */
export const getStatusProducts = async () => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = `/products/status-products`;

    const respApi: ResponseApi = await fetchApiAuthenticated.get(path);
    const { status, data } = respApi;

    if (status) {
        response.data = data.data;
        return response;
    }

    return infoErrorApi(data, 'Error al obtener productos por estado');
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
        response.data = data.data;
        return response;
    }

    return infoErrorApi(data, 'Error al obtener las órdenes');
};

export const IdProducts = async (id: string) => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = `/products/${id}`;

    const respApi: ResponseApi = await fetchApiAuthenticated.get(path);
    const { status, data } = respApi;

    if (status) {
        response.data = data.data;
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
