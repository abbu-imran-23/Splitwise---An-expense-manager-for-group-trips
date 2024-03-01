import axios, { AxiosResponse } from "axios";

export const apiConnector = async (method:any, url: any, data?: any) => {
    try {
        const response: AxiosResponse = await axios({
            method: method,
            url: url,
            data: data
        });
        return response;
    } catch (error) {
        return error;
    } 
};