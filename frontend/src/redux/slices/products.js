import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { instance } from "../../Axios";
//import { ProductCard } from "../../components/ProductCard/productCard";

export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async () => {
    const { data } = await axios.get("api/products");
    return data;
  },
);

export const fetchProductVariants = createAsyncThunk(
  "/product_variants/fetchProductVariants",
  async () => {
    const { data } = await axios.get("api/product_variants");
    return data;
  },
);
export const fetchEditProduct = createAsyncThunk('api/products/fetchEditProduct', async (id) => {
    const {data} = await instance.get(`api/products/${id}`);
    
    return data;
});
export const fetchRemoveProducts = createAsyncThunk('/products/fetchRemoveProducts', async (id) => {
    const {data} = await instance.delete(`api/products/${id}`);
    return data;
});
const initialState = {
  products: {
    items: [],
    status: "loading",
  },
  variants: {
    items: [],
    status: "loading",
  },
  edits: {
    items: [],
    status: "loading",
  }
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.products.items = [];
      state.products.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products.items = action.payload;
      state.products.status = "loaded";
    },
    [fetchProducts.rejected]: (state) => {
      state.products.items = [];
      state.products.status = "error";
    },

    [fetchProductVariants.pending]: (state) => {
      state.variants.items = [];
      state.variants.status = "loading";
    },
    [fetchProductVariants.fulfilled]: (state, action) => {
      state.variants.items = action.payload;
      state.variants.status = "loaded";
    },
    [fetchProductVariants.rejected]: (state) => {
      state.variants.items = [];
      state.variants.status = "error";
    },
     [fetchEditProduct.rejected]: (state) => {
      state.edits.items = [];
      state.edits.status = "error";
    },

    [fetchEditProduct.pending]: (state) => {
      state.edits.items = [];
      state.edits.status = "loading";
    },
    [fetchEditProduct.fulfilled]: (state, action) => {
      state.edits.items = action.payload;
      state.edits.status = "loaded";
    },
     [fetchRemoveProducts.pending]: (state, action) => {
            state.products.items = state.products.items.filter((obj) => obj.id !== action.meta.arg)
        },
  },
});

export const productsReducer = productsSlice.reducer;
