import {SET_DARK_MODE, SET_CHECKOUT_BUTTON, SET_TOTAL_PRODUCT, SET_ESTIMATE_PRICE} from "../keys";

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