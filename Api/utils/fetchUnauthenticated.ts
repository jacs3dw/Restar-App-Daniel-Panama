import { AxiosHeaders } from 'axios';
import type { ResponseType } from 'axios';
import { apiInstances } from '../apiInstance';
import type { RequestOptions, ResponseApi } from '../../src/types/api/ApiInstanceType';
import { environment } from '../../src/utils/environment';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Construye la configuración básica para una petición HTTP sin autenticación.
 *
 * @param path - Ruta del endpoint que se quiere consumir, por ejemplo "/usuarios".
 * @param contentType - Tipo de contenido que se va a enviar ("json" o "form-data").
 * @param body - Cuerpo del request, puede ser un objeto, FormData, etc.
 * @param responseType - Tipo de respuesta esperado (por ejemplo "json", "blob").
 * @param accept - Encabezado 'Accept' para la petición (por defecto "application/json").
 * @returns Objeto con URL, headers, body y responseType para hacer la petición.
 */
const resourceApi = (
    path: string,
    contentType: 'json' | 'form-data' = 'json',
    body: any = null,
    responseType?: ResponseType,
    accept: string = 'application/json'
): RequestOptions => {
    const url = `${environment.API_BACKEND_APP}${path}`;
    const contentTypeHeader =
        contentType === 'json' ? 'application/json' : 'multipart/form-data';

    const headersInstance = new AxiosHeaders();
    headersInstance.set('Accept', accept);
    headersInstance.set('Content-Type', contentTypeHeader);

    // Convertir RawAxiosHeaders a Record<string, string>
    const raw = headersInstance.toJSON();
    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(raw)) {
        if (value == null) continue;
        if (Array.isArray(value)) {
            headers[key] = value.join(', ');
        } else {
            headers[key] = String(value);
        }
    }

    return {
        url,
        headers,
        body,
        responseType,
    };
};

/**
 * Realiza una petición GET.
 *
 * @param path - Ruta del endpoint.
 * @param contentType - Tipo de contenido esperado (por defecto "json").
 * @returns Promesa con la respuesta del servidor.
 */
const get = async (
    path: string,
    contentType: 'json' | 'form-data' = 'json'
): Promise<ResponseApi> => {
    return apiInstances.get(resourceApi(path, contentType));
};

/**
 * Realiza una petición POST.
 *
 * @param path - Ruta del endpoint.
 * @param body - Cuerpo del request.
 * @param contentType - Tipo de contenido a enviar (por defecto "json").
 * @returns Promesa con la respuesta del servidor.
 */
const post = async (
    path: string,
    body: any,
    contentType: 'json' | 'form-data' = 'json'
): Promise<ResponseApi> => {
    return apiInstances.post(resourceApi(path, contentType, body));
};

/**
 * Realiza una petición POST donde retorna un blob.
 *
 * @param path - Ruta del endpoint.
 * @param body - Cuerpo del request.
 * @param accept - Tipo de contenido a aceptar (por defecto "image/png").
 * @returns Promesa con la respuesta del servidor.
 */
const postBlob = async (
    path: string,
    body: any,
    accept: 'image/png' | 'application/pdf' = 'image/png'
): Promise<ResponseApi> => {
    return apiInstances.post(
        resourceApi(path, 'json', body, 'blob', accept)
    );
};

/**
 * Realiza una petición PUT.
 *
 * @param path - Ruta del endpoint.
 * @param body - Cuerpo del request.
 * @param contentType - Tipo de contenido a enviar (por defecto "json").
 * @returns Promesa con la respuesta del servidor.
 */
const put = async (
    path: string,
    body: any,
    contentType: 'json' | 'form-data' = 'json'
): Promise<ResponseApi> => {
    return apiInstances.put(resourceApi(path, contentType, body));
};

/**
 * Realiza una petición PATCH.
 *
 * @param path - Ruta del endpoint.
 * @param body - Cuerpo del request.
 * @param contentType - Tipo de contenido a enviar (por defecto "json").
 * @returns Promesa con la respuesta del servidor.
 */
const patch = async (
    path: string,
    body: any,
    contentType: 'json' | 'form-data' = 'json'
): Promise<ResponseApi> => {
    return apiInstances.patch(resourceApi(path, contentType, body));
};

export const fetchApiUnauthenticated = {
    get,
    post,
    postBlob,
    put,
    patch,
};
