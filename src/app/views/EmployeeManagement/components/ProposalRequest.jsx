// ** React imports
import React, { useEffect, useState } from 'react';

// ** Third party imports
import { Button, CircularProgress, Grid, Icon, IconButton, MenuItem, TextField } from '@material-ui/core';
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
import { STATUS_EMPLOYEE, STATUS_PROPOSAL, STATUS_PROPOSAL_NAME, TYPE_PROPOSAL } from 'app/Utils/Constants';

// ** Services Imports
import {
    addProposal,
    deleteProposal,
    getProposalByEmployee,
    updateProposal,
} from 'app/views/PendingRequest/store/proposalSlice';

function SalaryIncreaseRequest({ employeeData }) {
    // ** State
    const [proposalId, setProposalId] = useState();
    const [dialogDelete, setDialogDelete] = useState(false);
    const [showLetter, setShowLetter] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [method, setMethod] = useState('view');
    const [reloadData, setReloadData] = useState(false);

    // ** Vars
    const dispatch = useDispatch();
    const leaderData = useSelector((state) => state.leaders.leaderList);
    const proposals = useSelector((state) => state?.proposals);
    const proposalData =
        proposals &&
        proposals?.data?.map((item) => ({
            ...item,
            tableData: {
                id: item.id,
            },
        }));

    const schema = Yup.object().shape({
        proposalDate: Yup.date().required('Trường này không được để trống'),
        type: Yup.string().required('Trường này không được để trống'),
        content: Yup.string().trim().max(60, 'Không nhập quá 60 ký tự').required('Trường này không được để trống'),
    });

    const defaultValues = {
        proposalDate: moment(new Date()).format('YYYY-MM-DD'),
        type: '',
        content: '',
        note: '',
        detailedDescription: '',
        leaderId: '',
    };

    const { handleSubmit, formState, reset, setValue, control } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const employeeId = employeeData?.id;
    useEffect(() => {
        dispatch(getProposalByEmployee(employeeId));
    }, [dispatch, employeeId, reloadData]);

    const handleDeleteProposal = async () => {
        await dispatch(deleteProposal(proposalId));
        await setDialogDelete(false);
        await setReloadData(!reloadData);
        await reset;
    };

    const handleOpenDialogDelete = (id) => {
        setDialogDelete(true);
        setProposalId(id);
    };

    const handleViewLetter = (rowData) => {
        setShowLetter(true);
        setMethod('view');
        setSelectedRow(rowData);
    };

    const handleEditRow = (rowData) => {
        setSelectedRow(rowData);
        setValue('type', rowData?.type);
        setValue('content', rowData?.content);
        setValue('note', rowData?.note);
        setValue('proposalDate', moment(rowData?.proposalDate).format('YYYY-MM-DD'));
        setValue('leaderId', rowData?.leaderId);
        setValue('detailedDescription', rowData?.detailedDescription);
    };

    const onSubmit = async (values) => {
        const newData = {
            ...selectedRow,
            ...values,
        };
        if (selectedRow?.id) {
            const res = await dispatch(updateProposal(newData));
            if (res?.payload?.data && res?.payload?.message === 'SUCCESS') {
                await setSelectedRow(res?.payload?.data);
                await setMethod('sendLeader');
                await setShowLetter(true);
            }
        } else {
            const res = await dispatch(
                addProposal({
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
                        {+rowData?.proposalStatus !== STATUS_PROPOSAL.PENDING &&
                            +rowData?.proposalStatus !== STATUS_PROPOSAL.APPROVED &&
                            +rowData?.proposalStatus !== STATUS_PROPOSAL.REJECT && (
                                <IconButton size="small" onClick={() => handleEditRow(rowData)}>
                                    <Icon color="primary">edit</Icon>
                                </IconButton>
                            )}
                        {+rowData?.proposalStatus === STATUS_PROPOSAL.ADD_NEW && (
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
            width: '10%',
            render: (rowData) => rowData.id,
        },
        {
            title: 'Loại',
            field: 'type',
            align: 'center',
            render: (rowData) => {
                const type = TYPE_PROPOSAL.find((item) => item.id === +rowData.type);
                return type ? type.name : 'Không xác định';
            },
        },
        {
            title: 'Ngày diễn biến',
            field: 'proposalDate',
            align: 'center',
            render: (rowData) => moment(rowData?.proposalDate).format('DD/MM/YYYY'),
        },
        {
            title: 'Người duyệt',
            field: 'leaderId',
            align: 'center',
            render: (rowData) => leaderData.find((value) => value.id === +rowData.leaderId)?.leaderName,
        },
        {
            title: 'Trạng thái',
            field: 'proposalStatus',
            align: 'center',
            render: (rowData) => STATUS_PROPOSAL_NAME.find((value) => value.id === +rowData.proposalStatus)?.name,
        },
    ];

    return (
        <>
            {proposals.loading ? (
                <div className="circle-loading flex justify-center">
                    <CircularProgress size={64} />
                </div>
            ) : (
                <Grid container className="mt-15">
                    <Grid item xs={12} className="position-relative">
                        {[STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_ENDING].includes(+employeeData?.submitProfileStatus) &&
                            !selectedRow.id && (
                                <OverlayCheckPermission>Bạn không có quyền thêm trong form này</OverlayCheckPermission>
                            )}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="detailedDescription"
                                        control={control}
                                        defaultValue={defaultValues?.detailedDescription}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={<span className="font">Mô tả chi tiết</span>}
                                                variant="outlined"
                                                size="small"
                                                multiline
                                                fullWidth
                                                error={!!formState.errors.detailedDescription}
                                                helperText={formState.errors.detailedDescription?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="type"
                                        control={control}
                                        defaultValue={defaultValues?.type}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={
                                                    <span className="font">
                                                        <span style={{ color: 'red' }}> * </span>
                                                        Loại
                                                    </span>
                                                }
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                select
                                                error={!!formState.errors.type}
                                                helperText={formState.errors.type?.message}
                                            >
                                                {TYPE_PROPOSAL.map((item) => {
                                                    return (
                                                        <MenuItem key={item.id} value={item.id}>
                                                            {item.name}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </TextField>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="content"
                                        control={control}
                                        defaultValue={defaultValues?.content}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={
                                                    <span className="font">
                                                        <span style={{ color: 'red' }}> * </span>
                                                        Nội dung
                                                    </span>
                                                }
                                                variant="outlined"
                                                size="small"
                                                multiline
                                                fullWidth
                                                error={!!formState.errors.content}
                                                helperText={formState.errors.content?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="note"
                                        control={control}
                                        defaultValue={defaultValues?.note}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={<span className="font">Ghi chú</span>}
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
                                        name="proposalDate"
                                        control={control}
                                        defaultValue={defaultValues?.proposalDate}
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
                                                error={!!formState.errors.proposalDate}
                                                helperText={formState.errors.proposalDate?.message}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button
                                        className="w-49"
                                        color="primary"
                                        type="submit"
                                        variant="contained"
                                        disabled={proposals.loading}
                                    >
                                        {selectedRow?.id ? 'Cập nhật' : 'Lưu'}
                                    </Button>
                                    <Button
                                        className="btn-cancel w-49"
                                        variant="contained"
                                        onClick={handleReset}
                                        disabled={proposals.loading}
                                    >
                                        Hoàn tác
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        {proposals.loading ? (
                            <div className="text-center">Loading....</div>
                        ) : (
                            <DataTable columns={columns} data={proposalData} pageSize={3} />
                        )}
                    </Grid>
                </Grid>
            )}
            {dialogDelete && (
                <DialogDelete
                    show={dialogDelete}
                    close={() => setDialogDelete(false)}
                    confirmDelete={handleDeleteProposal}
                />
            )}
            {showLetter && (
                <LetterDialog
                    show={showLetter}
                    close={() => setShowLetter(false)}
                    selectedData={selectedRow}
                    type="proposal"
                    triggerReloadData={() => setReloadData(!reloadData)}
                    method={method}
                />
            )}
        </>
    );
}

export default SalaryIncreaseRequest;
