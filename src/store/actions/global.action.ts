import {
    ADD_NEW_CHECKOUT_ITEM,
    SET_ALL_CHECKOUT_ITEMS,
    SET_CHECKOUT_BUTTON,
    SET_DARK_MODE,
    SET_DETAIL_ITEM_DATA,
    SET_ESTIMATE_PRICE, SET_INPUT_SEARCH_ITEM_G,
    SET_LAT_LNG_G,
    SET_RECEIVER_DATA_G,
    SET_TOTAL_END_PRICE,
    SET_TOTAL_PRODUCT
} from "../keys";
import {ICheckoutItem, ILatLng, IReceiverData} from "../../models/global.action.model";

export function setDarkMode(payload: boolean) {
    return {
        type: SET_DARK_MODE,
        payload,
    };
}

export function setCheckoutButton(payload: boolean) {
    return {
        type: SET_CHECKOUT_BUTTON,
        payload,
    };
}

export function setTotalProduct(payload: number) {
    return {
        type: SET_TOTAL_PRODUCT,
        payload,
    };
}

export function setEstimatePrice(payload: number) {
    return {
        type: SET_ESTIMATE_PRICE,
        payload,
    };
}

export function addNewCheckoutItem(payload: ICheckoutItem) {
    return {
        type: ADD_NEW_CHECKOUT_ITEM,
        payload,
    };
}

export function setAllCheckoutItems() {
    return {
        type: SET_ALL_CHECKOUT_ITEMS,
    };
}

export function setTotalEndPrice(payload: number) {
    return {
        type: SET_TOTAL_END_PRICE,
        payload,
    };
}

export function setDetailItemData(payload: object) {
    return {
        type: SET_DETAIL_ITEM_DATA,
        payload,
    };
}

export function setReceiverDataG(payload: IReceiverData) {
    return {
        type: SET_RECEIVER_DATA_G,
        payload,
    };
}

export function setLatLngG(payload: ILatLng) {
    return {
        type: SET_LAT_LNG_G,
        payload,
    };
}

export function setInputSearchItemG(payload: string) {
    return {
        type: SET_INPUT_SEARCH_ITEM_G,
        payload,
    };
}