import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ConstantList from 'app/appConfig';
import { RESPONSE_STATUS } from '../../../Utils/Constants';
import { toast } from 'react-toastify';
const API_PATH = ConstantList.API_ENPOINT;
toast.configure({
    autoClose: 1500,
    draggable: false,
    limit: 3,
});

export const fetchExperienceOfEmployee = createAsyncThunk(
    'experiences/fetchExperienceOfEmployee',
    async (employeeId) => {
        const response = await axios.get(API_PATH + `/experience?employeeId=${employeeId}`);
        return response?.data;
    },
);

export const getExperientByEmployee = createAsyncThunk('experiences/getExperientByEmployee', async (id) => {
    const response = await axios.get(API_PATH + `/experience?employeeId=${id}`);
    return {
        data: response.data.data,
        total: response.data.data.length,
    };
});

export const createExperienceOfEmployee = createAsyncThunk(
    'experiences/createExperienceOfEmployee',
    async (experience) => {
        const response = await axios.post(API_PATH + `/experience?employeeId=${experience?.employeeId}`, [experience]);
        return response?.data;
    },
);
export const editExperienceOfEmployee = createAsyncThunk('experiences/editExperienceOfEmployee', async (experience) => {
    const response = await axios.put(API_PATH + `/experience/${experience?.id}`, experience);
    return response?.data;
});
export const deleteExperienceOfEmployee = createAsyncThunk(
    'experiences/deleteExperienceOfEmployee',
    async (experience) => {
        const response = await axios.delete(API_PATH + `/experience/${experience?.id}`);
        response.data.data = experience;
        return response?.data;
    },
);

const initialState = { loading: false, employeeExps: [] };

const experienceSlice = createSlice({
    name: 'experiences',
    initialState,
    reducers: {
        resetExperienceOfEmployee(state) {
            state.employeeExps = [];
        },
    },
    extraReducers: (builder) => {
        //get all employee's certificate
        builder
            .addCase(fetchExperienceOfEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchExperienceOfEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employeeExps = action?.payload?.data;
            })
            .addCase(fetchExperienceOfEmployee.rejected, (state, action) => {
                state.loading = false;
            })

            // get all by employee
            .addCase(getExperientByEmployee.pending, (state, action) => {
                state.data = [];
                state.total = 0;
                state.loading = true;
            })
            .addCase(getExperientByEmployee.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.params = action.payload.params;
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(getExperientByEmployee.rejected, (state, action) => {
                state.loading = false;
            })

            // create employee's Experience
            .addCase(createExperienceOfEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createExperienceOfEmployee.fulfilled, (state, action) => {
                if (action?.payload?.code === RESPONSE_STATUS.success) {
                    toast.success('Thêm kinh nghiệm làm việc thành công');
                    const newData = action?.payload?.data[0];
                    state.employeeExps.unshift(newData);
                } else {
                    toast.warning(action?.payload?.message);
                }
                state.loading = false;
            })
            .addCase(createExperienceOfEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            //edit employee's Experience
            .addCase(editExperienceOfEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(editExperienceOfEmployee.fulfilled, (state, action) => {
                if (action?.payload?.code === RESPONSE_STATUS.success) {
                    toast.success('Sửa kinh nghiệm làm việc thành công');
                    state.employeeExps = state?.employeeExps?.map((value) => {
                        if (value.id === action.payload?.data?.id) {
                            return { ...value, ...action.payload?.data };
                        } else return value;
                    });
                } else {
                    toast.warning(action?.payload?.message);
                }
                state.loading = false;
            })
            .addCase(editExperienceOfEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            //delete employee's Experience
            .addCase(deleteExperienceOfEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteExperienceOfEmployee.fulfilled, (state, action) => {
                if (action?.payload?.code === RESPONSE_STATUS.success) {
                    toast.success('Xóa kinh nghiệm thành công');
                    state.employeeExps = state?.employeeExps?.filter((value) => value.id !== action?.payload?.data?.id);
                } else toast.warning(action?.payload?.message);
                state.loading = false;
            })
            .addCase(deleteExperienceOfEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            });
    },
});
export const { resetExperienceOfEmployee } = experienceSlice.actions;
export default experienceSlice.reducer;
