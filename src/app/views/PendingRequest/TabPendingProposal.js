// ** React imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Third party imports
import DataTable from 'app/component/DataTable';

// ** Custom components
import LetterDialog from 'app/component/Letters';
import ColumnPendingRequest from 'app/component/ColumnPendingRequest';

// ** Service imports
import { getListProposalByLeader } from './store/proposalSlice';

function TabPendingPromote() {
    // ** States
    const [openLetterDialog, setOpenLetterDialog] = useState(false);
    const [reloadData, setReloadData] = useState(false);
    const [selectedData, setSelectedData] = useState({});

    // ** Vars
    const dispatch = useDispatch();
    const proposals = useSelector((state) => state.proposals);
    const proposalData = proposals?.data?.map((data) => ({
        ...data,
        tableData: {
            id: data?.id,
        },
    }));

    useEffect(() => {
        dispatch(getListProposalByLeader());
    }, [dispatch, reloadData]);

    const handleEdit = (rowData) => {
        setOpenLetterDialog(true);
        setSelectedData(rowData);
    };

    const columns = ColumnPendingRequest({ type: 'proposal', handleEdit: handleEdit });

    return (
        <>
            <DataTable data={proposalData} columns={columns} title={'Danh sách chờ duyệt tham mưu'} />
            {openLetterDialog && (
                <LetterDialog
                    show={openLetterDialog}
                    close={() => setOpenLetterDialog(false)}
                    triggerReloadData={() => setReloadData(!reloadData)}
                    selectedData={selectedData}
                    type={'proposal'}
                />
            )}
        </>
    );
}

export default TabPendingPromote;
