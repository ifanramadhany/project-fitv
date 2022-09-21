import {SET_DARK_MODE, SET_CHECKOUT_BUTTON, SET_TOTAL_PRODUCT, SET_ESTIMATE_PRICE} from "../keys";

interface InitialStateI {
    darkMode: boolean;
    checkoutButton: boolean;
    totalProduct: number;
    estimatePrice: number;
}

interface ActionType {
    type: string;
    payload: any;
}

const initialState : InitialStateI = {
    darkMode: false,
    checkoutButton: false,
    totalProduct: 0,
    estimatePrice: 0
}


export default function (state: InitialStateI = initialState, action: ActionType) {
    const {type, payload} = action
    switch (type) {
        case SET_DARK_MODE:
            return {...state, darkMode: payload}
        case SET_CHECKOUT_BUTTON:
            return {...state, checkoutButton: payload}
        case SET_TOTAL_PRODUCT:
            return {...state, totalProduct: payload}
        case SET_ESTIMATE_PRICE:
            return {...state, estimatePrice: payload}
        default:
            return state
    }
}