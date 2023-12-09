// ** React imports
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, connect } from 'react-redux';

// ** Third party imports
import {
    Dialog,
    Grid,
    DialogActions,
    DialogTitle,
    DialogContent,
    Tabs,
    Tab,
    IconButton,
    Icon,
    Backdrop,
} from '@material-ui/core';
import * as Yup from 'yup';
import moment from 'moment';
import 'styles/views/_style.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'app/assets/Button.scss';
import 'app/assets/LetterStyle.scss';

// ** Custom components
import TabPanel, { a11yProps } from 'app/component/TabPanel';
import StringDataHanldling from 'app/component/StringDataHanldling';
import CurriculumVitae from './CurriculumVitae';
import EmployeeInfomation from './EmployeeInfomation';
import EmployeeCertificate from './EmployeeCertificate';
import SubmissionDialog from 'app/component/ActionDialogs/SubmissionDialog';
import { TAB, EDIT_STATUS, STATUS_EMPLOYEE, WAIT_LEADER_APPROVED, ROLE } from 'app/Utils/Constants';
import ButtonControler from 'app/component/ButtonControler';
import * as ValidateRules from 'app/component/ValidateRules';

// ** Services import
import { updateEmployee } from 'app/views/Employee/store/employeeSlice';
import { fetchCertificateOfEmployee } from 'app/views/Employee/store/certificateSlice';
import { fetchRelationOfEmployee } from 'app/views/Employee/store/relationShipSlice';
import { fetchExperienceOfEmployee } from 'app/views/Employee/store/experienceSlice';

export const EmployeeInfoDialog = (props) => {
    const {
        item,
        handleClose,
        certificates,
        relationsShip,
        experiences,
        employeeRegister,
        roles,
        triggerReloadData,
        closeFatherDialog,
    } = props;

    const [employeeInfo, setEmployeeInfo] = useState(item);
    const [tabInfo, setTabInfo] = useState(TAB.REGISTER_TAB.CV);
    const [openSubmissionDialog, setOpenSubmissionDialog] = useState(false);
    const [nextStatus, setNextStatus] = useState(null);

    const editable = EDIT_STATUS.includes(item.submitProfileStatus);
    const leaderApproved = WAIT_LEADER_APPROVED.includes(item.submitProfileStatus);
    const saveAndQuit = Number(item.submitProfileStatus) === Number(STATUS_EMPLOYEE.APPROVED_ENDING);
    const numberSaver = 'NL' + moment().format('MMYY') + '/' + item?.code?.slice(-3);
    const roleUser = roles[0].id === ROLE.USER;

    const dispatch = useDispatch();
    const submitRef = useRef();

    useEffect(() => {
        setEmployeeInfo(employeeRegister);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeRegister]);
    useEffect(() => {
        employeeInfo.id && dispatch(fetchCertificateOfEmployee(employeeInfo.id));
        employeeInfo.id && dispatch(fetchRelationOfEmployee(employeeInfo.id));
        employeeInfo.id && dispatch(fetchExperienceOfEmployee(employeeInfo.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeRegister]);

    useEffect(() => {
        setEmployeeInfo({ ...employeeInfo, certificatesDto: certificates });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [certificates]);
    useEffect(() => {
        setEmployeeInfo({ ...employeeInfo, employeeFamilyDtos: relationsShip });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [relationsShip]);
    useEffect(() => {
        const data = experiences.map((value) => ({
            ...value,
            startDate: moment(value.startDate).format('YYYY-MM-DD'),
            endDate: moment(value.endDate).format('YYYY-MM-DD'),
        }));
        setEmployeeInfo({ ...employeeInfo, employeeExps: data });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeRegister, experiences]);

    const schema = Yup.object().shape({
        skill: Yup.string()
            .required('Không được để trống')
            .test('stringLengthLimited250', 'Không vượt quá 250 ký tự', (value) => {
                return ValidateRules.lengthLessThan50(value);
            }),
        knowledge: Yup.string()
            .required('Không được để trống')
            .test('stringLengthLimited250', 'Không vượt quá 250 ký tự', (value) => {
                return ValidateRules.lengthLessThan50(value);
            }),
        activity: Yup.string()
            .required('Không được để trống')
            .test('stringLengthLimited250', 'Không vượt quá 250 ký tự', (value) => {
                return ValidateRules.lengthLessThan50(value);
            }),
        // employeeExps: Yup.array().of(
        //     Yup.object().shape({
        //         companyName: Yup.string()
        //             .required('Không được để trống')
        //             .test('stringLengthLimited100', 'Không vượt quá 100 ký tự', (value) => {
        //                 return ValidateRules.lengthLessThan100(value);
        //             }),
        //         startDate: Yup.date().required('Không được để trống'),
        //         endDate: Yup.date()
        //             .required('Không được để trống')
        //             .test('endDate', 'Ngày kết thúc phải sau ngày bắt đầu', function (value) {
        //                 const { startDate } = this.parent;
        //                 if (!startDate || !value) return true;
        //                 return new Date(value) > new Date(startDate);
        //             }),
        //         jobDescription: Yup.string()
        //             .required('Không được để trống')
        //             .test('stringLengthLimited250', 'Không vượt quá 250 ký tự', (value) => {
        //                 return ValidateRules.lengthLessThan250(value);
        //             }),
        //         leavingReason: Yup.string()
        //             .required('Không được để trống')
        //             .test('stringLengthLimited100', 'Không vượt quá 100 ký tự', (value) => {
        //                 return ValidateRules.lengthLessThan100(value);
        //             }),
        //         companyAddress: Yup.string()
        //             .required('Không được để trống')
        //             .test('stringLengthLimited100', 'Không vượt quá 100 ký tự', (value) => {
        //                 return ValidateRules.lengthLessThan100(value);
        //             }),
        //     }),
        // ),
    });

    const handleRegisterChange = (event) => {
        switch (event.target.name) {
            case 'leader': {
                if (event.target.value) {
                    return setEmployeeInfo({
                        ...employeeInfo,
                        leaderId: event.target.value.id,
                        leaderName: event.target.value.leaderName,
                        leaderPosition: event.target.value.leaderPosition,
                    });
                } else
                    return setEmployeeInfo({
                        ...employeeInfo,
                        leaderId: null,
                        leaderName: null,
                        leaderPosition: null,
                    });
            }
            case 'submitDay': {
                return setEmployeeInfo({
                    ...employeeInfo,
                    submitDay: moment().format('YYYY-MM-DD'),
                    // submitProfileStatus: STATUS_EMPLOYEE.PENDING,
                });
            }

            default: {
                setEmployeeInfo({ ...employeeInfo, [event.target.name]: event.target.value });
            }
        }
    };

    const handleFormSubmit = () => {
        dispatch(updateEmployee(StringDataHanldling({ ...employeeInfo })));
    };

    const handleSubmissionManager = async (formData) => {
        let newData = {};
        let dispatchFunction = null;

        switch (formData.nextStatus) {
            case STATUS_EMPLOYEE.SAVE_AND_QUIT:
                newData = {
                    numberSaved: formData.numberSaved,
                    decisionDay: formData.date,
                    submitProfileStatus: STATUS_EMPLOYEE.SAVE_AND_QUIT?.toString(),
                };
                dispatchFunction = updateEmployee;
                break;

            case STATUS_EMPLOYEE.PENDING:
                newData = {
                    leaderId: employeeInfo.leaderId || formData.leaderId,
                    leaderName: employeeInfo.leaderName || formData.leaderName,
                    leaderPosition: employeeInfo.leaderPosition || formData.leaderPosition,
                    submitDay: formData.date,
                    submitContent: formData.content,
                    submitProfileStatus: STATUS_EMPLOYEE.PENDING?.toString(),
                };
                dispatchFunction = updateEmployee;
                break;

            case STATUS_EMPLOYEE.APPROVED:
                newData = {
                    appointmentDate: moment(formData.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                    submitProfileStatus: STATUS_EMPLOYEE.APPROVED?.toString(),
                };
                dispatchFunction = updateEmployee;
                break;

            case STATUS_EMPLOYEE.ADDITIONAL_REQUESTED:
                newData = {
                    additionalRequest: formData.content,
                    submitProfileStatus: STATUS_EMPLOYEE.ADDITIONAL_REQUESTED?.toString(),
                };
                dispatchFunction = updateEmployee;
                break;

            case STATUS_EMPLOYEE.REJECT:
                newData = {
                    rejectionDate: moment(formData.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                    reasonForRejection: formData.content,
                    submitProfileStatus: STATUS_EMPLOYEE.REJECT.toString(),
                };
                dispatchFunction = updateEmployee;
                break;

            default:
                setOpenSubmissionDialog(false);
                handleClose();
                break;
        }
        await dispatch(dispatchFunction(StringDataHanldling({ ...employeeInfo })));
        await dispatch(dispatchFunction(StringDataHanldling({ ...employeeInfo, ...newData })));
        await setOpenSubmissionDialog(false);
        await handleClose();
        triggerReloadData && (await triggerReloadData());
        closeFatherDialog && (await closeFatherDialog());
    };
    return (
        <>
            <Dialog
                open={props.open}
                maxWidth={'md'}
                fullWidth={true}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <DialogTitle>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <span className="mb-20 styleColor">Thông tin nhân viên</span>
                        <IconButton
                            style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
                            onClick={() => handleClose()}
                        >
                            <Icon color="error" title={'Đóng'}>
                                close
                            </Icon>
                        </IconButton>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Tabs
                            variant="scrollable"
                            scrollButtons="auto"
                            indicatorColor="primary"
                            textColor="primary"
                            value={tabInfo}
                            onChange={async (e, newValue) => {
                                if (tabInfo === TAB.REGISTER_TAB.CV && editable) {
                                    try {
                                        await schema.validate(employeeInfo, { abortEarly: false });
                                        setTabInfo(newValue);
                                    } catch (e) {
                                        submitRef.current.click();
                                    }
                                } else {
                                    setTabInfo(newValue);
                                }
                            }}
                            aria-label="Employee-Tab"
                        >
                            <Tab label="Đơn đăng ký" {...a11yProps(TAB.REGISTER_TAB.CV)} />
                            <Tab label="Sơ yếu lý lịch" {...a11yProps(TAB.REGISTER_TAB.INFO)} />
                            <Tab label="Bằng cấp" {...a11yProps(TAB.REGISTER_TAB.CERTIFICATE)} />
                        </Tabs>
                    </Grid>
                </DialogTitle>

                <DialogContent dividers className="bg-light-gray p-lg-40-sm-16">
                    <TabPanel value={tabInfo} index={TAB.REGISTER_TAB.CV}>
                        <CurriculumVitae
                            employeeInfo={employeeInfo}
                            handleRegisterChange={handleRegisterChange}
                            setEmployeeInfo={setEmployeeInfo}
                            submitRef={submitRef}
                            readOnly={!editable}
                            roleUser={roleUser}
                        />
                    </TabPanel>
                    <TabPanel value={tabInfo} index={TAB.REGISTER_TAB.INFO}>
                        <EmployeeInfomation employeeInfo={employeeInfo}></EmployeeInfomation>
                    </TabPanel>
                    <TabPanel value={tabInfo} index={TAB.REGISTER_TAB.CERTIFICATE}>
                        <EmployeeCertificate employeeInfo={employeeInfo}></EmployeeCertificate>
                    </TabPanel>
                </DialogContent>

                <DialogActions>
                    <ButtonControler
                        handleCancel={() => {
                            handleClose();
                        }}
                        handleSubmit={
                            editable
                                ? async () => {
                                      if (tabInfo === TAB.REGISTER_TAB.CV) {
                                          try {
                                              await schema.validate(employeeInfo, { abortEarly: false });
                                              handleFormSubmit();
                                          } catch (e) {
                                              submitRef.current.click();
                                          }
                                      } else {
                                          handleFormSubmit();
                                      }
                                  }
                                : null
                        }
                        handleSendLeader={
                            editable
                                ? async () => {
                                      if (tabInfo === TAB.REGISTER_TAB.CV) {
                                          try {
                                              await schema.validate(employeeInfo, { abortEarly: false });
                                              setNextStatus(STATUS_EMPLOYEE.PENDING);
                                              setOpenSubmissionDialog(true);
                                          } catch (e) {
                                              submitRef.current.click();
                                          }
                                      } else {
                                          setNextStatus(STATUS_EMPLOYEE.PENDING);
                                          setOpenSubmissionDialog(true);
                                      }
                                  }
                                : null
                        }
                        hanldeAdditionalRequested={
                            leaderApproved
                                ? () => {
                                      setNextStatus(STATUS_EMPLOYEE.ADDITIONAL_REQUESTED);
                                      setOpenSubmissionDialog(true);
                                  }
                                : null
                        }
                        hanldeApproved={
                            leaderApproved
                                ? () => {
                                      setNextStatus(STATUS_EMPLOYEE.APPROVED);
                                      setOpenSubmissionDialog(true);
                                  }
                                : null
                        }
                        hanldeReject={
                            leaderApproved
                                ? () => {
                                      setNextStatus(STATUS_EMPLOYEE.REJECT);
                                      setOpenSubmissionDialog(true);
                                  }
                                : null
                        }
                        handleSaveAndQuit={
                            saveAndQuit && roleUser
                                ? () => {
                                      setNextStatus(STATUS_EMPLOYEE.SAVE_AND_QUIT);
                                      setOpenSubmissionDialog(true);
                                  }
                                : null
                        }
                    />
                </DialogActions>
                {openSubmissionDialog && (
                    <SubmissionDialog
                        handleClose={() => setOpenSubmissionDialog(false)}
                        openDialog={openSubmissionDialog}
                        handleSubmit={handleSubmissionManager}
                        showLeader={!employeeInfo.leaderId}
                        nextStatus={nextStatus}
                        numberSaver={numberSaver}
                    />
                )}
            </Dialog>
        </>
    );
};

const mapStateToProps = (state) => ({
    certificates: state.certificates.employeeCertificates,
    relationsShip: state.relations.employeeRelations,
    experiences: state.experiences.employeeExps,
    employeeRegister: state.employees.employeeRegister,
    roles: state.user.roles,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeInfoDialog);
