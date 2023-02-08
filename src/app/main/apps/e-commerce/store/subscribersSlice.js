import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSubscribers = createAsyncThunk('dashboardSubscribers/subscribers/getSubscribers', async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/connect`);
    const data = await response.data.connects;

    return data;
});

export const removeSubscribers = createAsyncThunk(
    'dashboardSubscribers/subscribers',
    async (subscriberIds, { dispatch, getState }) => {
        const idArr = subscriberIds.map((d) => d.toString())

        await axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_BASE_URL}/connect/delete`,
            data: { ids: idArr }
        });

        return subscriberIds;
    });

const subscribersAdapter = createEntityAdapter({});

export const { selectAll: selectSubscribers, selectById: selectSubscriberById } =
    subscribersAdapter.getSelectors((state) => state.dashboardSubscribers.subscribers);

const subscribersSlice = createSlice({
    name: 'dashboardSubscribers/subscribers',
    initialState: subscribersAdapter.getInitialState({
        searchText: '',
    }),
    reducers: {
        setSubscribersSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: (event) => ({ payload: event.target.value || '' }),
        },
    },
    extraReducers: {
        [getSubscribers.fulfilled]: subscribersAdapter.setAll,
        [removeSubscribers.fulfilled]: (state, action) =>
            subscribersAdapter.removeMany(state, action.payload),
    },
});

export const { setSubscribersSearchText } = subscribersSlice.actions;

export const selectSubscribersSearchText = ({ dashboardSubscribers }) => dashboardSubscribers?.subscribers?.searchText;

export default subscribersSlice.reducer;
