import { AxiosHeaders } from 'axios';
import type { ResponseType } from 'axios';
import { environment } from '../../src/utils/environment';
import { apiInstances } from '../apiInstance';
import { RequestOptions, ResponseApi } from 'src/types/api/ApiInstanceType';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Construye la configuración básica para una petición HTTP con autenticación.
 * Obtiene el token desde localStorage.
 *
 * @param path - Ruta del endpoint que se quiere consumir, por ejemplo "/usuarios".
 * @param contentType - Tipo de contenido que se va a enviar ("json" o "form-data").
 * @param body - Cuerpo del request, puede ser un objeto, FormData, etc.
 * @param responseType - Tipo de respuesta esperado (por ejemplo "json", "blob").
 * @param accept - Encabezado 'Accept' para la petición (por defecto "application/json").
 * @returns Objeto con URL, headers, body y responseType para hacer la petición.
 */
const resourceApiAuth = (
    path: string,
    contentType: 'json' | 'form-data' = 'json',
    body: any = null,
    responseType?: ResponseType,
    accept: string = 'application/json'
): RequestOptions => {
    const url = `${environment.API_BACKEND_APP}${path}`;
    const contentTypeHeader = contentType === 'json' ? 'application/json' : 'multipart/form-data';
    const token = localStorage.getItem('token') || '';

    const headersInstance = new AxiosHeaders();
    headersInstance.set('Accept', accept);
    headersInstance.set('Content-Type', contentTypeHeader);
    if (token) headersInstance.set('Authorization', `Bearer ${token}`);

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
 * Realiza una petición GET autenticada.
 *
 * @param path - Ruta del endpoint.
 * @param contentType - Tipo de contenido esperado (por defecto "json").
 * @returns Promesa con la respuesta del servidor.
 */
const get = async (
    path: string,
    contentType: 'json' | 'form-data' = 'json'
): Promise<ResponseApi> => apiInstances.get(resourceApiAuth(path, contentType));

/**
 * Realiza una petición POST autenticada.
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
): Promise<ResponseApi> => apiInstances.post(resourceApiAuth(path, contentType, body));

/**
 * Realiza una petición POST autenticada que retorna un blob.
 *
 * @param path - Ruta del endpoint.
 * @param body - Cuerpo del request.
 * @param accept - Tipo de contenido a aceptar (por defecto "application/pdf").
 * @returns Promesa con la respuesta del servidor.
 */
const postBlob = async (
    path: string,
    body: any,
    accept: string = 'application/octet-stream' // valor por defecto genérico
  ): Promise<ResponseApi> => apiInstances.post(
    resourceApiAuth(path, 'json', body, 'blob', accept)
  );
  
  

/**
 * Realiza una petición PUT autenticada.
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
): Promise<ResponseApi> => apiInstances.put(resourceApiAuth(path, contentType, body));

/**
 * Realiza una petición PATCH autenticada.
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
): Promise<ResponseApi> => apiInstances.patch(resourceApiAuth(path, contentType, body));

/**
 * Realiza una petición DELETE autenticada.
 *
 * @param path - Ruta del endpoint.
 * @param contentType - Tipo de contenido esperado (por defecto "json").
 * @returns Promesa con la respuesta del servidor.
 */
const remove = async (
    path: string,
    contentType: 'json' | 'form-data' = 'json'
): Promise<ResponseApi> => apiInstances.remove(resourceApiAuth(path, contentType));

export const fetchApiAuthenticated = {
    get,
    post,
    postBlob,
    put,
    patch,
    remove,
};
