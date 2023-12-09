// ** React imports
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// ** Third party imports
import {
    Backdrop,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Avatar,
    Icon,
    Tabs,
    Tab,
} from '@material-ui/core';
import moment from 'moment';
import TabPanel, { a11yProps } from 'app/component/TabPanel';
import 'styles/views/_style.scss';
import 'app/assets/Button.scss';

// ** Custom components
import { TAB, GENDER } from 'app/Utils/Constants';
import SalaryIncreaseRequest from './components/SalaryIncreaseRequest';
import PromoteRequest from './components/PromoteRequest';
import ProposalRequest from './components/ProposalRequest';
import EmployeeInfoDialog from 'app/component/Letters/EmployeeInfor';
import ButtonControler from 'app/component/ButtonControler';
import LetterDialog from 'app/component/Letters';

// ** Services imports
import { getAllLeader } from '../Employee/store/leaderSlice';

function FormEventUpdate({ show, close, selectedData }) {
    // States
    const [tab, setTab] = useState(TAB.EMPLOYEE_MANAGEMENT_TAB.SALARY);
    const [openLetterDialog, setOpenLetterDialog] = useState(false);
    const [openInfoEmployeeDialog, setOpenInfoEmployeeDialog] = useState(false);

    // Vars
    const dispatch = useDispatch();
    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        dispatch(getAllLeader());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedData]);

    return (
        <>
            <Dialog
                open={show}
                maxWidth={'lg'}
                fullWidth={true}
                onClose={close}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <DialogTitle>
                    <span className="mb-20 styleColor">Cập nhật diễn biến</span>
                    <IconButton
                        style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
                        onClick={close}
                    >
                        <Icon color="error" title={'Đóng'}>
                            close
                        </Icon>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item container sm={12} md={3}>
                            <Grid item md={12} sm={6}>
                                <Avatar
                                    className="m-auto "
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                    }}
                                >
                                    {selectedData.image ? (
                                        <img src={selectedData?.image} alt={selectedData?.name || ''} />
                                    ) : (
                                        selectedData.name.charAt(0).toUpperCase()
                                    )}
                                </Avatar>
                            </Grid>
                            <Grid item md={12} sm={6}>
                                <Grid item container spacing={1} style={{ padding: 0, marginTop: 30 }}>
                                    <Grid item xs={12} className="text-overflow-control">
                                        <h3>{selectedData?.name}</h3>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Icon>wc</Icon>
                                    </Grid>
                                    <Grid item xs={10} className="my-auto text-overflow-control">
                                        {GENDER.map((value) => (value.id === selectedData?.gender ? value.name : ''))}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Icon>cake</Icon>
                                    </Grid>
                                    <Grid item xs={10} className="my-auto text-overflow-control">
                                        {moment(selectedData?.dateOfBirth).format('DD/MM/YYYY')}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Icon>email</Icon>
                                    </Grid>
                                    <Grid item xs={10} className="my-auto text-overflow-control">
                                        {selectedData?.email}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Icon>phone</Icon>
                                    </Grid>
                                    <Grid item xs={10} className="my-auto text-overflow-control">
                                        {selectedData?.phone}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Icon>home</Icon>
                                    </Grid>
                                    <Grid item xs={10} className="my-auto text-overflow-control">
                                        {selectedData?.address}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={12} md={9}>
                            <Tabs
                                value={tab}
                                onChange={handleChangeTab}
                                className="mb-10"
                                variant="scrollable"
                                scrollButtons="auto"
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab
                                    label="Yêu cầu tăng lương"
                                    {...a11yProps(TAB.EMPLOYEE_MANAGEMENT_TAB.SALARY, 'simple')}
                                />
                                <Tab
                                    label="Yêu cầu thăng chức"
                                    {...a11yProps(TAB.EMPLOYEE_MANAGEMENT_TAB.PROMOTE, 'simple')}
                                />
                                <Tab
                                    label="Yêu cầu đề xuất tham mưu"
                                    {...a11yProps(TAB.EMPLOYEE_MANAGEMENT_TAB.PROPOSAL, 'simple')}
                                />
                            </Tabs>
                            <TabPanel value={tab} index={TAB.EMPLOYEE_MANAGEMENT_TAB.SALARY} tabClassName="simple-tab">
                                <SalaryIncreaseRequest employeeData={selectedData} />
                            </TabPanel>
                            <TabPanel value={tab} index={TAB.EMPLOYEE_MANAGEMENT_TAB.PROMOTE} tabClassName="simple-tab">
                                <PromoteRequest employeeData={selectedData} />
                            </TabPanel>
                            <TabPanel
                                value={tab}
                                index={TAB.EMPLOYEE_MANAGEMENT_TAB.PROPOSAL}
                                tabClassName="simple-tab"
                            >
                                <ProposalRequest employeeData={selectedData} />
                            </TabPanel>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ButtonControler
                        handleCancel={() => close()}
                        handlePendingEnding={() => setOpenLetterDialog(true)}
                        handleWatchProfile={() => setOpenInfoEmployeeDialog(true)}
                    />
                </DialogActions>
            </Dialog>

            {openLetterDialog && (
                <LetterDialog
                    show={openLetterDialog}
                    close={() => setOpenLetterDialog(false)}
                    selectedData={selectedData}
                    triggerReloadData={() => {}}
                    type={'resign'}
                    method={'sendLeader'}
                    closeFatherDialog={() => close()}
                />
            )}
            {openInfoEmployeeDialog && (
                <EmployeeInfoDialog
                    open={openInfoEmployeeDialog}
                    item={selectedData}
                    handleClose={() => setOpenInfoEmployeeDialog(false)}
                />
            )}
        </>
    );
}

export default FormEventUpdate;
