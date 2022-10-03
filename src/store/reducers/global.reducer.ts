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

interface InitialState {
    darkMode: boolean;
    checkoutButton: boolean;
    totalProduct: number;
    estimatePrice: number;
    allCheckoutItems: { [id: number]: ICheckoutItem };
    totalEndPrice: number;
    detailItemData: object | undefined;
    receiverDataG: IReceiverData;
    latLngG: ILatLng | undefined;
    inputSearchItemG: string;
}

interface ActionType {
    type: string;
    payload: any;
}

const initialState: InitialState = {
    darkMode: false,
    checkoutButton: false,
    totalProduct: 0,
    estimatePrice: 0,
    allCheckoutItems: {},
    totalEndPrice: 0,
    detailItemData: undefined,
    receiverDataG: {
        receiverName: "",
        receiverPhoneNumber: "",
        receiverEmail: "",
        receiverLocationData: "",
        receiverAddress: "",
        receiverDistrict: "",
        receiverPostCode: "",
        receiverNote: ""
    },
    latLngG: undefined,
    inputSearchItemG: ""
}


export default function (state: InitialState = initialState, action: ActionType) {
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
            let newAllCheckoutItems: { [id: number]: ICheckoutItem } = state.allCheckoutItems
            if (payload.totalItems === 0) {
                delete newAllCheckoutItems[payload.id]
            } else {
                newAllCheckoutItems[payload.id] = payload
            }
            return {...state, allCheckoutItems: newAllCheckoutItems}
        case SET_ALL_CHECKOUT_ITEMS:
            return {...state, allCheckoutItems: {}}
        case SET_TOTAL_END_PRICE:
            return {...state, totalEndPrice: payload}
        case SET_DETAIL_ITEM_DATA:
            return {...state, detailItemData: payload}
        case SET_RECEIVER_DATA_G:
            return {...state, receiverDataG: payload}
        case SET_LAT_LNG_G:
            return {...state, latLngG: payload}
        case SET_INPUT_SEARCH_ITEM_G:
            return {...state, inputSearchItemG: payload}
        default:
            return state
    }
}