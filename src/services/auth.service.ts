import axios from "axios";

import BaseService from "./base.service";

const baseApiOaSecurity = process.env.REACT_APP_SERVICE_BASE_PATH_OA_SECURITY;
const basic = process.env.REACT_APP_AUTHORIZATION;

export default class AuthService extends BaseService {
    public  instance = axios.create({
        baseURL: baseApiOaSecurity,
    });

    public async getUserToken(): Promise<any> {
        const params =  {
            username: "livin",
            source: "livin",
            grant_type: "password",
        }
        const headers = { Authorization: `Basic ${  basic}` }
        return this.httpGet("/oauth/token", params, headers);
    }
}