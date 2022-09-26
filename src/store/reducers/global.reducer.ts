import {
    SET_DARK_MODE,
    SET_CHECKOUT_BUTTON,
    SET_TOTAL_PRODUCT,
    SET_ESTIMATE_PRICE,
    ADD_NEW_CHECKOUT_ITEM,
    SET_ALL_CHECKOUT_ITEMS,
    SET_TOTAL_END_PRICE,
    SET_DETAIL_ITEM_DATA
} from "../keys";
import {ICheckoutItem} from "../../models/global.action.model";

interface InitialStateI {
    darkMode: boolean;
    checkoutButton: boolean;
    totalProduct: number;
    estimatePrice: number;
    allCheckoutItems: { [id: number] : ICheckoutItem };
    totalEndPrice: number;
    detailItemData: object | undefined;
}

interface ActionType {
    type: string;
    payload: any;
}

const initialState : InitialStateI = {
    darkMode: false,
    checkoutButton: false,
    totalProduct: 0,
    estimatePrice: 0,
    allCheckoutItems: {},
    totalEndPrice: 0,
    detailItemData: undefined
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
        case ADD_NEW_CHECKOUT_ITEM:
            let newAllCheckoutItems: { [id: number] : ICheckoutItem } = state.allCheckoutItems
            if(payload.totalItems === 0) {
                delete newAllCheckoutItems[payload.id]
            } else {
                newAllCheckoutItems[payload.id] = payload
            }
            return  {...state, allCheckoutItems: newAllCheckoutItems}
        case SET_ALL_CHECKOUT_ITEMS:
            return {...state, allCheckoutItems: {}}
        case SET_TOTAL_END_PRICE:
            return {...state, totalEndPrice: payload}
        case SET_DETAIL_ITEM_DATA:
            return {...state, detailItemData: payload}
        default:
            return state
    }
}