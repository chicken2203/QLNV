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

export const getListIncreaseSalaryByLeader = createAsyncThunk(
    'appSalaries/getListIncreaseSalaryByLeader',
    async (id) => {
        const response = await axios.get(API_PATH + `/salary-increase/current-leader`);
        return response.data;
    },
);

export const getIncreaseSalaryByEmployee = createAsyncThunk('appSalaries/getIncreaseSalaryByEmployee', async (id) => {
    const response = await axios.get(API_PATH + `/salary-increase?employeeId=${id}`);
    return {
        data: response.data.data,
        total: response.data.data.length,
    };
});

export const getSalaryById = createAsyncThunk('appSalaries/getSalaryById', async (id) => {
    const response = await axios.get(API_PATH + `/salary-increase/${id}`);
    return response.data;
});

export const addIncreaseSalary = createAsyncThunk('appSalaries/addIncreaseSalary', async (payload) => {
    const response = await axios.post(API_PATH + `/salary-increase?employeeId=${payload.id}`, payload.data);
    return response.data;
});

export const updateIncreaseSalary = createAsyncThunk('appSalaries/updateIncreaseSalary', async (data) => {
    const response = await axios.put(API_PATH + `/salary-increase/${data?.id}`, data);
    return response.data;
});

export const deleteIncreaseSalary = createAsyncThunk('appSalaries/deleteIncreaseSalary', async (id) => {
    const response = await axios.delete(API_PATH + `/salary-increase/${id}`);
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
            // get List Increase Salary By Leader
            .addCase(getListIncreaseSalaryByLeader.pending, (state, action) => {
                state.data = [];
                state.total = 0;
                state.loading = true;
            })
            .addCase(getListIncreaseSalaryByLeader.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.params = action.payload.params;
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(getListIncreaseSalaryByLeader.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            // get Increase Salary By Employee
            .addCase(getIncreaseSalaryByEmployee.pending, (state, action) => {
                state.data = [];
                state.total = 0;
                state.loading = true;
            })
            .addCase(getIncreaseSalaryByEmployee.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.params = action.payload.params;
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(getIncreaseSalaryByEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            // get item
            .addCase(getSalaryById.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(getSalaryById.fulfilled, (state, action) => {
                const data = action?.payload?.data;
                state.selected = data;
                state.selectedLoading = false;
            })
            .addCase(getSalaryById.rejected, (state, action) => {
                state.selectedLoading = false;
                toast.error(action.error.message);
            })

            // add
            .addCase(addIncreaseSalary.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(addIncreaseSalary.fulfilled, (state, action) => {
                const newData = action?.payload?.data;
                if (newData && state.data) {
                    state.data.unshift(newData[0]);
                }
                state.loading = false;
                toast.success('Thêm yêu cầu tăng lương thành công');
            })
            .addCase(addIncreaseSalary.rejected, (state, action) => {
                state.selectedLoading = false;
                toast.error(action.error.message);
            })

            // update
            .addCase(updateIncreaseSalary.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(updateIncreaseSalary.fulfilled, (state, action) => {
                const updatedData = action?.payload?.data;
                const index = state.data.findIndex((item) => item.id === updatedData.id);
                if (index !== -1) {
                    state.data[index] = updatedData;
                }
                state.selected = updatedData;
                state.selectedLoading = false;
                toast.success('Cập nhật yêu cầu tăng lương thành công');
            })
            .addCase(updateIncreaseSalary.rejected, (state, action) => {
                state.selectedLoading = false;
                toast.error(action.error.message);
            })

            // delete
            .addCase(deleteIncreaseSalary.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(deleteIncreaseSalary.fulfilled, (state, action) => {
                state.selected = {};
                state.selectedLoading = false;
                toast.success('Xóa yêu cầu tăng lương thành công');
            })
            .addCase(deleteIncreaseSalary.rejected, (state, action) => {
                state.selectedLoading = false;
                toast.error(action.error.message);
            });
    },
});
export default appSalariesSlice.reducer;
