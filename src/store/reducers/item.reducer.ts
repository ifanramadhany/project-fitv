import {SET_ALL_ITEMS, SET_ERROR, SET_LOADING} from "../keys";

interface InitialStateI {
    allItems?: any[] | undefined;
    loading?: boolean;
    error?: string | undefined;
}

interface ActionType {
    type: string;
    payload: any;
}

const initialState : InitialStateI = {
    allItems: undefined,
    loading: false,
    error: undefined
}


export default function (state: InitialStateI = initialState, action: ActionType) {
    const {type, payload} = action
    switch (type) {
        case SET_ALL_ITEMS:
            return {...state, allItems: payload}
        case SET_LOADING:
            return {...state, loading: payload}
        case SET_ERROR:
            return {...state, error: payload}
        default:
            return state
    }
}