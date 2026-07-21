import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Axios";
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
/*export const fetchRemovePost = createAsyncThunk('/posts/fetchRemovePost', async (id) => {
    const {data} = await axios.delete(`/posts/${id}`);
    return data;
});*/

const initialState = {
  products: {
    items: [],
    status: "loading",
  },
  variants: {
    items: [],
    status: "loading",
  },
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
    /* [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg)
        },*/
  },
});

export const productsReducer = productsSlice.reducer;
