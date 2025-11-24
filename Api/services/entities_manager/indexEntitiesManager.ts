import { ResponseApp, ResponseApi } from "src/types/api/ApiInstanceType";
// import type { PostEntityManagerType, ServiceSimulatorType } from "../../../types/api/services/entity_manager/EntityManagerType";
import { fetchApiAuthenticated } from "../../utils/fetchAuthenticated";
import { infoErrorApi, responseApi } from "src/utils/responseApi";

/**
 * Obtener el entity manager por el Id
 *  @param {{
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
