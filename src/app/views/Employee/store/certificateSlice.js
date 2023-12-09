import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ConstantList from 'app/appConfig';
import { toast } from 'react-toastify';
import { RESPONSE_STATUS } from '../../../Utils/Constants';
const API_PATH = ConstantList.API_ENPOINT;

toast.configure({
    autoClose: 1500,
    draggable: false,
    limit: 3,
});

export const fetchCertificateOfEmployee = createAsyncThunk(
    'certificates/fetchCertificateOfEmployee',
    async (employeeId) => {
        const response = await axios.get(API_PATH + `/certificate?employeeId=${employeeId}`);
        return response?.data;
    },
);
export const createCertificateOfEmployee = createAsyncThunk(
    'certificates/createCertificateOfEmployee',
    async (employeeInfo) => {
        const response = await axios.post(
            API_PATH + `/certificate?employeeId=${employeeInfo?.id}`,
            employeeInfo?.certificatesDto,
        );
        return response?.data;
    },
);

export const saveCertificateOfEmployee = createAsyncThunk(
    'certificates/saveCertificateOfEmployee',
    async (employeeInfo, { dispatch }) => {
        const resCertificates = await axios.get(API_PATH + `/certificate?employeeId=${employeeInfo.id}`);
        const certificates = resCertificates?.data?.data;
        const newCertificates = employeeInfo?.certificatesDto?.filter((value) => !value.id);
        const editCertificates = employeeInfo?.certificatesDto?.filter((value) => value.status);

        const deleteCertificates = certificates?.filter(
            (value) => !employeeInfo?.certificatesDto?.some((item) => item.id === value.id),
        );
        newCertificates.length > 0 && (await newCertificates.forEach((item) => dispatch(createNewCertificate(item))));
        editCertificates.length > 0 &&
            (await editCertificates.forEach((item) => dispatch(editCertificateOfEmployee(item))));
        deleteCertificates.length > 0 &&
            (await deleteCertificates.forEach((item) => dispatch(deleteCertificateOfEmployee(item))));
    },
);

export const createNewCertificate = createAsyncThunk('certificates/createNewCertificate', async (certificate) => {
    const response = await axios.post(API_PATH + `/certificate?employeeId=${certificate?.employeeId}`, [certificate]);
    return response?.data;
});

export const editCertificateOfEmployee = createAsyncThunk(
    'certificates/editCertificateOfEmployee',
    async (certificate) => {
        const response = await axios.put(API_PATH + `/certificate/${certificate?.id}`, certificate);
        return response?.data;
    },
);
export const deleteCertificateOfEmployee = createAsyncThunk(
    'certificates/deleteCertificateOfEmployee',
    async (certificate) => {
        const response = await axios.delete(API_PATH + `/certificate/${certificate?.id}`);
        response.data.data = certificate;
        return response?.data;
    },
);

const initialState = { loading: false, employeeCertificates: [] };

const certificateSlice = createSlice({
    name: 'certificates',
    initialState,
    reducers: {
        resetCertificateOfEmployee(state) {
            state.employeeCertificates = [];
        },
    },
    extraReducers: (builder) => {
        builder
            //get all employee's certificate
            .addCase(fetchCertificateOfEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchCertificateOfEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employeeCertificates = action?.payload?.data;
            })
            .addCase(fetchCertificateOfEmployee.rejected, (state, action) => {
                toast.error(action.error.message);
                state.loading = false;
            })

            //create employee's certificate
            .addCase(createNewCertificate.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createNewCertificate.fulfilled, (state, action) => {
                if (action?.payload?.code === RESPONSE_STATUS.success) {
                    toast.success('Tạo mới chứng chỉ thành công');
                    const newData = action?.payload?.data[0];
                    state.employeeCertificates.unshift(newData);
                } else toast.warning(action?.payload?.message);
                state.loading = false;
            })
            .addCase(createNewCertificate.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            //edit employee's certificate
            .addCase(editCertificateOfEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(editCertificateOfEmployee.fulfilled, (state, action) => {
                if (action?.payload?.code === RESPONSE_STATUS.success) {
                    toast.success('Sửa chứng chỉ thành công');
                    const newData = action?.payload?.data;
                    state.employeeCertificates = state?.employeeCertificates?.map((value) =>
                        value.id === newData?.id ? { ...value, ...newData } : value,
                    );
                } else toast.warning(action?.payload?.message);
                state.loading = false;
            })
            .addCase(editCertificateOfEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })

            //delete employee's certificate
            .addCase(deleteCertificateOfEmployee.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteCertificateOfEmployee.fulfilled, (state, action) => {
                if (action?.payload?.code === RESPONSE_STATUS.success) {
                    toast.success('xóa chứng chỉ thành công');
                    state.employeeCertificates = state?.employeeCertificates?.filter(
                        (value) => value.id !== action?.payload?.data?.id,
                    );
                } else toast.warning(action?.payload?.message);
                state.loading = false;
            })
            .addCase(deleteCertificateOfEmployee.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            });
    },
});
export const { resetCertificateOfEmployee } = certificateSlice.actions;
export default certificateSlice.reducer;
