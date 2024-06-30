import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchCampsites = createAsyncThunk(
    'campsites/fetchCampsites',
    async () => {
        const response = await fetch(baseUrl + 'campsites');
        console.log('i am here 0');
        if (!response.ok) {
            console.log('i am here 1');
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        console.log('i am here 2');
        const data = await response.json();
        console.log(data);
        return data;
    }
);

const campsitesSlice = createSlice({
    name: 'campsites',
    initialState: { isLoading: true, errMess: null, campsitesArray: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampsites.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCampsites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.campsitesArray = action.payload;
            })
            .addCase(fetchCampsites.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

export const campsitesReducer = campsitesSlice.reducer;