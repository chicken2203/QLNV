// ** Redux Imports
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

export const getListPromotionByLeader = createAsyncThunk('appPromotions/getListPromotionByLeader', async (id) => {
    const response = await axios.get(API_PATH + `/process/current-leader`);
    return response.data;
});

export const getPromotionByEmployee = createAsyncThunk('appPromotions/getPromotionByEmployee', async (id) => {
    const response = await axios.get(API_PATH + `/process?employeeId=${id}`);
    return {
        data: response.data.data,
        total: response.data.data.length,
    };
});

export const getPromotionById = createAsyncThunk('appPromotions/getPromotionById', async (id) => {
    const response = await axios.get(API_PATH + `/process/${id}`);
    return response.data;
});

export const addPromotion = createAsyncThunk('appPromotions/addPromotion', async (payload) => {
    const response = await axios.post(API_PATH + `/process?employeeId=${payload.id}`, payload.data);
    return response.data;
});

export const updatePromotion = createAsyncThunk('appPromotions/updatePromotion', async (data) => {
    const response = await axios.put(API_PATH + `/process/${data?.id}`, data);
    return response.data;
});

export const deletePromotion = createAsyncThunk('appPromotions/deletePromotion', async (id) => {
    const response = await axios.delete(API_PATH + `/process/${id}`);
    return response.data;
});

export const appPromotionsSlice = createSlice({
    name: 'appPromotions',
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
            // get all by leader
            .addCase(getListPromotionByLeader.pending, (state, action) => {
                state.data = [];
                state.total = 0;
                state.loading = true;
            })
            .addCase(getListPromotionByLeader.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.params = action.payload.params;
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(getListPromotionByLeader.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            // get all by employee
            .addCase(getPromotionByEmployee.pending, (state, action) => {
                state.data = [];
                state.total = 0;
                state.loading = true;
            })
            .addCase(getPromotionByEmployee.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.params = action.payload.params;
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(getPromotionByEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            // get item
            .addCase(getPromotionById.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(getPromotionById.fulfilled, (state, action) => {
                const data = action?.payload?.data;
                state.selected = data;
                state.selectedLoading = false;
            })
            .addCase(getPromotionById.rejected, (state, action) => {
                state.selectedLoading = false;
                toast.error(action.error.message);
            })

            // add
            .addCase(addPromotion.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(addPromotion.fulfilled, (state, action) => {
                const newData = action?.payload?.data;
                if (newData && state.data) {
                    state.data.unshift(newData[0]);
                }
                state.loading = false;
                toast.success('Thêm yêu cầu thăng chức thành công');
            })
            .addCase(addPromotion.rejected, (state, action) => {
                state.selectedLoading = false;
                toast.error(action.error.message);
            })

            // update
            .addCase(updatePromotion.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(updatePromotion.fulfilled, (state, action) => {
                const updatedData = action?.payload?.data;
                const index = state.data.findIndex((item) => item?.id === updatedData?.id);
                state.data[index] = updatedData;
                state.selected = updatedData;
                state.selectedLoading = false;
                toast.success('Cập nhật yêu cầu thăng chức thành công');
            })
            .addCase(updatePromotion.rejected, (state, action) => {
                state.selectedLoading = false;
                toast.error(action.error.message);
            })

            // delete
            .addCase(deletePromotion.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(deletePromotion.fulfilled, (state, action) => {
                state.selected = {};
                state.selectedLoading = false;
                toast.success('Xóa yêu cầu thăng chức thành công');
            })
            .addCase(deletePromotion.rejected, (state, action) => {
                state.selectedLoading = false;
                toast.error(action.error.message);
            });
    },
});
export default appPromotionsSlice.reducer;
