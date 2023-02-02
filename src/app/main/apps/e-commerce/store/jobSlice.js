import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import moment from 'moment';

export const getJob = createAsyncThunk('dashboardJobs/jobs/getJob', async (jobId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/jobpost/${jobId}`);
  const data = await response.data.jobPosts;

  return data === undefined ? null : data;
});

export const removeJob = createAsyncThunk(
  'dashboardJobs/jobs/removeJob',
  async (val, { dispatch, getState }) => {
    const { id } = getState().dashboardJobs.job;
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/jobpost/delete/${id}`);
    return id;
  }
);

export const saveJob = createAsyncThunk(
  'dashboardJobs/jobs/saveJob',
  async (jobData, { dispatch, getState }) => {

    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/jobpost/create`, jobData);

    const data = await response.data;

    return data;
  }
);

export const updateJob = createAsyncThunk(
  'dashboardJobs/jobs/updateJob',
  async (jobData, { dispatch, getState }) => {
    const { id } = getState().dashboardJobs.job;

    delete jobData.id
    delete jobData.createdAt
    delete jobData.updatedAt

    const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/jobpost/update/${id}`, jobData);

    const data = await response.data;

    return data;
  }
);

const jobSlice = createSlice({
  name: 'dashboardJobs/jobs',
  initialState: null,
  reducers: {
    resetJob: () => null,
    newJob: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          title: '',
          offer: '',
          description: '',
          requirements: '',
          job_type: '',
          job_category: '',
          department: '',
          location: '',
          total_positions: '',
          experience: 0,
          posting_date: moment(Date.now()).format(),
          apply_before: '',
        },
      }),
    },
  },
  extraReducers: {
    [getJob.fulfilled]: (state, action) => action.payload,
    [saveJob.fulfilled]: (state, action) => action.payload,
    [updateJob.fulfilled]: (state, action) => null,
    [removeJob.fulfilled]: (state, action) => null,
  },
});

export const { newJob, resetJob } = jobSlice.actions;

export const selectJob = ({ dashboardJobs }) => dashboardJobs.job;

export default jobSlice.reducer;
