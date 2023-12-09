import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RESPONSE_STATUS } from '../../../Utils/Constants';
import ConstantList from 'app/appConfig';
const API_PATH = ConstantList.API_ENPOINT;

toast.configure({
    autoClose: 1500,
    draggable: false,
    limit: 3,
});

export const fetchRelationOfEmployee = createAsyncThunk('relations/fetchRelationOfEmployee', async (employeeId) => {
    const response = await axios.get(API_PATH + `/employee-family?employeeId=${employeeId}`);
    return response?.data;
});

export const createRelationOfEmployee = createAsyncThunk('relations/createRelationOfEmployee', async (employeeInfo) => {
    const response = await axios.post(
        API_PATH + `/employee-family?employeeId=${employeeInfo?.id}`,
        employeeInfo?.employeeFamilyDtos,
    );
    return response?.data;
});

export const saveRelationOfEmployee = createAsyncThunk(
    'relations/saveRelationOfEmployee',
    async (employeeInfo, { dispatch }) => {
        const resRelation = await axios.get(API_PATH + `/employee-family?employeeId=${employeeInfo.id}`);
        const relation = resRelation?.data?.data;
        const newRelation = employeeInfo?.employeeFamilyDtos?.filter((value) => !value.id);
        const editRelation = employeeInfo?.employeeFamilyDtos?.filter((value) => value.status);

        const deleteRelation = relation?.filter(
            (value) => !employeeInfo?.employeeFamilyDtos?.some((item) => item.id === value.id),
        );
        newRelation.length > 0 && (await newRelation.forEach((item) => dispatch(creatNewRelation(item))));
        editRelation.length > 0 && (await editRelation.forEach((item) => dispatch(editRelationOfEmployee(item))));
        deleteRelation.length > 0 && (await deleteRelation.forEach((item) => dispatch(deleteRelationOfEmployee(item))));
    },
);

export const creatNewRelation = createAsyncThunk('relations/creatNewRelation', async (relation) => {
    const response = await axios.post(API_PATH + `/employee-family?employeeId=${relation?.employeeId}`, [relation]);
    return response?.data;
});

export const editRelationOfEmployee = createAsyncThunk('relations/editRelationOfEmployee', async (relation) => {
    const response = await axios.put(API_PATH + `/employee-family/${relation?.id}`, relation);
    return response?.data;
});

export const deleteRelationOfEmployee = createAsyncThunk('relations/deleteRelationOfEmployee', async (relation) => {
    const response = await axios.delete(API_PATH + `/employee-family/${relation?.id}`, relation);
    response.data.data = relation;
    return response?.data;
});

const initialState = { loading: false, employeeRelations: [] };

const certificateSlice = createSlice({
    name: 'relations',
    initialState,
    reducers: {
        resetRelationOfEmployee(state) {
            state.employeeRelations = [];
        },
    },
    extraReducers: (builder) => {
        builder
            //get all employee's certificate
            .addCase(fetchRelationOfEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchRelationOfEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employeeRelations = action?.payload?.data;
            })
            .addCase(fetchRelationOfEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            //create employee's relation
            .addCase(createRelationOfEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createRelationOfEmployee.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createRelationOfEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            //create new realation
            .addCase(creatNewRelation.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(creatNewRelation.fulfilled, (state, action) => {
                if (action?.payload?.code === RESPONSE_STATUS.success) {
                    toast.success('Tạo mới mối QH gia đình thành công');
                    const newData = action?.payload?.data[0];
                    state.employeeRelations.unshift(newData);
                } else toast.warning(action?.payload?.message);
                state.loading = false;
            })
            .addCase(creatNewRelation.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            //edit realation
            .addCase(editRelationOfEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(editRelationOfEmployee.fulfilled, (state, action) => {
                if (action?.payload?.code === RESPONSE_STATUS.success) {
                    toast.success('Sửa mối QH gia đình thành công');
                    state.employeeRelations = state?.employeeRelations?.map((value) =>
                        value.id === action?.payload?.data?.id ? { ...value, ...action?.payload?.data } : value,
                    );
                } else toast.warning(action?.payload?.message);
                state.loading = false;
            })
            .addCase(editRelationOfEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            //delete realation
            .addCase(deleteRelationOfEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteRelationOfEmployee.fulfilled, (state, action) => {
                if (action?.payload?.code === RESPONSE_STATUS.success) {
                    toast.success('xóa mối QH gia đình thành công');
                    state.employeeRelations = state?.employeeRelations?.filter(
                        (value) => value.id !== action?.payload?.data?.id,
                    );
                } else toast.warning(action?.payload?.message);
                state.loading = false;
            })
            .addCase(deleteRelationOfEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            });
    },
});
export const { resetRelationOfEmployee } = certificateSlice.actions;
export default certificateSlice.reducer;
