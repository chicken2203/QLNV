import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Grid, Icon, IconButton } from '@material-ui/core';
import { TextValidator } from 'react-material-ui-form-validator';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { ConfirmationDialog } from 'egret';
import moment from 'moment';
import 'app/assets/Experience.scss';
import { deleteExperienceOfEmployee } from 'app/views/Employee/store/experienceSlice';

export const ExperiencesTable = (props) => {
    const { jobDescription, readOnly, roleUser, setEditExperience, setOpenExperiencesDialog } = props;
    const [showCoating, setShowCoating] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const dispatch = useDispatch();
    return (
        <Grid
            className="jobDetail mt-12"
            onMouseEnter={() => {
                setShowCoating(true);
            }}
            onMouseLeave={() => {
                setShowCoating(false);
            }}
        >
            <Grid className="flex flex-space-between flex-middle">
                <div className="flex flex-start">
                    <BusinessCenterIcon className="icon mr-8" />
                    <p className="font-weight-bold">{jobDescription.companyName}</p>
                </div>
                <div className="flex flex-end flex-middle">
                    <p>{moment(jobDescription.startDate).format('DD/MM/YYYY')}</p>
                    <p className="mx-4">{'-'}</p>
                    <p>{moment(jobDescription.endDate).format('DD/MM/YYYY')}</p>
                </div>
            </Grid>
            <Grid className="flex flex-space-between flex-middle">
                <p>{jobDescription.companyAddress}</p>
            </Grid>
            <Grid className="my-12 ml-16">
                <TextValidator
                    className={!readOnly ? 'textarea-dotted' : 'reset-underline-mui'}
                    value={jobDescription.jobDescription}
                    type="text"
                    name="jobDescription"
                    variant="standard"
                    size="small"
                    fullWidth
                    multiline
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>
            {!readOnly && roleUser && (
                <Grid className={`coating ${showCoating ? 'visible' : ''} flex flex-bottom flex-end`}>
                    <IconButton
                        size="small"
                        onClick={() => {
                            setEditExperience(jobDescription);
                            setOpenExperiencesDialog(true);
                        }}
                    >
                        <Icon color="primary">edit</Icon>
                    </IconButton>
                    <IconButton
                        className="ml-4"
                        size="small"
                        onClick={() => {
                            setOpenConfirmDialog(true);
                        }}
                    >
                        <Icon color="error">delete</Icon>
                    </IconButton>
                </Grid>
            )}
            {openConfirmDialog && (
                <ConfirmationDialog
                    title={'Xóa kinh nghiem lam viec'}
                    open={openConfirmDialog}
                    onConfirmDialogClose={() => {
                        setOpenConfirmDialog(false);
                    }}
                    onYesClick={() => {
                        dispatch(deleteExperienceOfEmployee(jobDescription));
                        setOpenConfirmDialog(false);
                    }}
                    text={'Bạn có đồng ý xóa kinh nghiem lam viec cua nhan vien nay khong'}
                    Yes="Đồng ý"
                    No="Không"
                />
            )}
        </Grid>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExperiencesTable);
