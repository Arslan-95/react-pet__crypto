import { createStore } from "redux";
import rootReducer from './reducers/root.js';

const store = createStore(rootReducer);

export default store;