import axios from "axios";

export const ApiConnector: any =  (method: string, url: string, body: any, headers?: any, params?: string) => {
    return axios({
        method: `${method}`,
        url: `${url}`,
        data: body ? body: null,
        headers: headers ? headers: null,
        params: params ? params: null
    })
}