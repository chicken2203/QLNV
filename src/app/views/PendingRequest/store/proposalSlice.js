import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ConstantList from 'app/appConfig';
import { toast } from 'react-toastify';
const API_PATH = ConstantList.API_ENPOINT;

toast.configure({
    autoClose: 1500,
    draggable: false,
    limit: 3,
});

export const getListProposalByLeader = createAsyncThunk('appSalaries/getListProposalByLeader', async (id) => {
    const response = await axios.get(API_PATH + `/proposal/current-leader`);
    return response.data;
});

export const getProposalByEmployee = createAsyncThunk('appSalaries/getProposalByEmployee', async (id) => {
    const response = await axios.get(API_PATH + `/proposal?employeeId=${id}`);
    return {
        data: response.data.data,
        total: response.data.data.length,
    };
});

export const getProposalById = createAsyncThunk('appSalaries/getProposalById', async (id) => {
    const response = await axios.get(API_PATH + `/proposal/${id}`);
    return response.data;
});

export const addProposal = createAsyncThunk('appSalaries/addProposal', async (payload) => {
    const response = await axios.post(API_PATH + `/proposal?employeeId=${payload.id}`, payload.data);
    return response.data;
});

export const updateProposal = createAsyncThunk('appSalaries/updateProposal', async (data) => {
    const response = await axios.put(API_PATH + `/proposal/${data?.id}`, data);
    return response.data;
});

export const deleteProposal = createAsyncThunk('appSalaries/deleteProposal', async (id) => {
    const response = await axios.delete(API_PATH + `/proposal/${id}`);
    return response.data;
});

export const appSalariesSlice = createSlice({
    name: 'appSalaries',
    initialState: {
        data: [],
        loading: false,
        total: 0,
        params: {},
        selected: null,
        selectedLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get List Proposal By Leader
            .addCase(getListProposalByLeader.pending, (state, action) => {
                state.data = [];
                state.total = 0;
                state.loading = true;
            })
            .addCase(getListProposalByLeader.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.params = action.payload.params;
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(getListProposalByLeader.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            // get Proposal By Employee
            .addCase(getProposalByEmployee.pending, (state, action) => {
                state.data = [];
                state.total = 0;
                state.loading = true;
            })
            .addCase(getProposalByEmployee.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.params = action.payload.params;
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(getProposalByEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            // get item
            .addCase(getProposalById.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(getProposalById.fulfilled, (state, action) => {
                const data = action?.payload?.data;
                state.selected = data;
                state.selectedLoading = false;
            })
            .addCase(getProposalById.rejected, (state, action) => {
                state.selectedLoading = false;
                toast.error(action.error.message);
            })

            // add
            .addCase(addProposal.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(addProposal.fulfilled, (state, action) => {
                const newData = action?.payload?.data;
                if (newData && state.data) {
                    state.data.unshift(newData[0]);
                }
                state.loading = false;
                toast.success('Thêm yêu cầu tham mưu thành công');
            })
            .addCase(addProposal.rejected, (state, action) => {
                state.selectedLoading = false;
                toast.error(action.error.message);
            })

            // update
            .addCase(updateProposal.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(updateProposal.fulfilled, (state, action) => {
                const updatedData = action?.payload?.data;
                const index = state.data.findIndex((item) => item.id === updatedData.id);
                if (index !== -1) {
                    state.data[index] = updatedData;
                }
                state.selected = updatedData;
                state.selectedLoading = false;
                toast.success('Cập nhật yêu cầu tham mưu thành công');
            })
            .addCase(updateProposal.rejected, (state, action) => {
                state.selectedLoading = false;
                toast.error(action.error.message);
            })

            // delete
            .addCase(deleteProposal.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(deleteProposal.fulfilled, (state, action) => {
                state.selected = {};
                state.selectedLoading = false;
                toast.success('Xóa yêu cầu tham mưu thành công');
            })
            .addCase(deleteProposal.rejected, (state, action) => {
                state.selectedLoading = false;
                toast.error(action.error.message);
            });
    },
});
export default appSalariesSlice.reducer;
