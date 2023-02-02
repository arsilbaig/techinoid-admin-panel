import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContacts = createAsyncThunk('dashboardContacts/contacts/getContacts', async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/contact`);
    const data = await response.data.contactUss;

    return data;
});

export const removeContacts = createAsyncThunk(
    'dashboardContacts/contacts',
    async (contactIds, { dispatch, getState }) => {
        const idArr = contactIds.map((d) => d.toString())

        await axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_BASE_URL}/contact/delete`,
            data: { ids: idArr }
        });

        return contactIds;
    });

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactById } =
    contactsAdapter.getSelectors((state) => state.dashboardContacts.userContacts);

const userContactsSlice = createSlice({
    name: 'dashboardContacts/contacts',
    initialState: contactsAdapter.getInitialState({
        searchText: '',
    }),
    reducers: {
        setContactsSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: (event) => ({ payload: event.target.value || '' }),
        },
    },
    extraReducers: {
        [getContacts.fulfilled]: contactsAdapter.setAll,
        [removeContacts.fulfilled]: (state, action) =>
            contactsAdapter.removeMany(state, action.payload),
    },
});

export const { setContactsSearchText } = userContactsSlice.actions;

export const selectContactsSearchText = ({ dashboardContacts }) => dashboardContacts?.userContacts?.searchText;

export default userContactsSlice.reducer;
