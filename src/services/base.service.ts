import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from 'universal-cookie';

const basic = process.env.REACT_APP_AUTHORIZATION;

const baseApiOaSecurity = process.env.REACT_APP_SERVICE_BASE_PATH_OA_SECURITY;

export default abstract class BaseService {
    public cookies = new Cookies();

    public get accessToken() { return this.cookies.get('access_token') }
    public abstract instance: AxiosInstance;

    public async refreshToken(): Promise<any> {
        const instance = axios.create({
            baseURL: baseApiOaSecurity,
        });
        const params =  {
            username: "livin",
            source: "livin",
            grant_type: "password",
        }
        const headers = { Authorization: `Basic ${  basic }` }
        return instance({
            method: "GET",
            headers,
            url: "/oauth/token",
            params
        })
    }

    public getPostConfig(url: string, method: string, data?: any, params?: any, headers?: any): {[key: string]: any}{
        return {
            method,
            data,
            headers: {
                Accept: "application/json",
                "Content-type": "application/json", 
                "Authorization": `Bearer ${  this.accessToken || ''}`,
                ...headers
            },
            url,
            params
        }
        
    }

    async retryAndSetToken(error: any) {
        const originalRequest = error.config;
        const status = error?.response?.status;
        const corsError = status === 0 && error.code === "ERR_NETWORK"; // only dev

        if ((status === 401 && !originalRequest._retry) || (corsError && !originalRequest._retry)) {
            originalRequest._retry = true;
            const result = await this.refreshToken();                
            const expires = new Date()
            expires.setTime(expires.getTime() + (result.data.expires_in))
            this.cookies = new Cookies();
            this.cookies.set('access_token', result.data.access_token, {path: '/',  expires})
            this.cookies.set('refresh_token', result.data.refresh_token, {path: '/', expires})
            const retryOriginalRequest: any = new Promise((resolve) => {
                originalRequest.headers.Authorization = `Bearer ${  result.data.access_token}`;
                return resolve(axios(originalRequest));                
            });
            return retryOriginalRequest;
        }
        throw error;
    }
    
    public addIntercept() {
        this.instance.interceptors
            .response.use(response => response, async (error) => this.retryAndSetToken(error));
    }
    

    public async httpGet(url: string, params?: any, headers?: any): Promise<AxiosResponse> {
        this.addIntercept();
        return this.instance({
            method: "GET",
            data: {},
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.accessToken || ''}`,
                ...headers
            },
            url,
            params
        })
    }
    
    public async httpPost(url: string, htmlBody?: any, params?: any,  headers?: any): Promise<AxiosResponse> {  
        this.addIntercept();
        return this.instance(this.getPostConfig(url, "POST", htmlBody, params, headers))
    }

    public async httpPatch(url: string, htmlBody?: any, params?: any,  headers?: any): Promise<AxiosResponse> {  
        this.addIntercept();
        return this.instance(this.getPostConfig(url, "PATCH", htmlBody, params, headers))
    }

    public async httpPut(url: string, htmlBody?: any, params?: any,  headers?: any): Promise<AxiosResponse> {  
        this.addIntercept();
        return this.instance(this.getPostConfig(url, "PUT", htmlBody, params, headers))
    }
}