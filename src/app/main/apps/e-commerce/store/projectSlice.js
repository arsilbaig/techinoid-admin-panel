import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getProject = createAsyncThunk('dashboard/project/getProject', async (projectId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/portfolios/${projectId}`);
  const data = await response.data.portfolios;

  const obj = {
    id: data.id,
    title: data.title,
    description: data.description,
    image: data.image
  }

  return obj === undefined ? null : obj;
});

export const removeProject = createAsyncThunk(
  'dashboard/project/removeProject',
  async (val, { dispatch, getState }) => {
    const { id } = getState().dashboard.project;
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/portfolios/delete/${id}`);
    return id;
  }
);

export const saveProject = createAsyncThunk(
  'dashboard/project/saveProject',
  async (projectData, { dispatch, getState }) => {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/portfolios/create`, projectData);

    const data = await response.data;

    return data;
  }
);

export const updateProject = createAsyncThunk(
  'dashboard/project/updateProject',
  async (projectData, { dispatch, getState }) => {
    const { id } = getState().dashboard.project;

    const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/portfolios/update/${id}`, projectData);

    const data = await response.data;

    return data;
  }
);

const projectSlice = createSlice({
  name: 'dashboard/project',
  initialState: null,
  reducers: {
    resetProject: () => null,
    newProject: {
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
    [getProject.fulfilled]: (state, action) => action.payload,
    [saveProject.fulfilled]: (state, action) => action.payload,
    [updateProject.fulfilled]: (state, action) => null,
    [removeProject.fulfilled]: (state, action) => null,
  },
});

export const { newProject, resetProject } = projectSlice.actions;

export const selectProject = ({ dashboard }) => dashboard.project;

export default projectSlice.reducer;
