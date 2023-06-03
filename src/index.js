import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux"; 
import App from './App';
import itemsReducer from "./components/features/items"

const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
}); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider> 
  </React.StrictMode>
);


