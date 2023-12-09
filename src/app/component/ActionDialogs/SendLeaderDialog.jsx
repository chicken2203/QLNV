// ** React imports
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Third party imports
import {
    Backdrop,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Icon,
    IconButton,
    MenuItem,
    TextField,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import 'styles/views/_style.scss';
import 'app/assets/Button.scss';

// ** Service imports
import { EDIT_STATUS, STATUS_PROMOTE, STATUS_PROPOSAL, STATUS_SALARY } from 'app/Utils/Constants';
import { updatePromotion } from 'app/views/PendingRequest/store/promotionSlice';
import { updateIncreaseSalary } from 'app/views/PendingRequest/store/salarySlice';
import { updateProposal } from 'app/views/PendingRequest/store/proposalSlice';

function SendLeaderDialog({ show, close, type, employeeData, selectedData, letterClose, triggerReloadData }) {
    const dispatch = useDispatch();
    const leaderData = useSelector((state) => state.leaders.leaderList);

    const schema = Yup.object({
        leaderId: Yup.string().trim().required('Trường này không được để trống'),
    });

    const defaultValues = {
        leaderId: selectedData?.leaderId,
    };

    const { control, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const onSubmit = async (data) => {
        if (type === 'salary') {
            const isStatusEditable = EDIT_STATUS.includes(selectedData?.salaryIncreaseStatus?.toString());
            const newStatus = isStatusEditable ? STATUS_SALARY.PENDING : selectedData?.salaryIncreaseStatus;
            const newData = {
                ...selectedData,
                ...data,
                salaryIncreaseStatus: newStatus,
            };
            await dispatch(updateIncreaseSalary(newData));
        } else if (type === 'promote') {
            const isStatusEditable = EDIT_STATUS.includes(selectedData?.processStatus?.toString());
            const newStatus = isStatusEditable ? STATUS_PROMOTE.PENDING : selectedData?.processStatus;
            const newData = {
                ...selectedData,
                ...data,
                processStatus: newStatus,
            };
            await dispatch(updatePromotion(newData));
        } else {
            const isStatusEditable = EDIT_STATUS.includes(selectedData?.proposalStatus?.toString());
            const newStatus = isStatusEditable ? STATUS_PROPOSAL.PENDING : selectedData?.proposalStatus;
            const newData = {
                ...selectedData,
                ...data,
                proposalStatus: newStatus,
            };
            await dispatch(updateProposal(newData));
        }
        handleClose();
        await letterClose();
        await triggerReloadData();
    };

    const handleClose = () => {
        reset();
        close();
    };

    return (
        <Dialog
            open={show}
            maxWidth={'sm'}
            fullWidth={true}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <DialogTitle divider>
                <span className="mb-20 styleColor">Trình lãnh đạo</span>
                <IconButton style={{ position: 'absolute', right: '10px', top: '10px' }} onClick={handleClose}>
                    <Icon color="error" title="close">
                        close
                    </Icon>
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers>
                    <Grid container spacing={2} className="py-10">
                        <Grid item xs={12}>
                            <Controller
                                name="leaderId"
                                control={control}
                                defaultValue={defaultValues?.leaderId}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={
                                            <span>
                                                <span style={{ color: 'red' }}> * </span>
                                                Trình lãnh đạo
                                            </span>
                                        }
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        select
                                        error={!!formState.errors.leaderId}
                                        helperText={formState.errors.leaderId?.message}
                                    >
                                        {leaderData.map((item) => {
                                            return (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.leaderName}
                                                </MenuItem>
                                            );
                                        })}
                                    </TextField>
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant="contained" className="mr-12" color="primary" type="submit">
                        Xác nhận
                    </Button>
                    <Button className="mr-12 btn-cancel" variant="contained" onClick={handleClose}>
                        Đóng
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
export default SendLeaderDialog;
