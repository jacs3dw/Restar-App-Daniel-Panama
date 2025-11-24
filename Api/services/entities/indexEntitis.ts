import { ResponseApp, ResponseApi } from "src/types/api/ApiInstanceType";
import { fetchApiAuthenticated } from "../../utils/fetchAuthenticated";
import { infoErrorApi, responseApi } from "src/utils/responseApi";

/**
 * Obtener todas la entidades
 * @returns {Promise<{ data: any, message: string, status: boolean }>} - Respuesta estándar con estructura personalizada.
 */
export const getAllEntities = async () => {
    const response: ResponseApp = structuredClone(responseApi.responseApp);
    const path = `/entities/all`;

    const respApi: ResponseApi = await fetchApiAuthenticated.get(path);

    const { status, data } = respApi;

    if (status) {
        response.data = data.data;
        return response;
    }

    return infoErrorApi(data, 'Error al obtener las entidades');
};