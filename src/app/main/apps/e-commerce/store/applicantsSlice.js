import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getApplications = createAsyncThunk('dashboardApplications/applications/getApplications', async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/jobApply`);
    const data = await response.data.jobApplies;

    return data;
});

export const removeApplications = createAsyncThunk(
    'dashboardApplications/applications',
    async (applicationIds, { dispatch, getState }) => {
        const idArr = applicationIds.map((d) => d.toString())

        await axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_BASE_URL}/jobApply/delete`,
            data: { ids: idArr }
        });

        return applicationIds;
    });

const applicationsAdapter = createEntityAdapter({});

export const { selectAll: selectApplications, selectById: selectApplicationById } =
    applicationsAdapter.getSelectors((state) => state.dashboardApplications.applicants);

const applicantsSlice = createSlice({
    name: 'dashboardApplications/applications',
    initialState: applicationsAdapter.getInitialState({
        searchText: '',
    }),
    reducers: {
        setApplicationsSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: (event) => ({ payload: event.target.value || '' }),
        },
    },
    extraReducers: {
        [getApplications.fulfilled]: applicationsAdapter.setAll,
        [removeApplications.fulfilled]: (state, action) =>
            applicationsAdapter.removeMany(state, action.payload),
    },
});

export const { setApplicationsSearchText } = applicantsSlice.actions;

export const selectApplicationsSearchText = ({ dashboardApplications }) => dashboardApplications?.applicants?.searchText;

export default applicantsSlice.reducer;
