import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getJobs = createAsyncThunk('dashboardJobs/jobs/getJobs', async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/jobpost`);
  const data = await response.data.jobposts;

  return data;
});

export const removeJobs = createAsyncThunk(
  'dashboardJobs/jobs',
  async (jobIds, { dispatch, getState }) => {
    const idArr = jobIds.map((d) => d.toString())

    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_BASE_URL}/jobpost/delete`,
      data: { ids: idArr }
    });

    return jobIds;
  }
);

const jobsAdapter = createEntityAdapter({});

export const { selectAll: selectJobs, selectById: selectJobById } =
  jobsAdapter.getSelectors((state) => state.dashboardJobs.jobs);

const jobsSlice = createSlice({
  name: 'dashboardJobs/jobs',
  initialState: jobsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setJobsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getJobs.fulfilled]: jobsAdapter.setAll,
    [removeJobs.fulfilled]: (state, action) =>
      jobsAdapter.removeMany(state, action.payload),
  },
});

export const { setJobsSearchText } = jobsSlice.actions;

export const selectJobsSearchText = ({ dashboardJobs }) => dashboardJobs.jobs.searchText;

export default jobsSlice.reducer;
