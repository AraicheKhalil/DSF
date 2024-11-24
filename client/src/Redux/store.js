// import { createStore, applyMiddleware } from "redux";
// import reducers from "./reducers";
// import { composeWithDevTools } from "@redux-devtools/extension";
// import { thunk } from "redux-thunk";

// const middlewares = [thunk];
// const store = createStore(
//   reducers,
//   composeWithDevTools(applyMiddleware(...middlewares))
// );
// export default store;

// store.js
import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './slices/fileSlice';

const store = configureStore({
  reducer: {
    files: fileReducer
  }
});

export default store;

