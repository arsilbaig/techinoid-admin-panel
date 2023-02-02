import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getBlog = createAsyncThunk('dashboardBlogs/blog/getBlog', async (blogId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/blogs/${blogId}`);
  const data = await response.data.blogs;

  const obj = {
    id: data.id,
    title: data.title,
    description: data.content,
    image: data.image
  }

  return obj === undefined ? null : obj;
});

export const removeBlog = createAsyncThunk(
  'dashboardBlogs/blog/removeBlog',
  async (val, { dispatch, getState }) => {
    const { id } = getState().dashboardBlogs.blog;
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/blogs/delete/${id}`);
    return id;
  }
);

export const saveBlog = createAsyncThunk(
  'dashboardBlogs/blog/saveBlog',
  async (blogData, { dispatch, getState }) => {

    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/blogs/create`, blogData);

    const data = await response.data;

    return data;
  }
);

export const updateBlog = createAsyncThunk(
  'dashboardBlogs/blog/updateBlog',
  async (blogData, { dispatch, getState }) => {
    const { id } = getState().dashboardBlogs.blog;

    const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/blogs/update/${id}`, blogData);

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
    [updateBlog.fulfilled]: (state, action) => null,
    [removeBlog.fulfilled]: (state, action) => null,
  },
});

export const { newBlog, resetBlog } = blogSlice.actions;

export const selectBlog = ({ dashboardBlogs }) => dashboardBlogs.blog;

export default blogSlice.reducer;
