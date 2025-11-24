import type { ResponseApp } from "../types/api/ApiInstanceType";

/* eslint-disable @typescript-eslint/no-explicit-any */
const responseApp: ResponseApp = {
    data: null,
    message: '',
    status: true,
}

export function infoErrorApi(data: any, message: string) {
    const response = structuredClone(responseApp);
    response.status = false;

    if (typeof data === 'object' && data !== null && 'message' in data) {
        response.message = (data as { message: string }).message;
    } else {
        response.message = message;
    }

    return response;
}

export const responseApi = {
    responseApp,
}