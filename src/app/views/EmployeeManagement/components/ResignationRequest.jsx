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
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

// ** Custom components
import { STATUS_EMPLOYEE } from 'app/Utils/Constants';

// ** Services Imports
import { updateEmployee } from 'app/views/Employee/store/employeeSlice';

function ResignationRequest({ show, close, employeeData, mainDialogClose }) {
    // ** Vars
    const dispatch = useDispatch();
    const leaderData = useSelector((state) => state.leaders.leaderList);
    const schema = Yup.object().shape({
        endDay: Yup.date('Ngày kết thúc không đúng định dạng').required('Vui lòng nhập ngày kết thúc'),
        reasonForEnding: Yup.string()
            .trim()
            .required('Vui lòng nhập lý do kết thúc')
            .max(500, 'Không được nhập quá 500 ký tự'),
        leaderId: Yup.string().required('Vui chọn người duyệt'),
    });

    const defaultValues = {
        endDay: moment(new Date()).format('YYYY-MM-DD'),
        reasonForEnding: '',
        leaderId: '',
    };

    const { register, handleSubmit, formState, reset, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const onSubmit = (values) => {
        const data = {
            ...employeeData,
            submitProfileStatus: STATUS_EMPLOYEE.PENDING_ENDING,
            leaderId: values.leaderId,
            endDay: moment(values.endDay).format('YYYY/MM/DD'),
            ...values,
        };
        dispatch(updateEmployee(data));
        reset();
        mainDialogClose();
    };

    return (
        <Dialog
            open={show}
            maxWidth={'sm'}
            fullWidth={true}
            onClose={close}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <DialogTitle>
                <span className="mb-20 styleColor">Yêu cầu xin nghỉ việc</span>
                <IconButton
                    style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
                    onClick={close}
                >
                    <Icon color="error" title={'Đóng'}>
                        close
                    </Icon>
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Ngày kết thúc"
                                variant="outlined"
                                size="small"
                                fullWidth
                                defaultValue={defaultValues.endDay}
                                {...register('endDay')}
                                error={!!formState.errors.endDay}
                                helperText={formState.errors.endDay?.message}
                                InputLabelProps={{ shrink: true }}
                                type="date"
                                onChange={(event) => {
                                    const newValue = moment(event.target.value, 'YYYY-MM-DD').format('DD/MM/YYYY');
                                    setValue('endDay', newValue);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Lý do xin nghỉ"
                                variant="outlined"
                                size="small"
                                multiline
                                fullWidth
                                error={!!formState.errors.reasonForEnding}
                                helperText={formState.errors.reasonForEnding?.message}
                                {...register('reasonForEnding')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Trình Lãnh đạo"
                                variant="outlined"
                                size="small"
                                fullWidth
                                select
                                error={!!formState.errors.leaderId}
                                helperText={formState.errors.leaderId?.message}
                                {...register('leaderId')}
                            >
                                {leaderData.map((item) => {
                                    return (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.leaderName}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button color="primary" type="submit" variant="contained">
                        Trình lãnh đạo
                    </Button>
                    <Button onClick={close} className="btn-cancel" variant="outlined">
                        Huỷ
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default ResignationRequest;
