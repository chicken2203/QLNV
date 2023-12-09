import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ConstantList from 'app/appConfig';
import { toast } from 'react-toastify';
import { RESPONSE_STATUS } from '../../../Utils/Constants';

const API_ENPOINT = ConstantList.API_ENPOINT;
const API_PATH = ConstantList.API_ENPOINT + '/employee/';

toast.configure({
    autoClose: 1500,
    draggable: false,
    limit: 3,
});

export const fetchAllEmployee = createAsyncThunk('employee/fetchAllEmployee', async (searchObj) => {
    const response = await axios.get(
        API_PATH +
            `search?pageIndex=${searchObj.pageIndex}&pageSize=${searchObj.pageSize}&keyword=${searchObj.keyword}&listStatus=${searchObj.listStatus}`,
    );
    return response.data.data;
});

export const getEmployeeById = createAsyncThunk('employee/getEmployeeById', async (id) => {
    const response = await axios.get(API_PATH + `${id}`);
    return response;
});

export const uploadImageAvatar = createAsyncThunk('employee/uploadImageAvatar', async (file) => {
    const response = await axios.post(API_PATH + 'upload-image', file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
});

export const createEmployee = createAsyncThunk('employee/createEmployee', async (newEmployee, { dispatch }) => {
    if (!newEmployee.certificatesDto) {
        newEmployee.certificatesDto = [];
    }
    if (!newEmployee.employeeFamilyDtos) {
        newEmployee.employeeFamilyDtos = [];
    }
    if (newEmployee.avatar) {
        const formData = new FormData();
        formData.append('file', newEmployee?.avatar);
        const resAvatar = await axios.post(API_PATH + 'upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const urlImage = API_ENPOINT + '/public/image/' + resAvatar?.data?.name;
        newEmployee.image = urlImage;
    }
    const response = await axios.post(API_PATH, newEmployee);

    return response?.data;
});

export const updateEmployee = createAsyncThunk('employee/updateEmployee', async (updateEmployee, { dispatch }) => {
    if (updateEmployee.avatar) {
        const formData = new FormData();
        formData.append('file', updateEmployee?.avatar);
        const resAvatar = await axios.post(API_PATH + 'upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const urlImage = API_ENPOINT + '/public/image/' + resAvatar?.data?.name;
        updateEmployee.image = urlImage;
    }

    const response = await axios.put(API_PATH + updateEmployee.id, updateEmployee);
    return response?.data;
});

export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (delEmployee) => {
    const response = await axios.delete(API_PATH + delEmployee.id);
    response.data.data = delEmployee;
    return response?.data;
});

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        loading: false,
        employeeData: [],
        employeeRegister: {},
        selectedEmployee: {},
        selectedLoading: false,
    },
    reducers: {
        resetEmployeeRegister(state) {
            state.employeeRegister = {};
        },
        resetselectedEmployee(state) {
            state.selectedEmployee = {};
        },
    },
    extraReducers: (builder) => {
        //get all employees
        builder
            .addCase(fetchAllEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAllEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employeeData = action.payload;
            })
            .addCase(fetchAllEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            // get single employee
            .addCase(getEmployeeById.pending, (state, action) => {
                state.selectedLoading = true;
            })
            .addCase(getEmployeeById.fulfilled, (state, action) => {
                const data = action?.payload?.data?.data;
                state.selectedEmployee = data;
                state.employeeRegister = data;
                state.selectedLoading = false;
            })
            .addCase(getEmployeeById.rejected, (state, action) => {
                state.selectedLoading = false;
            })

            //Create a new employee
            .addCase(createEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                if (action?.payload?.code === RESPONSE_STATUS.success) {
                    toast.success('Tạo mới nhân viên thành công');
                    state.employeeData.unshift(action?.payload?.data);
                    state.employeeRegister = action?.payload?.data;
                } else toast.warning(action?.payload?.message);
                state.loading = false;
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            //Edit employee
            .addCase(updateEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                if (action?.payload?.code === RESPONSE_STATUS.success) {
                    toast.success('Sửa nhân viên thành công');
                    state.employeeData = state?.employeeData?.map((value) => {
                        if (value.id === action.payload?.data?.id) {
                            return { ...value, ...action?.payload?.data };
                        } else return value;
                    });
                    state.employeeRegister = action?.payload?.data;
                } else toast.warning(action?.payload?.message);
                state.loading = false;
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error(action.error.message);
            })

            //Delete a employee
            .addCase(deleteEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false;
                if (action?.payload?.code === RESPONSE_STATUS.success) {
                    toast.success('Xóa nhân viên thành công');
                    state.employeeData = state?.employeeData?.filter((value) => value.id !== action?.payload?.data?.id);
                } else toast.warning(action?.payload?.message);
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            });
    },
});

export const { resetEmployeeRegister, resetselectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
