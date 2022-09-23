import axios, {AxiosResponse} from "axios";

import BaseService from "./base.service";

const baseApiMAMasterItem = process.env.REACT_APP_SERVICE_BASE_PATH_MA_MASTER_ITEM;

export default class ItemService extends BaseService {
    public instance = axios.create({
        baseURL: baseApiMAMasterItem
    });

    public getRecommendedItems(): Promise<AxiosResponse> {
        return this.httpGet("/v1/item/recommended");
    }

    public getSuggestion(params: any): Promise<AxiosResponse> {
        return this.httpGet("/v1/search/suggestion", params)
    }

    public getItemDetail(itemId: number): Promise<AxiosResponse> {
        return this.httpGet(`v1/item/${itemId}`)
    }

    public getBatchItemDetail(itemId: number[]): Promise<AxiosResponse> {
        return this.httpGet(`v1/item/batch/${itemId.join(",")}`)
    }
}