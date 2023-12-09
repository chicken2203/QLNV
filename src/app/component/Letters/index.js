// ** React imports
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Third party imports
import {
    Backdrop,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Grid,
    Icon,
    IconButton,
    Tab,
    Tabs,
} from '@material-ui/core';
import 'app/assets/Button.scss';
import 'styles/views/_style.scss';
import 'app/assets/LetterStyle.scss';

// ** Custom components
import IncreaseSalaryLetter from './IncreaseSalaryLetter';
import EmployeeInfoDialog from './EmployeeInfor';
import PromoteLetter from './PromoteLetter';
import ProposalLetter from './ProposalLetter';
import ResignationLetter from './ResignationLetter';
import StringDataHanldling from '../StringDataHanldling';
import TabPanel, { a11yProps } from 'app/component/TabPanel';
import {
    TAB,
    STATUS_SALARY,
    STATUS_PROMOTE,
    STATUS_PROPOSAL,
    STATUS_LETTER,
    STATUS_EMPLOYEE,
} from 'app/Utils/Constants';
import ButtonControler from '../ButtonControler';
import SubmissionDialog from '../ActionDialogs/SubmissionDialog';
import SendLeaderDialog from '../ActionDialogs/SendLeaderDialog';
import moment from 'moment';

//  ** Service imports
import { updateEmployee, getEmployeeById } from 'app/views/Employee/store/employeeSlice';
import { getLeaderById } from 'app/views/Employee/store/leaderSlice';
import { updateIncreaseSalary } from 'app/views/PendingRequest/store/salarySlice';
import { updatePromotion } from 'app/views/PendingRequest/store/promotionSlice';
import { updateProposal } from 'app/views/PendingRequest/store/proposalSlice';

function LetterDialog({ show, close, selectedData, type, method, triggerReloadData, closeFatherDialog }) {
    // ** State
    const [tab, setTab] = useState(TAB.LETTER_TAB.SALARY);
    const [openInfoEmployeeDialog, setOpenInfoEmployeeDialog] = useState(false);
    const [openSendLeader, setOpenSendLeader] = useState(false);
    const [openSubmissionDialog, setOpenSubmissionDialog] = useState(false);
    const [nextStatus, setNextStatus] = useState(null);
    const [dataEmployee, setDataEmployee] = useState({
        ...selectedData,
        endDay: selectedData.endDay && moment(selectedData.endDay).format('YYYY-MM-DD'),
    });

    // ** Vars
    const dispatch = useDispatch();
    const selectedEmployee = useSelector((state) => state?.employees?.selectedEmployee);
    const selectedLeader = useSelector((state) => state.leaders?.selectedLeader);
    const submitRef = useRef();

    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (type === 'resign') {
            dispatch(getEmployeeById(selectedData?.id));
        } else {
            dispatch(getEmployeeById(selectedData?.employeeId));
        }
        dispatch(getLeaderById(selectedData?.leaderId));
    }, [dispatch, type, selectedData]);

    useEffect(() => {
        setDataEmployee({
            ...selectedData,
            endDay: selectedData.endDay && moment(selectedData.endDay).format('YYYY-MM-DD'),
        });
    }, [selectedData]);

    const handleChange = (e) => {
        setDataEmployee({
            ...dataEmployee,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmitForm = () => {
        setNextStatus(STATUS_EMPLOYEE.PENDING_ENDING);
        setOpenSubmissionDialog(true);
    };

    const handleSubmissionManager = async (formData) => {
        let newData = {};
        let dispatchFunction = null;

        switch (true) {
            case type === 'salary' && formData.nextStatus === STATUS_LETTER.PENDING + 10:
                newData = {
                    salaryIncreaseStatus: STATUS_LETTER.PENDING,
                    leaderId: formData.leaderId,
                };
                dispatchFunction = updateIncreaseSalary;
                break;
            case type === 'promote' && formData.nextStatus === STATUS_LETTER.PENDING + 10:
                newData = {
                    processStatus: STATUS_LETTER.PENDING,
                    leaderId: formData.leaderId,
                };
                dispatchFunction = updatePromotion;
                break;
            case type === 'proposal' && formData.nextStatus === STATUS_LETTER.PENDING + 10:
                newData = {
                    proposalStatus: STATUS_LETTER.PENDING,
                    leaderId: formData.leaderId,
                };
                dispatchFunction = updateProposal;
                break;
            case type === 'salary' && formData.nextStatus === STATUS_LETTER.APPROVED:
                newData = {
                    salaryIncreaseStatus: STATUS_SALARY.APPROVED,
                    acceptanceDate: formData.date,
                };
                dispatchFunction = updateIncreaseSalary;
                break;

            case type === 'promote' && formData.nextStatus === STATUS_LETTER.APPROVED:
                newData = {
                    processStatus: STATUS_PROMOTE.APPROVED,
                    acceptanceDate: formData.date,
                };
                dispatchFunction = updatePromotion;
                break;

            case type === 'proposal' && formData.nextStatus === STATUS_LETTER.APPROVED:
                newData = {
                    proposalStatus: STATUS_PROPOSAL.APPROVED,
                    acceptanceDate: formData.date,
                };
                dispatchFunction = updateProposal;
                break;

            case type === 'resign' && formData.nextStatus === STATUS_LETTER.APPROVED:
                newData = {
                    submitProfileStatus: STATUS_EMPLOYEE.APPROVED,
                    terminationAppointmentDate: formData.date,
                };
                dispatchFunction = updateEmployee;
                break;

            case type === 'salary' && formData.nextStatus === STATUS_LETTER.ADDITIONAL_REQUESTED:
                newData = {
                    salaryIncreaseStatus: STATUS_SALARY.ADDITIONAL_REQUESTED,
                    additionalRequest: formData.content,
                };
                dispatchFunction = updateIncreaseSalary;
                break;

            case type === 'promote' && formData.nextStatus === STATUS_LETTER.ADDITIONAL_REQUESTED:
                newData = {
                    processStatus: STATUS_PROMOTE.ADDITIONAL_REQUESTED,
                    additionalRequest: formData.content,
                };
                dispatchFunction = updatePromotion;
                break;

            case type === 'proposal' && formData.nextStatus === STATUS_LETTER.ADDITIONAL_REQUESTED:
                newData = {
                    proposalStatus: STATUS_PROPOSAL.ADDITIONAL_REQUESTED,
                    additionalRequest: formData.content,
                };
                dispatchFunction = updateProposal;
                break;

            case type === 'resign' && formData.nextStatus === STATUS_LETTER.ADDITIONAL_REQUESTED:
                newData = {
                    submitProfileStatus: STATUS_EMPLOYEE.ADDITIONAL_REQUESTED,
                    additionalRequest: formData.content,
                };
                dispatchFunction = updateEmployee;
                break;

            case type === 'salary' && formData.nextStatus === STATUS_LETTER.REJECT:
                newData = {
                    salaryIncreaseStatus: STATUS_SALARY.REJECT,
                    reasonForRefusal: formData.content,
                    rejectionDate: formData.date,
                };
                dispatchFunction = updateIncreaseSalary;
                break;

            case type === 'promote' && formData.nextStatus === STATUS_LETTER.REJECT:
                newData = {
                    processStatus: STATUS_PROMOTE.REJECT,
                    reasonForRefusal: formData.content,
                    rejectionDate: formData.date,
                };
                dispatchFunction = updatePromotion;
                break;

            case type === 'proposal' && formData.nextStatus === STATUS_LETTER.REJECT:
                newData = {
                    proposalStatus: STATUS_PROPOSAL.REJECT,
                    reasonForRefusal: formData.content,
                    rejectionDate: formData.date,
                };
                dispatchFunction = updateProposal;
                break;

            case type === 'resign' && formData.nextStatus === STATUS_LETTER.REJECT:
                newData = {
                    submitProfileStatus: STATUS_EMPLOYEE.REJECT,
                    reasonForRejection: formData.content,
                    rejectionDate: formData.date,
                };
                dispatchFunction = updateEmployee;
                break;
            case type === 'resign' && formData.nextStatus === STATUS_EMPLOYEE.PENDING_ENDING:
                newData = {
                    submitProfileStatus: STATUS_EMPLOYEE.PENDING_ENDING,
                    leaderId: formData.leaderId,
                    leaderName: formData.leaderName,
                    leaderPosition: formData.leaderPosition,
                };
                dispatchFunction = updateEmployee;
                closeFatherDialog && closeFatherDialog();
                break;
            default:
                setOpenSubmissionDialog(false);
                close();
                return;
        }

        await dispatch(dispatchFunction(StringDataHanldling({ ...dataEmployee, ...newData })));
        await setOpenSubmissionDialog(false);
        await close();
        await triggerReloadData();
    };
    return (
        <>
            <Dialog
                open={show}
                maxWidth={'md'}
                fullWidth={true}
                onClose={close}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <DialogTitle id="draggable-dialog-title" divider>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <span className="mb-20 styleColor">Biểu mẫu</span>
                        <IconButton
                            style={{ position: 'absolute', right: '10px', top: '10px' }}
                            onClick={() => close()}
                        >
                            <Icon color="error" title="close">
                                close
                            </Icon>
                        </IconButton>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Tabs
                            value={tab}
                            onChange={handleChangeTab}
                            className="mb-10"
                            variant="scrollable"
                            scrollButtons="auto"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            {type === 'salary' && (
                                <Tab label="Tăng lương" {...a11yProps(TAB.LETTER_TAB.SALARY, 'simple')} />
                            )}
                            {type === 'promote' && (
                                <Tab label="Thăng chức" {...a11yProps(TAB.LETTER_TAB.PROMOTE, 'simple')} />
                            )}
                            {type === 'proposal' && (
                                <Tab label="Đề xuất tham mưu" {...a11yProps(TAB.LETTER_TAB.PROPOSAL, 'simple')} />
                            )}
                            {type === 'resign' && (
                                <Tab label="Đơn xin nghỉ việc" {...a11yProps(TAB.LETTER_TAB.RESIGN, 'simple')} />
                            )}
                        </Tabs>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers className="bg-light-gray p-lg-40-sm-16">
                    {type === 'salary' && (
                        <TabPanel value={tab} index={TAB.LETTER_TAB.SALARY} tabClassName="simple-tab">
                            <IncreaseSalaryLetter
                                selectedData={selectedData}
                                selectedLeader={selectedLeader}
                                selectedEmployee={selectedEmployee}
                            />
                        </TabPanel>
                    )}
                    {type === 'promote' && (
                        <TabPanel value={tab} index={TAB.LETTER_TAB.PROMOTE} tabClassName="simple-tab">
                            <PromoteLetter
                                selectedData={selectedData}
                                selectedLeader={selectedLeader}
                                selectedEmployee={selectedEmployee}
                            />
                        </TabPanel>
                    )}
                    {type === 'proposal' && (
                        <TabPanel value={tab} index={TAB.LETTER_TAB.PROPOSAL} tabClassName="simple-tab">
                            <ProposalLetter
                                selectedData={selectedData}
                                selectedLeader={selectedLeader}
                                selectedEmployee={selectedEmployee}
                            />
                        </TabPanel>
                    )}
                    {type === 'resign' && (
                        <TabPanel value={tab} index={TAB.LETTER_TAB.RESIGN} tabClassName="simple-tab">
                            <ResignationLetter
                                selectedData={dataEmployee}
                                selectedLeader={selectedLeader}
                                handleChange={handleChange}
                                submitRef={submitRef}
                                handleSubmitForm={handleSubmitForm}
                            />
                        </TabPanel>
                    )}
                </DialogContent>
                <DialogActions>
                    <ButtonControler
                        handleCancel={() => close()}
                        handleSendLeader={
                            method === 'sendLeader'
                                ? () => {
                                      if (type === 'resign') {
                                          submitRef.current.click();
                                      } else {
                                          setNextStatus(STATUS_LETTER.PENDING + 10);
                                          setOpenSubmissionDialog(true);
                                      }
                                  }
                                : null
                        }
                        hanldeApproved={
                            !method
                                ? () => {
                                      setNextStatus(STATUS_LETTER.APPROVED);
                                      setOpenSubmissionDialog(true);
                                  }
                                : null
                        }
                        hanldeReject={
                            !method
                                ? () => {
                                      setNextStatus(STATUS_LETTER.REJECT);
                                      setOpenSubmissionDialog(true);
                                  }
                                : null
                        }
                        hanldeAdditionalRequested={
                            !method
                                ? () => {
                                      setNextStatus(STATUS_LETTER.ADDITIONAL_REQUESTED);
                                      setOpenSubmissionDialog(true);
                                  }
                                : null
                        }
                        handleWatchProfile={!method ? () => setOpenInfoEmployeeDialog(true) : null}
                    />
                </DialogActions>
            </Dialog>
            {openSubmissionDialog && (
                <SubmissionDialog
                    handleClose={() => setOpenSubmissionDialog(false)}
                    openDialog={openSubmissionDialog}
                    handleSubmit={handleSubmissionManager}
                    nextStatus={nextStatus}
                    showLeader={
                        nextStatus === STATUS_EMPLOYEE.PENDING_ENDING || nextStatus === STATUS_LETTER.PENDING + 10
                    }
                />
            )}

            {openInfoEmployeeDialog && (
                <EmployeeInfoDialog
                    open={openInfoEmployeeDialog}
                    item={selectedEmployee}
                    handleClose={() => setOpenInfoEmployeeDialog(false)}
                />
            )}
            {openSendLeader && (
                <SendLeaderDialog
                    show={openSendLeader}
                    close={() => setOpenSendLeader(false)}
                    letterClose={close}
                    triggerReloadData={triggerReloadData}
                    type={type}
                    employeeData={selectedEmployee}
                    selectedData={selectedData}
                />
            )}
        </>
    );
}

export default LetterDialog;
