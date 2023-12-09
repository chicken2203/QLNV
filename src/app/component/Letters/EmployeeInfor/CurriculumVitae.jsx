// ** React imports
import React, { useState } from 'react';
import { connect } from 'react-redux';

// ** Third party imports
import { Grid, IconButton, Icon, Avatar, Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import moment from 'moment';

// ** Services

// ** Custom components
import { GENDER, TEAM } from 'app/Utils/Constants';
import * as ValidateRules from 'app/component/ValidateRules';
import 'app/assets/CurriculumVitae.scss';
import EmployeeExperiences from './EmployeeExperiences';
import ExperiencesDialog from 'app/component/ActionDialogs/ExperiencesDialog';
import TruncateString from 'app/component/TruncateString';

export const CurriculumVitae = (props) => {
    const { employeeInfo, handleRegisterChange, submitRef, readOnly, roleUser } = props;
    const target =
        '❝ Với tính cách năng động, ham học hỏi và chăm chỉ, tôi mong muốn được làm việc với vị trí lập trình viên tại Quý công ty. Tôi sẽ cố gắng hoàn thành tốt các công việc được giao, học hỏi thêm nhiều kinh nghiệm chuyên môn và không ngừng phấn đấu để trở thành CEO trong 1 năm tới.❞';
    const [openExperiencesDialog, setOpenExperiencesDialog] = useState(false);
    const [editExperience, setEditExperience] = useState(null);
    ValidatorForm.addValidationRule('matchVietnameseWords', (value) => {
        return ValidateRules.wordsLength(value);
    });
    ValidatorForm.addValidationRule('stringLengthLimited100', (value) => {
        return ValidateRules.lengthLessThan100(value);
    });
    ValidatorForm.addValidationRule('stringLengthLimited250', (value) => {
        return ValidateRules.lengthLessThan250(value);
    });
    ValidatorForm.addValidationRule('stringLengthLimited2000', (value) => {
        return ValidateRules.lengthLessThan2000(value);
    });
    return (
        <Grid item className="cv-container letter-a4 font-family">
            <ValidatorForm
                onSubmit={() => {}}
                style={{
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Grid item className="flex">
                    <Grid item lg={4} md={4} sm={4} xs={4} className="p-24">
                        <Grid item>
                            <Avatar
                                className="m-auto"
                                alt="Avatar"
                                src={employeeInfo?.image}
                                style={{ width: '210px', height: '210px' }}
                            />
                            <h3 className="font-weight-bold mt-24">{employeeInfo.name.toUpperCase()}</h3>
                            <h6 className="font-weight-bold mt-12">
                                {TEAM.map((value) => (value.id === employeeInfo.team ? value.name : ''))}
                            </h6>
                        </Grid>
                        <Grid item>
                            <div className="middle-line mt-24">
                                <h5 className="font-weight-bold inline-flex bg-white pr-4">{'THÔNG TIN CÁ NHÂN'}</h5>
                                <p className="flex flex-middle my-4">
                                    <Icon className="icon mr-8">wc</Icon>
                                    <span>
                                        {GENDER.map((value) => (value.id === employeeInfo.gender ? value.name : ''))}
                                    </span>
                                </p>
                                <p className="flex flex-middle my-4">
                                    <Icon className="icon mr-8">call</Icon>
                                    <span>{employeeInfo.phone}</span>
                                </p>
                                <p className="flex flex-middle my-4">
                                    <Icon className="icon mr-8">email</Icon>
                                    <span>{employeeInfo.email}</span>
                                </p>
                                <p className="flex flex-middle my-4">
                                    <Icon className="icon mr-8">info</Icon>
                                    <span>{moment(employeeInfo.dateOfBirth).format('DD/MM/YYYY')}</span>
                                </p>
                                <p className="flex flex-middle my-4">
                                    <Icon className="icon mr-8">room</Icon>
                                    <span>{TruncateString(employeeInfo.address, 100)}</span>
                                </p>
                            </div>
                        </Grid>
                        <Grid item>
                            <div className="middle-line mt-24">
                                <h5 className="font-weight-bold inline-flex bg-white pr-4">{'KỸ NĂNG'}</h5>
                                <Grid item className="my-auto">
                                    <TextValidator
                                        className={!readOnly ? 'textarea-dotted' : 'reset-underline-mui'}
                                        id="standard-basic"
                                        fullWidth
                                        value={employeeInfo.skill || ''}
                                        onChange={(e) => handleRegisterChange(e)}
                                        InputProps={{
                                            readOnly: readOnly,
                                        }}
                                        type="text"
                                        name="skill"
                                        variant="standard"
                                        multiline
                                        validators={['required', 'stringLengthLimited250']}
                                        errorMessages={['Không được để trống', 'Không vượt quá 250 ký tự']}
                                        size="small"
                                    />
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item>
                            <div className="middle-line mt-24">
                                <h5 className="font-weight-bold inline-flex bg-white pr-4">{'HIỂU BIẾT'}</h5>
                                <Grid item className="my-auto">
                                    <TextValidator
                                        className={!readOnly ? 'textarea-dotted' : 'reset-underline-mui'}
                                        id="standard-basic"
                                        fullWidth
                                        value={employeeInfo.knowledge || ''}
                                        onChange={(e) => handleRegisterChange(e)}
                                        InputProps={{
                                            readOnly: readOnly,
                                        }}
                                        type="text"
                                        name="knowledge"
                                        variant="standard"
                                        multiline
                                        validators={['required', 'stringLengthLimited250']}
                                        errorMessages={['Không được để trống', 'Không vượt quá 250 ký tự']}
                                        size="small"
                                    />
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item>
                            <div className="middle-line mt-24">
                                <h5 className="font-weight-bold inline-flex bg-white pr-4">{'HOẠT ĐỘNG'}</h5>
                                <Grid item className="my-auto">
                                    <TextValidator
                                        className={!readOnly ? 'textarea-dotted' : 'reset-underline-mui'}
                                        id="standard-basic"
                                        fullWidth
                                        value={employeeInfo.activity || ''}
                                        onChange={(e) => handleRegisterChange(e)}
                                        InputProps={{
                                            readOnly: readOnly,
                                        }}
                                        type="text"
                                        name="activity"
                                        variant="standard"
                                        multiline
                                        validators={['required', 'stringLengthLimited250']}
                                        errorMessages={['Không được để trống', 'Không vượt quá 250 ký tự']}
                                        size="small"
                                    />
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={8} className="p-24">
                        <Grid item lg={12} md={12} sm={12} xs={12} className="border-left pl-16">
                            <div className="middle-line mt-24">
                                <h5 className="font-weight-bold  inline-flex bg-white pr-4">{'MỤC TIÊU'}</h5>
                                <p className="p-12">{target}</p>
                            </div>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} className="border-left pl-16">
                            <div className="middle-line mt-24">
                                <h5 className="font-weight-bold  inline-flex bg-white pr-4">
                                    {'KINH NGHIỆM LÀM VIỆC'}
                                </h5>
                            </div>
                            {!readOnly && (
                                <div className="flex flex-middle flex-center ">
                                    <IconButton
                                        className="add-icon"
                                        size="medium"
                                        onClick={() => {
                                            setOpenExperiencesDialog(true);
                                            setEditExperience(null);
                                        }}
                                    >
                                        <Icon fontSize="large" color="error">
                                            add
                                        </Icon>
                                    </IconButton>
                                </div>
                            )}
                            {employeeInfo?.employeeExps?.map((value) => (
                                <EmployeeExperiences
                                    key={value.id}
                                    jobDescription={value}
                                    readOnly={readOnly}
                                    roleUser={roleUser}
                                    setEditExperience={setEditExperience}
                                    setOpenExperiencesDialog={setOpenExperiencesDialog}
                                />
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Button variant="contained" type="submit" color="primary" style={{ display: 'none' }} ref={submitRef}>
                    {'Đăng ký'}
                </Button>
            </ValidatorForm>
            {openExperiencesDialog && (
                <ExperiencesDialog
                    openDialog={openExperiencesDialog}
                    handleClose={() => {
                        setOpenExperiencesDialog(false);
                        setEditExperience(null);
                    }}
                    item={editExperience}
                    employeeId={employeeInfo.id}
                />
            )}
        </Grid>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CurriculumVitae);
