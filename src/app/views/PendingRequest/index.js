import { Paper, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import TabPanel, { a11yProps } from 'app/component/TabPanel';
import TabPending from './TabPending';
import TabPendingSalaryIncrease from './TabPendingSalaryIncrease';
import TabPendingPromote from './TabPendingPromote';
import TabPendingProposal from './TabPendingProposal';
import { TAB } from 'app/Utils/Constants';

function WaitApproval() {
    const [tab, setTab] = useState(TAB.LEADER_PENDING_TAB.PENDING);

    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div className="m-sm-30">
            <Paper>
                <Tabs
                    value={tab}
                    onChange={handleChangeTab}
                    className="mb-10"
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Chờ duyệt" {...a11yProps(TAB.LEADER_PENDING_TAB.PENDING, 'simple')} />
                    <Tab label="Chờ duyệt tăng lương" {...a11yProps(TAB.LEADER_PENDING_TAB.PENDING_SALARY, 'simple')} />
                    <Tab
                        label="Chờ duyệt thăng chức"
                        {...a11yProps(TAB.LEADER_PENDING_TAB.PENDING_PROMOTE, 'simple')}
                    />
                    <Tab
                        label="Chờ duyệt đề xuất tham mưu"
                        {...a11yProps(TAB.LEADER_PENDING_TAB.PENDING_PROPOSAL, 'simple')}
                    />
                </Tabs>
            </Paper>

            <TabPanel value={tab} index={TAB.LEADER_PENDING_TAB.PENDING} tabClassName="simple-tab">
                <TabPending />
            </TabPanel>
            <TabPanel value={tab} index={TAB.LEADER_PENDING_TAB.PENDING_SALARY} tabClassName="simple-tab">
                <TabPendingSalaryIncrease />
            </TabPanel>
            <TabPanel value={tab} index={TAB.LEADER_PENDING_TAB.PENDING_PROMOTE} tabClassName="simple-tab">
                <TabPendingPromote />
            </TabPanel>
            <TabPanel value={tab} index={TAB.LEADER_PENDING_TAB.PENDING_PROPOSAL} tabClassName="simple-tab">
                <TabPendingProposal />
            </TabPanel>
        </div>
    );
}
export default WaitApproval;
