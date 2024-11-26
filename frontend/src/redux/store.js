import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart/cartSlice'
import bookApi from "./features/books/bookAPI";
import orderApi from "./features/orders/orderApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware, orderApi.middleware),
})
