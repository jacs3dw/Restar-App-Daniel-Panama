import axios, { type Method } from "axios";
import type { RequestOptions, ResponseApi } from "../src/types/api/ApiInstanceType";


/**
 * Realiza una solicitud HTTP usando axios.
 *
 * @param {string} method - Método HTTP (por ejemplo: "GET", "POST", "PUT").
 * @param {{ url: string, body: any, headers: any, responseType: 'json' | 'text' | 'blob' | 'arraybuffer' }} options - Objeto con configuración de la solicitud.
 * @returns {Promise<{ data: any, status: boolean, port: number }>} - Respuesta estándar con estructura personalizada.
 */
const makeRequest = async (method: Method, { url, body, headers, responseType = 'json' }: RequestOptions): Promise<ResponseApi> => {
    const responseApi: ResponseApi = {
        data: null,
        status: true,
        port: 200,
    };

    const config: any = {
        method,
        url,
        headers,
        responseType,
    };

    if (body !== null && method !== 'GET' && method !== 'DELETE') {
        config.data = body;
    }

    try {
        const response = await axios(config);
        responseApi.data = response.data;

        return responseApi;
    } catch (error) {
        responseApi.status = false;
        if (axios.isAxiosError(error)) {
            // Error HTTP (por ejemplo: 400, 401, 500)
            responseApi.port = error.response?.status || 500;
            responseApi.data = error.response?.data || null;
        } else {
            // Otro tipo de error (por ejemplo: de red)
            responseApi.port = 500;
            responseApi.data = null;
            responseApi.status = false;
        }
        return responseApi;
    }
};

/**
 * Realiza una solicitud GET.
 *
 * @param {{ url: string, headers: any }} params - Objeto con la URL y headers para la petición.
 * @returns {Promise<{ data: any, status: boolean, port: number }>} - Respuesta personalizada con los datos del servidor.
 */
const get = async ({ url, headers, responseType }: RequestOptions): Promise<ResponseApi> => {
    return await makeRequest("GET", { url, headers, body: null, responseType });
};

/**
 * Realiza una solicitud POST.
 *
 * @param {{ url: string, body: any, headers: any }} params - URL, cuerpo del request y headers.
 * @returns {Promise<{ data: any, status: boolean, port: number }>} - Respuesta personalizada con los datos del servidor.
 */
const post = async ({ url, body, headers, responseType }: RequestOptions): Promise<ResponseApi> => {
    return await makeRequest("POST", { url, body, headers, responseType });
};

/**
 * Realiza una solicitud PUT.
 *
 * @param {{ url: string, body: any, headers: any }} params - URL, cuerpo del request y headers.
 * @returns {Promise<{ data: any, status: boolean, port: number }>} - Respuesta personalizada con los datos del servidor.
 */
const put = async ({ url, body, headers, responseType }: RequestOptions): Promise<ResponseApi> => {
    return await makeRequest("PUT", { url, body, headers, responseType });
};

/**
 * Realiza una solicitud PATCH.
 *
 * @param {{ url: string, body: any, headers: any }} params - URL, cuerpo del request y headers.
 * @returns {Promise<{ data: any, status: boolean, port: number }>} - Respuesta personalizada con los datos del servidor.
 */
const patch = async ({ url, body, headers, responseType }: RequestOptions): Promise<ResponseApi> => {
    return await makeRequest("PATCH", { url, body, headers, responseType });
};

/**
 * Realiza una solicitud DELETE.
 *
 * @param {{ url: string, headers: any }} params - Objeto con la URL y headers para la petición.
 * @returns {Promise<{ data: any, status: boolean, port: number }>} - Respuesta personalizada con los datos del servidor.
 */
const remove = async ({ url, headers, responseType }: RequestOptions): Promise<ResponseApi> => {
    return await makeRequest("DELETE", { url, headers, body: null, responseType });
};

export const apiInstances = {
    get,
    post,
    put,
    patch,
    remove,
};
