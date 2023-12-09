// ** React imports
import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';

// ** Third party import
import { Dialog, Grid, DialogActions, DialogTitle, DialogContent, IconButton, Icon } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';

// ** Custom components
import { LIST_POSITION, STATUS_EMPLOYEE_NAME, STATUS_EMPLOYEE, SHOW_DATE, SHOW_CONTENT } from 'app/Utils/Constants';
import ButtonControler from '../ButtonControler';

// ** Services
import { getAllLeader } from 'app/views/Employee/store/leaderSlice';

export const SubmissionDialog = (props) => {
    const { handleClose, openDialog, handleSubmit, leaderList, nextStatus, numberSaver, showLeader = false } = props;
    const [formData, setFormData] = useState();
    const showDate = SHOW_DATE.includes(nextStatus);
    const showContent = SHOW_CONTENT.includes(nextStatus);
    const dispatch = useDispatch();
    const acceptSubmitRef = useRef(null);
    useEffect(() => {
        if (nextStatus === STATUS_EMPLOYEE.PENDING) {
            dispatch(getAllLeader());
        }
        setFormData({
            ...formData,
            date: moment(new Date()).format('YYYY-MM-DD'),
            numberSaver: numberSaver,
            nextStatus: nextStatus,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (event) => {
        if (event.target.name === 'leader') {
            if (event.target.value) {
                return setFormData({
                    ...formData,
                    leaderId: event.target.value.id,
                    leaderName: event.target.value.leaderName,
                    leaderPosition: event.target.value.leaderPosition,
                });
            } else
                return setFormData({
                    ...formData,
                    leaderId: null,
                    leaderName: null,
                    leaderPosition: null,
                });
        } else return setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const handleSubmitForm = () => {
        if (acceptSubmitRef.current) {
            clearTimeout(acceptSubmitRef.current);
        }
        acceptSubmitRef.current = setTimeout(() => {
            handleSubmit(formData);
        }, 500);
    };

    return (
        <Dialog open={openDialog} maxWidth={'sm'} fullWidth={true}>
            <DialogTitle>
                <span className="mb-20 styleColor">
                    {STATUS_EMPLOYEE_NAME.find((value) => value.id === nextStatus)?.content}
                </span>
                <IconButton
                    style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
                    onClick={() => handleClose()}
                >
                    <Icon color="error" title={'Đóng'}>
                        close
                    </Icon>
                </IconButton>
            </DialogTitle>
            <ValidatorForm
                onSubmit={handleSubmitForm}
                style={{
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <DialogContent dividers className="overflow-hidden">
                    <Grid item container spacing={1}>
                        {showLeader && (
                            <>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Autocomplete
                                        className="w-100 mb-10"
                                        options={leaderList}
                                        getOptionLabel={(leader) => leader.leaderName}
                                        onChange={(event, value) => {
                                            handleChange({ target: { name: 'leader', value } });
                                        }}
                                        renderInput={(params) => (
                                            <TextValidator
                                                {...params}
                                                value={formData?.leaderName}
                                                label={
                                                    <span className="font">
                                                        <span style={{ color: 'red' }}> * </span>
                                                        {'Tên lãnh đạo'}
                                                    </span>
                                                }
                                                variant="outlined"
                                                fullWidth
                                                validators={['required']}
                                                errorMessages={['Không được bỏ trống']}
                                                size="small"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <TextValidator
                                        className="w-100 mb-10"
                                        id="standard-basic"
                                        fullWidth
                                        type="text"
                                        name="leaderPosition"
                                        variant="outlined"
                                        size="small"
                                        value={
                                            LIST_POSITION.find((item) => item.id === formData?.leaderPosition)?.name ||
                                            ''
                                        }
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        label={<span className="font">{'Chức vụ lãnh đạo'}</span>}
                                    />
                                </Grid>
                            </>
                        )}

                        {showDate && (
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextValidator
                                    className="w-100 mb-10"
                                    id="standard-basic"
                                    fullWidth
                                    value={formData?.date}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    InputProps={{
                                        inputProps: {
                                            min: moment().format('YYYY-MM-DD'),
                                        },
                                    }}
                                    type="date"
                                    name="date"
                                    variant="outlined"
                                    size="small"
                                    label={
                                        <span className="font">
                                            <span style={{ color: 'red' }}> * </span>
                                            {'Ngày ' +
                                                STATUS_EMPLOYEE_NAME.find((value) => value.id === nextStatus)?.content}
                                        </span>
                                    }
                                />
                            </Grid>
                        )}
                        {nextStatus === STATUS_EMPLOYEE.SAVE_AND_QUIT && (
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextValidator
                                    className="w-100 mb-10"
                                    id="standard-basic"
                                    fullWidth
                                    value={numberSaver}
                                    type="text"
                                    name="numberSaver"
                                    variant="outlined"
                                    size="small"
                                    label={
                                        <span className="font">
                                            <span style={{ color: 'red' }}> * </span>
                                            {'Số hiệu kết thúc'}
                                        </span>
                                    }
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                        )}
                        {showContent && (
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextValidator
                                    className="w-100 mb-10"
                                    id="standard-basic"
                                    fullWidth
                                    value={formData?.content}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    type="text"
                                    name="content"
                                    variant="outlined"
                                    size="small"
                                    validators={['required']}
                                    errorMessages={['Không được để trống']}
                                    label={
                                        <span className="font">
                                            <span style={{ color: 'red' }}> * </span>
                                            {'Nội dung ' +
                                                STATUS_EMPLOYEE_NAME.find((value) => value.id === nextStatus)?.content}
                                        </span>
                                    }
                                />
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions container={'true'} spacing={2} className="flex-center">
                    <ButtonControler handleCancel={() => handleClose()} handleSubmit={() => {}} />
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
};

const mapStateToProps = (state) => ({
    leaderList: state.leaders.leaderList,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionDialog);
