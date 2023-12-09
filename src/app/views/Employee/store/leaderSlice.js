import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ConstantList from 'app/appConfig';
const API_PATH = ConstantList.API_ENPOINT + '/leader';

export const getAllLeader = createAsyncThunk('leaders/getAllLeader', async () => {
    const response = await axios.get(API_PATH);
    return response?.data;
});

export const getLeaderById = createAsyncThunk('leaders/getLeaderById', async (id) => {
    const response = await axios.get(API_PATH + `/${id}`);
    return response;
});

const leadersSlice = createSlice({
    name: 'leaders',
    initialState: { loading: false, leaderList: [], selectedLeader: {}, selectedLoading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get all employee's certificate
            .addCase(getAllLeader.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllLeader.fulfilled, (state, action) => {
                state.loading = false;
                state.leaderList = action?.payload?.data;
            })
            .addCase(getAllLeader.rejected, (state, action) => {
                state.loading = false;
            })

            // get single employee
            .addCase(getLeaderById.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(getLeaderById.fulfilled, (state, action) => {
                const data = action?.payload?.data?.data;
                state.selectedLeader = data;
                state.selectedLoading = false;
            })
            .addCase(getLeaderById.rejected, (state, action) => {
                state.selectedLoading = false;
            });
    },
});

export default leadersSlice.reducer;
