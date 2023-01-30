import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getBlog = createAsyncThunk('dashboardBlogs/blog/getBlog', async (blogId) => {
  const response = await axios.get(`/api/ecommerce/products/${blogId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeBlog = createAsyncThunk(
  'dashboardBlogs/blog/removeBlog',
  async (val, { dispatch, getState }) => {
    const { id } = getState().dashboardBlogs.blog;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveBlog = createAsyncThunk(
  'dashboardBlogs/blog/saveBlog',
  async (blogData, { dispatch, getState }) => {
    const { id } = getState().dashboardBlogs;

    const response = await axios.put(`/api/ecommerce/products/${id}`, blogData);

    const data = await response.data;

    return data;
  }
);

const blogSlice = createSlice({
  name: 'dashboardBlogs/blog',
  initialState: null,
  reducers: {
    resetBlog: () => null,
    newBlog: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          name: '',
          handle: '',
          description: '',
          categories: [],
          tags: [],
          images: [],
          priceTaxExcl: 0,
          priceTaxIncl: 0,
          taxRate: 0,
          comparedPrice: 0,
          quantity: 0,
          sku: '',
          width: '',
          height: '',
          depth: '',
          weight: '',
          extraShippingFee: 0,
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getBlog.fulfilled]: (state, action) => action.payload,
    [saveBlog.fulfilled]: (state, action) => action.payload,
    [removeBlog.fulfilled]: (state, action) => null,
  },
});

export const { newBlog, resetBlog } = blogSlice.actions;

export const selectBlog = ({ dashboardBlogs }) => dashboardBlogs.blog;

export default blogSlice.reducer;
