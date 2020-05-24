import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducer, { initalState } from './reducers'

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== "production") {
        const { composeWithDevTools } = require("redux-devtools-extension");
        // 开发模式打印redux信息
        const { logger } = require("redux-logger");
        middleware.push(logger);
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

function configureStore(initialState = initalState) {
    const store = createStore(rootReducer, initialState, bindMiddleware([thunkMiddleware]));
    return store;
}

export default configureStore;