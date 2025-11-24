import type { ResponseType } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RequestOptions {
    url: string;
    body?: any;
    headers?: Record<string, string>;
    responseType?: ResponseType;
}

export interface ResponseApi {
    data: any;
    status: boolean;
    port: number;
}

export interface ResponseApp {
    data: any;
    message: string;
    status: boolean;
    success?: boolean;
}