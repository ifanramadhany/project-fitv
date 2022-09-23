import {
    ADD_NEW_CHECKOUT_ITEM,
    SET_CHECKOUT_BUTTON,
    SET_DARK_MODE,
    SET_ESTIMATE_PRICE,
    SET_TOTAL_PRODUCT,
    SET_ALL_CHECKOUT_ITEMS
} from "../keys";
import {ICheckoutItem} from "../../models/global.action.model";

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