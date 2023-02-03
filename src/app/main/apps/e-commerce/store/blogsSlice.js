import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBlogs = createAsyncThunk('dashboardBlogs/blogs/getBlogs', async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/blogs`);
  const data = await response.data.blogs;

  return data;
});

export const removeBlogs = createAsyncThunk(
  'dashboardBlogs/blogs',
  async (blogIds, { dispatch, getState }) => {
    const idArr = blogIds.map((d) => d.toString())

    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_BASE_URL}/blogs/delete`,
      data: { ids: idArr }
    });

    return blogIds;
  }
);

const blogsAdapter = createEntityAdapter({});

export const { selectAll: selectBlogs, selectById: selectBlogById } =
  blogsAdapter.getSelectors((state) => state.dashboardBlogs.blogs);

const blogsSlice = createSlice({
  name: 'dashboardBlogs/blogs',
  initialState: blogsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setBlogsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getBlogs.fulfilled]: blogsAdapter.setAll,
    [removeBlogs.fulfilled]: (state, action) =>
      blogsAdapter.removeMany(state, action.payload),
  },
});

export const { setBlogsSearchText } = blogsSlice.actions;

export const selectBlogsSearchText = ({ dashboardBlogs }) => dashboardBlogs.blogs.searchText;

export default blogsSlice.reducer;
