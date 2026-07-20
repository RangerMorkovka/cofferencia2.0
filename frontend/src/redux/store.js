import {configureStore} from '@reduxjs/toolkit';
import { productsReducer } from './slices/products';
import { authReducer } from './slices/auth';
import {categoriesReducer} from './slices/categories';
const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: authReducer,
        categories: categoriesReducer,
    }
});

export default store;