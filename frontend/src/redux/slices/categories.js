import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Axios.jsx";
import { Categories } from "../../components/Categories/Categories.jsx";

export const fetchCategories = createAsyncThunk(
  "/categories/fetchCategories",
  async () => {
    const { data } = await axios.get("/categories");
    return data;
  },
);

export const fetchSubcategories = createAsyncThunk(
  "/categories/fetchSubcategories",
  async () => {
    const { data } = await axios.get("/categories");
    return data;
  },
);
/*export const fetchRemovePost = createAsyncThunk('/posts/fetchRemovePost', async (id) => {
    const {data} = await axios.delete(`/posts/${id}`);
    return data;
});*/

const initialState = {
  categories: {
    items: [],
    status: "loading",
  },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.categories.items = [];
      state.categories.status = "loading";
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories.items = action.payload;
      state.categories.status = "loaded";
    },
    [fetchCategories.rejected]: (state) => {
      state.categories.items = [];
      state.categories.status = "error";
    },

    /* [fetchProductVariants.pending]: (state) => {
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

export const categoriesReducer = categoriesSlice.reducer;
