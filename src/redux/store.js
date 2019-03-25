import { createStore } from "redux"
import combineRedux  from "./reducers/index"

const store = createStore(combineRedux, /* preloadedState, */ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store