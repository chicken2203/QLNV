// ** React imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Third party imports
import DataTable from 'app/component/DataTable';

// ** Custom components
import ColumnPendingRequest from 'app/component/ColumnPendingRequest';
import LetterDialog from 'app/component/Letters';

// ** Service imports
import { getListPromotionByLeader } from './store/promotionSlice';

function TabPendingPromote() {
    // ** States
    const [openLetterDialog, setOpenLetterDialog] = useState(false);
    const [reloadData, setReloadData] = useState(false);
    const [selectedData, setSelectedData] = useState({});

    // ** Vars
    const dispatch = useDispatch();
    const promotions = useSelector((state) => state.promotions);
    const promotionData = promotions?.data?.map((data) => ({
        ...data,
        tableData: {
            id: data?.id,
        },
    }));
    useEffect(() => {
        dispatch(getListPromotionByLeader());
    }, [dispatch, reloadData]);

    const handleEdit = (rowData) => {
        setOpenLetterDialog(true);
        setSelectedData(rowData);
    };

    const columns = ColumnPendingRequest({ type: 'promote', handleEdit: handleEdit });

    return (
        <>
            <DataTable data={promotionData} columns={columns} title={'Danh sách chờ duyệt thăng chức'} />
            {openLetterDialog && (
                <LetterDialog
                    show={openLetterDialog}
                    close={() => setOpenLetterDialog(false)}
                    triggerReloadData={() => setReloadData(!reloadData)}
                    selectedData={selectedData}
                    type={'promote'}
                />
            )}
        </>
    );
}

export default TabPendingPromote;
