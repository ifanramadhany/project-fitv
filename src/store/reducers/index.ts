import {combineReducers} from "redux";
import globalReducer from "./global.reducer";
import itemReducer from "./item.reducer"

const RootReducer = combineReducers({
    globalState: globalReducer,
    itemState: itemReducer
})

export default RootReducer;