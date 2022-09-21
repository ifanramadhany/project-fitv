import {SET_ALL_ITEMS, SET_LOADING, SET_ERROR} from "../keys";

export function setAllItems(payload: any[] | undefined) {
    return {
        type: SET_ALL_ITEMS,
        payload,
    };
}

export function setLoadingItem(payload: boolean) {
    return {
        type: SET_LOADING,
        payload,
    };
}

export function setErrorItem(payload: string | undefined) {
    return {
        type: SET_ERROR,
        payload,
    };
}