import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProjects = createAsyncThunk('dashboard/projects/getProjects', async () => {
  const response = await axios.get('/api/ecommerce/products');
  const data = await response.data;

  return data;
});

export const removeProjects = createAsyncThunk(
  'dashboard/projects',
  async (projectIds, { dispatch, getState }) => {
    await axios.delete('/api/ecommerce/products', { data: projectIds });

    return projectIds;
  }
);

const projectsAdapter = createEntityAdapter({});

export const { selectAll: selectProjects, selectById: selectProjectById } =
  projectsAdapter.getSelectors((state) => state.dashboard.projects);

const projectsSlice = createSlice({
  name: 'dashboard/projects',
  initialState: projectsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setProjectsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getProjects.fulfilled]: projectsAdapter.setAll,
    [removeProjects.fulfilled]: (state, action) =>
      projectsAdapter.removeMany(state, action.payload),
  },
});

export const { setProjectsSearchText } = projectsSlice.actions;

export const selectProjectsSearchText = ({ dashboard }) => dashboard.projects.searchText;

export default projectsSlice.reducer;
