// ** React imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Third party imports
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Button, CircularProgress, Grid, Icon, IconButton, MenuItem, TextField } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

// ** Custom components
import DataTable from 'app/component/DataTable';
import DialogDelete from 'app/component/DialogDelete';
import LetterDialog from 'app/component/Letters';
import OverlayCheckPermission from 'app/component/OverlayCheckPermission';
import { LIST_POSITION, STATUS_EMPLOYEE, STATUS_PROMOTE, STATUS_PROMOTE_NAME } from 'app/Utils/Constants';

// ** Services Imports
import {
    addPromotion,
    deletePromotion,
    getPromotionByEmployee,
    updatePromotion,
} from 'app/views/PendingRequest/store/promotionSlice';

function SalaryIncreaseRequest({ employeeData }) {
    // ** State
    const [promotionId, setPromotionId] = useState();
    const [dialogDelete, setDialogDelete] = useState(false);
    const [showLetter, setShowLetter] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [method, setMethod] = useState('view');
    const [reloadData, setReloadData] = useState(false);

    // ** Vars
    const dispatch = useDispatch();
    const leaderData = useSelector((state) => state.leaders.leaderList);
    const promotions = useSelector((state) => state.promotions);
    const promotionData = promotions?.data?.map((data) => ({
        ...data,
        tableData: {
            id: data?.id,
        },
    }));

    const defaultValues = {
        promotionDay: moment(new Date()).format('YYYY-MM-DD'),
        newPosition: '',
        note: '',
    };

    const validationSchema = Yup.object().shape({
        promotionDay: Yup.date().required('Vui lòng chọn ngày thăng chức.'),
        newPosition: Yup.string().required('Vui lòng chọn vị trí mới.'),
    });

    const { control, handleSubmit, setValue, formState, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultValues,
    });

    const employeeId = employeeData?.id;
    useEffect(() => {
        dispatch(getPromotionByEmployee(employeeId));
    }, [dispatch, employeeId, reloadData]);

    const handleOpenDialogDelete = (id) => {
        setDialogDelete(true);
        setPromotionId(id);
    };

    const handleDeletePromotion = async () => {
        await dispatch(deletePromotion(promotionId));
        await setDialogDelete(false);
        await setReloadData(!reloadData);
        await reset;
    };

    const handleViewLetter = (rowData) => {
        setShowLetter(true);
        setMethod('view');
        setSelectedRow(rowData);
    };

    const handleEditRow = (rowData) => {
        setSelectedRow(rowData);
        setMethod('edit');
        setValue('promotionDay', moment(rowData?.promotionDay).format('YYYY-MM-DD'));
        setValue('newPosition', rowData?.newPosition);
        setValue('note', rowData?.note);
    };

    const onSubmit = async (values) => {
        const newData = {
            ...selectedRow,
            ...values,
        };
        if (selectedRow?.id) {
            const res = await dispatch(updatePromotion(newData));
            if (res?.payload?.data && res?.payload?.message === 'SUCCESS') {
                await setSelectedRow(res?.payload?.data);
                await setMethod('sendLeader');
                await setShowLetter(true);
            }
        } else {
            const res = await dispatch(
                addPromotion({
                    id: employeeData?.id,
                    data: [values],
                }),
            );
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
                        <IconButton size="small" onClick={() => handleViewLetter(rowData)}>
                            <Icon color="secondary">visibility</Icon>
                        </IconButton>
                        {+rowData?.processStatus !== STATUS_PROMOTE.PENDING &&
                            +rowData?.processStatus !== STATUS_PROMOTE.APPROVED &&
                            +rowData?.processStatus !== STATUS_PROMOTE.REJECT && (
                                <IconButton size="small" onClick={() => handleEditRow(rowData)}>
                                    <Icon color="primary">edit</Icon>
                                </IconButton>
                            )}
                        {+rowData?.processStatus === STATUS_PROMOTE.ADD_NEW && (
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
            align: 'center',
            render: (rowData) => rowData.id,
            width: '10%',
        },
        {
            title: 'Vị trí mới',
            field: 'newPosition',
            align: 'center',
            render: (rowData) => {
                const position = LIST_POSITION.find((item) => item.id === rowData.newPosition);
                return position ? position.name : 'Không xác định';
            },
        },
        {
            title: 'Ngày thăng chức',
            field: 'promotionDay',
            align: 'center',
            render: (rowData) => moment(rowData?.promotionDay).format('DD/MM/YYYY'),
        },
        {
            title: 'Người duyệt',
            field: 'leaderId',
            align: 'center',
            render: (rowData) => leaderData.find((value) => value.id === +rowData.leaderId)?.leaderName,
        },
        {
            title: 'Trạng thái',
            field: 'processStatus',
            align: 'center',
            render: (rowData) => STATUS_PROMOTE_NAME.find((value) => value.id === +rowData.processStatus)?.name,
        },
    ];

    return (
        <>
            {promotions.loading ? (
                <div className="circle-loading flex justify-center">
                    <CircularProgress size={64} />
                </div>
            ) : (
                <Grid container className="mt-15 ">
                    <Grid item xs={12} className="position-relative">
                        {[STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_ENDING].includes(+employeeData?.submitProfileStatus) &&
                            !selectedRow.id && (
                                <OverlayCheckPermission>Bạn không có quyền thêm trong form này</OverlayCheckPermission>
                            )}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="newPosition"
                                        control={control}
                                        defaultValue={defaultValues?.newPosition}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={
                                                    <span className="font">
                                                        <span style={{ color: 'red' }}> * </span>
                                                        Vị trí mới
                                                    </span>
                                                }
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                select
                                                error={!!formState.errors.newPosition}
                                                helperText={formState.errors.newPosition?.message}
                                            >
                                                {LIST_POSITION?.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="note"
                                        control={control}
                                        defaultValue={defaultValues?.note}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                size="small"
                                                label={<span className="font">Ghi chú</span>}
                                                type="text"
                                                name="note"
                                                error={!!formState.errors.note}
                                                helperText={formState.errors.note?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Controller
                                        name="promotionDay"
                                        control={control}
                                        defaultValue={defaultValues.promotionDay}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={
                                                    <span className="font">
                                                        <span style={{ color: 'red' }}> * </span>
                                                        Ngày thăng chức
                                                    </span>
                                                }
                                                type="date"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                error={!!formState.errors.promotionDay}
                                                helperText={formState.errors.promotionDay?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button
                                        className="w-49"
                                        color="primary"
                                        type="submit"
                                        variant="contained"
                                        disabled={promotions.loading}
                                    >
                                        {selectedRow?.id ? 'Cập nhật' : 'Lưu'}
                                    </Button>
                                    <Button
                                        className="btn-cancel w-49"
                                        variant="contained"
                                        onClick={handleReset}
                                        disabled={promotions.loading}
                                    >
                                        Hoàn tác
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        {promotions.loading ? (
                            <div className="text-center">Loading....</div>
                        ) : (
                            <DataTable data={promotionData} columns={columns} pageSize={3} />
                        )}
                    </Grid>
                </Grid>
            )}
            {dialogDelete && (
                <DialogDelete
                    show={dialogDelete}
                    close={() => setDialogDelete(false)}
                    confirmDelete={handleDeletePromotion}
                />
            )}
            {showLetter && (
                <LetterDialog
                    show={showLetter}
                    close={() => setShowLetter(false)}
                    selectedData={selectedRow}
                    type="promote"
                    triggerReloadData={() => setReloadData(!reloadData)}
                    method={method}
                />
            )}
        </>
    );
}

export default SalaryIncreaseRequest;
