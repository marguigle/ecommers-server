import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  blog: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pages: 1,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload.blogs || action.payload;
      if (action.payload.total !== undefined) {
        state.total = action.payload.total;
        state.page = action.payload.page || 1;
        state.pages = action.payload.pages || 1;
      }
    },
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearBlog: (state) => {
      state.blog = null;
    },
  },
});

export const { setBlogs, setBlog, setLoading, setError, clearBlog } = blogSlice.actions;
export default blogSlice.reducer;
