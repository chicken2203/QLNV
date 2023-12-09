// ** React imports
import React, { useEffect, useState } from 'react';

// ** Third party imports
import { Button, CircularProgress, Grid, Icon, IconButton, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';

// ** Custom components
import DataTable from 'app/component/DataTable';
import DialogDelete from 'app/component/DialogDelete';
import LetterDialog from 'app/component/Letters';
import OverlayCheckPermission from 'app/component/OverlayCheckPermission';
import { STATUS_EMPLOYEE, STATUS_SALARY, STATUS_SALARY_NAME } from 'app/Utils/Constants';

// ** Services Imports
import {
    addIncreaseSalary,
    deleteIncreaseSalary,
    getIncreaseSalaryByEmployee,
    updateIncreaseSalary,
} from 'app/views/PendingRequest/store/salarySlice';

function SalaryIncreaseRequest({ employeeData }) {
    // ** State
    const [salaryId, setSalaryId] = useState();
    const [dialogDelete, setDialogDelete] = useState(false);
    const [showLetter, setShowLetter] = useState(false);
    const [method, setMethod] = useState('view');
    const [selectedRow, setSelectedRow] = useState({});
    const [reloadData, setReloadData] = useState(false);

    // ** Vars
    const dispatch = useDispatch();
    const leaderData = useSelector((state) => state.leaders.leaderList);
    const salaries = useSelector((state) => state?.salaries);
    const salaryData =
        salaries &&
        salaries?.data?.map((item) => ({
            ...item,
            tableData: {
                id: item.id,
            },
        }));

    const schema = Yup.object().shape({
        oldSalary: Yup.number()
            .typeError('Lương cũ phải là số')
            .required('Trường này không được để trống')
            .test('len', 'Nhập tối đa 9 số', (val) => val.toString().length <= 9),
        newSalary: Yup.number()
            .typeError('Lương mới phải là số')
            .required('Trường này không được để trống')
            .test('len', 'Nhập tối đa 9 số', (val) => val.toString().length <= 9)
            .moreThan(Yup.ref('oldSalary'), 'Lương mới phải lớn hơn lương cũ'),
        startDate: Yup.date().required('Trường này bắt buộc'),
        reason: Yup.string()
            .trim()
            .required('Trường này không được để trống')
            .max(900, 'Không được nhập quá 900 ký tự'),
    });

    const defaultValues = {
        oldSalary: '',
        newSalary: '',
        startDate: moment(new Date()).format('YYYY-MM-DD'),
        reason: '',
        note: '',
    };

    const { handleSubmit, formState, reset, setValue, control } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });
    const employeeId = employeeData?.id;
    useEffect(() => {
        dispatch(getIncreaseSalaryByEmployee(employeeId));
    }, [dispatch, employeeId, reloadData]);

    const handleDeleteSalary = async () => {
        await dispatch(deleteIncreaseSalary(salaryId));
        await setDialogDelete(false);
        await setReloadData(!reloadData);
        await reset();
    };

    const handleOpenDialogDelete = (id) => {
        setDialogDelete(true);
        setSalaryId(id);
    };

    const handleViewLetter = (rowData, method) => {
        setShowLetter(true);
        setMethod(method);
        setSelectedRow(rowData);
    };

    const handleCloseDialog = () => {
        setShowLetter(false);
        setSelectedRow({});
    };

    const handleEditRow = (rowData, method) => {
        setSelectedRow(rowData);
        setMethod(method);
        setValue('oldSalary', rowData.oldSalary);
        setValue('newSalary', rowData.newSalary);
        setValue('startDate', moment(rowData.startDate).format('YYYY-MM-DD'));
        setValue('reason', rowData?.reason);
        setValue('note', rowData?.note);
    };

    const onSubmit = async (values) => {
        const data = {
            ...selectedRow,
            ...values,
        };
        if (selectedRow?.id) {
            const res = await dispatch(updateIncreaseSalary(data));
            if (res?.payload?.data && res?.payload?.message === 'SUCCESS') {
                await setSelectedRow(res?.payload?.data);
                await setMethod('sendLeader');
                await setShowLetter(true);
            }
        } else {
            const res = await dispatch(addIncreaseSalary({ id: employeeData.id, data: [values] }));
            if (res?.payload?.data && res?.payload?.message === 'SUCCESS') {
                await setSelectedRow(res?.payload?.data[0]);
                await setMethod('sendLeader');
                await setShowLetter(true);
            }
        }
        reset();
    };

    const handleReset = () => {
        reset();
        setSelectedRow({});
    };

    const columns = [
        {
            title: 'Thao tác',
            field: 'action',
            width: '10%',
            align: 'center',
            render: (rowData) => {
                return (
                    <div className="none_wrap">
                        <IconButton size="small" onClick={() => handleViewLetter(rowData, 'view')}>
                            <Icon color="secondary">visibility</Icon>
                        </IconButton>
                        {rowData?.salaryIncreaseStatus !== STATUS_SALARY.PENDING &&
                            rowData?.salaryIncreaseStatus !== STATUS_SALARY.APPROVED && (
                                <IconButton size="small" onClick={() => handleEditRow(rowData, 'edit')}>
                                    <Icon color="primary">edit</Icon>
                                </IconButton>
                            )}
                        {rowData?.salaryIncreaseStatus !== STATUS_SALARY.ADDITIONAL_REQUESTED &&
                            rowData?.salaryIncreaseStatus !== STATUS_SALARY.PENDING &&
                            rowData?.salaryIncreaseStatus !== STATUS_SALARY.APPROVED &&
                            rowData?.salaryIncreaseStatus !== STATUS_SALARY.REJECT && (
                                <IconButton size="small" onClick={() => handleOpenDialogDelete(rowData?.id)}>
                                    <Icon color="error">delete</Icon>
                                </IconButton>
                            )}
                    </div>
                );
            },
        },
        {
            title: 'ID',
            render: (rowData) => rowData.id + 1,
            width: '10%',
            align: 'center',
        },

        { title: 'Lương cũ', field: 'oldSalary', align: 'center' },
        {
            title: 'Lương mới',
            align: 'center',
            field: 'newSalary',
        },
        {
            title: 'Ngày tăng lương',
            field: 'startDate',
            align: 'center',
            render: (rowData) => moment(rowData?.startDate).format('DD/MM/YYYY'),
        },
        {
            title: 'Người duyệt',
            field: 'leaderId',
            align: 'center',
            render: (rowData) => leaderData.find((value) => value.id === +rowData.leaderId)?.leaderName,
        },
        {
            title: 'Trạng thái',
            field: 'salaryIncreaseStatus',
            align: 'center',
            render: (rowData) => STATUS_SALARY_NAME.find((value) => value.id === +rowData.salaryIncreaseStatus)?.name,
        },
    ];

    return (
        <>
            {salaries.loading ? (
                <div className="circle-loading flex justify-center">
                    <CircularProgress size={64} />
                </div>
            ) : (
                <Grid container className="mt-15 position-relative">
                    <Grid item xs={12} className="position-relative">
                        {[STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_ENDING].includes(+employeeData?.submitProfileStatus) &&
                            !selectedRow.id && (
                                <OverlayCheckPermission>Bạn không có quyền thêm trong form này</OverlayCheckPermission>
                            )}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="oldSalary"
                                        control={control}
                                        defaultValue={defaultValues?.oldSalary}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={
                                                    <span className="font">
                                                        <span style={{ color: 'red' }}> * </span>
                                                        Lương cũ
                                                    </span>
                                                }
                                                variant="outlined"
                                                size="small"
                                                type="number"
                                                fullWidth
                                                error={!!formState.errors.oldSalary}
                                                helperText={formState.errors.oldSalary?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="newSalary"
                                        control={control}
                                        defaultValue={defaultValues?.newSalary}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={
                                                    <span className="font">
                                                        <span style={{ color: 'red' }}> * </span>
                                                        Lương mới
                                                    </span>
                                                }
                                                variant="outlined"
                                                type="number"
                                                size="small"
                                                fullWidth
                                                error={!!formState.errors.newSalary}
                                                helperText={formState.errors.newSalary?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Controller
                                        name="reason"
                                        control={control}
                                        defaultValue={defaultValues?.reason}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={
                                                    <span className="font">
                                                        <span style={{ color: 'red' }}> * </span>
                                                        Lý do tăng lương
                                                    </span>
                                                }
                                                variant="outlined"
                                                size="small"
                                                multiline
                                                fullWidth
                                                error={!!formState.errors.reason}
                                                helperText={formState.errors.reason?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Controller
                                        name="note"
                                        control={control}
                                        defaultValue={defaultValues?.note}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={
                                                    <span className="font">
                                                        <span style={{ color: 'red' }}> * </span>
                                                        Ghi chú
                                                    </span>
                                                }
                                                variant="outlined"
                                                size="small"
                                                multiline
                                                fullWidth
                                                error={!!formState.errors.note}
                                                helperText={formState.errors.note?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Controller
                                        name="startDate"
                                        control={control}
                                        defaultValue={defaultValues?.startDate}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={
                                                    <span className="font">
                                                        <span style={{ color: 'red' }}> * </span>
                                                        Ngày hiệu lực
                                                    </span>
                                                }
                                                type="date"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                error={!!formState.errors.startDate}
                                                helperText={formState.errors.startDate?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button
                                        color="primary"
                                        type="submit"
                                        variant="contained"
                                        disabled={salaries.selectedSalary}
                                        style={{ width: '49%' }}
                                    >
                                        {selectedRow?.id ? 'Cập nhật' : 'Lưu'}
                                    </Button>
                                    <Button
                                        className="btn-cancel w-49"
                                        variant="contained"
                                        onClick={handleReset}
                                        disabled={salaries.selectedSalary}
                                    >
                                        Hoàn tác
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        {salaries.loading ? (
                            <div className="text-center">Loading....</div>
                        ) : (
                            <DataTable columns={columns} data={salaryData} pageSize={3} />
                        )}
                    </Grid>
                </Grid>
            )}
            {dialogDelete && (
                <DialogDelete
                    show={dialogDelete}
                    close={() => setDialogDelete(false)}
                    confirmDelete={handleDeleteSalary}
                />
            )}
            {showLetter && (
                <LetterDialog
                    show={showLetter}
                    close={handleCloseDialog}
                    selectedData={selectedRow}
                    type="salary"
                    triggerReloadData={() => setReloadData(!reloadData)}
                    method={method}
                />
            )}
        </>
    );
}

export default SalaryIncreaseRequest;
