import {combineReducers,legacy_createStore,applyMiddleware,compose} from "redux"
import thunk from "redux-thunk"
import { authReducer } from "./auth/authReducer"

export const store = legacy_createStore(
    combineReducers({
        auth : authReducer
    }),
    compose(applyMiddleware(thunk))
)