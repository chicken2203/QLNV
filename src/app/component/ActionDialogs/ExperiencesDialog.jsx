// ** React imports
import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';

// ** Third party import
import { Dialog, Grid, DialogActions, DialogTitle, DialogContent, IconButton, Icon } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import moment from 'moment';

// ** Custom components
import ButtonControler from '../ButtonControler';
import * as ValidateRules from 'app/component/ValidateRules';
import StringDataHanldling from '../StringDataHanldling';

// ** Services
import { createExperienceOfEmployee, editExperienceOfEmployee } from 'app/views/Employee/store/experienceSlice';

export const ExperiencesDialog = (props) => {
    const { item, handleClose, openDialog, employeeId } = props;
    const [currentExperience, setCurrentExperience] = useState(item);
    const dispatch = useDispatch();
    const acceptSubmitRef = useRef(null);

    const handleChange = (e) => {
        setCurrentExperience({
            ...currentExperience,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitForm = () => {
        if (acceptSubmitRef.current) {
            clearTimeout(acceptSubmitRef.current);
        }
        acceptSubmitRef.current = setTimeout(() => {
            if (item?.id) {
                dispatch(
                    editExperienceOfEmployee(StringDataHanldling({ ...currentExperience, employeeId: employeeId })),
                );
            } else {
                dispatch(
                    createExperienceOfEmployee(StringDataHanldling({ ...currentExperience, employeeId: employeeId })),
                );
            }
            handleClose();
        }, 500);
    };
    useEffect(() => {
        ValidatorForm.addValidationRule(`affterStartDate${currentExperience?.startDate}`, (value) => {
            if (!currentExperience?.startDate || !value) return true;
            return new Date(value) >= new Date(currentExperience?.startDate);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentExperience?.startDate]);
    ValidatorForm.addValidationRule('matchVietnameseWords', (value) => {
        return ValidateRules.wordsLength(value);
    });

    ValidatorForm.addValidationRule('stringLengthLimited250', (value) => {
        return ValidateRules.lengthLessThan250(value);
    });
    ValidatorForm.addValidationRule('stringLengthLimited2000', (value) => {
        return ValidateRules.lengthLessThan2000(value);
    });

    return (
        <Dialog open={openDialog} maxWidth={'sm'} fullWidth={true}>
            <DialogTitle>
                <span className="mb-20 styleColor">{'Kinh nghiệm của nhân viên'}</span>
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
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextValidator
                                className="w-100 mb-10"
                                label={
                                    <span className="font">
                                        <span style={{ color: 'red' }}> * </span>
                                        {'Ngày bắt đầu'}
                                    </span>
                                }
                                id="standard-basic"
                                fullWidth
                                value={currentExperience?.startDate || ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                InputProps={{
                                    inputProps: {
                                        max: moment().format('YYYY-MM-DD'),
                                    },
                                }}
                                type="date"
                                name="startDate"
                                variant="outlined"
                                size="small"
                                validators={['required']}
                                errorMessages={['Không được để trống']}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextValidator
                                className="w-100 mb-10"
                                label={
                                    <span className="font">
                                        <span style={{ color: 'red' }}> * </span>
                                        {'Ngày kết thúc'}
                                    </span>
                                }
                                id="standard-basic"
                                fullWidth
                                value={currentExperience?.endDate || ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                InputProps={{
                                    inputProps: {
                                        max: moment().format('YYYY-MM-DD'),
                                    },
                                }}
                                type="date"
                                name="endDate"
                                variant="outlined"
                                size="small"
                                validators={['required', `affterStartDate${currentExperience?.startDate}`]}
                                errorMessages={['Không được để trống', 'Ngày kết thúc phải sau ngày bắt đầu']}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextValidator
                                className="w-100 mb-10"
                                label={
                                    <span className="font">
                                        <span style={{ color: 'red' }}> * </span>
                                        {'Tên công ty'}
                                    </span>
                                }
                                id="standard-basic"
                                fullWidth
                                value={currentExperience?.companyName || ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                InputProps={{
                                    inputProps: {
                                        // min: moment().format('YYYY-MM-DD'),
                                    },
                                }}
                                type="text"
                                name="companyName"
                                variant="outlined"
                                size="small"
                                validators={['required', 'stringLengthLimited100']}
                                errorMessages={['Không được để trống', 'Không vượt quá 100 ký tự']}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextValidator
                                className="w-100 mb-10"
                                label={
                                    <span className="font">
                                        <span style={{ color: 'red' }}> * </span>
                                        {'Địa chỉ công ty'}
                                    </span>
                                }
                                id="standard-basic"
                                fullWidth
                                value={currentExperience?.companyAddress || ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                InputProps={{
                                    inputProps: {
                                        // min: moment().format('YYYY-MM-DD'),
                                    },
                                }}
                                type="text"
                                name="companyAddress"
                                variant="outlined"
                                size="small"
                                validators={['required', 'stringLengthLimited250']}
                                errorMessages={['Không được để trống', 'Không vượt quá 250 ký tự']}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextValidator
                                className="w-100 mb-10"
                                label={
                                    <span className="font">
                                        <span style={{ color: 'red' }}> * </span>
                                        {'Kinh nghiệm làm việc'}
                                    </span>
                                }
                                id="standard-basic"
                                fullWidth
                                value={currentExperience?.jobDescription || ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                InputProps={{
                                    inputProps: {
                                        // min: moment().format('YYYY-MM-DD'),
                                    },
                                }}
                                multiline
                                type="text"
                                name="jobDescription"
                                variant="outlined"
                                size="small"
                                validators={['required', 'stringLengthLimited2000', 'matchVietnameseWords']}
                                errorMessages={[
                                    'Không được để trống',
                                    'Không vượt quá 2000 ký tự',
                                    'Có chứa từ không phải là tiếng việt',
                                ]}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextValidator
                                className="w-100 mb-10"
                                label={
                                    <span className="font">
                                        <span style={{ color: 'red' }}> * </span>
                                        {'Lý do nghỉ việc'}
                                    </span>
                                }
                                value={currentExperience?.leavingReason || ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                type="text"
                                name="leavingReason"
                                variant="outlined"
                                size="small"
                                fullWidth
                                validators={['required', 'stringLengthLimited250', 'matchVietnameseWords']}
                                errorMessages={[
                                    'Không được để trống',
                                    'Không vượt quá 250 ký tự',
                                    'Có chứa từ không phải là tiếng việt',
                                ]}
                                InputProps={
                                    {
                                        // readOnly: readOnly,
                                    }
                                }
                            />
                        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExperiencesDialog);
