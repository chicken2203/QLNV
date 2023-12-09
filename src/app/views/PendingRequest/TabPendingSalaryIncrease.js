// ** React imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Third party imports
import DataTable from 'app/component/DataTable';

// ** Custom components
import LetterDialog from 'app/component/Letters';
import ColumnPendingRequest from 'app/component/ColumnPendingRequest';

// ** Service imports
import { getListIncreaseSalaryByLeader } from './store/salarySlice';

function TabPendingPromote() {
    // ** States
    const [openLetterDialog, setOpenLetterDialog] = useState(false);
    const [reloadData, setReloadData] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    // ** Vars
    const dispatch = useDispatch();
    const salaries = useSelector((state) => state.salaries);
    const salaryData = salaries?.data?.map((data) => ({
        ...data,
        tableData: {
            id: data?.id,
        },
    }));
    useEffect(() => {
        dispatch(getListIncreaseSalaryByLeader());
    }, [dispatch, reloadData]);

    const handleEdit = (rowData) => {
        setOpenLetterDialog(true);
        setSelectedData(rowData);
    };

    const columns = ColumnPendingRequest({ type: 'salary', handleEdit: handleEdit });

    return (
        <>
            <DataTable data={salaryData} columns={columns} title={'Danh sách chờ duyệt tăng lương'} />
            {openLetterDialog && (
                <LetterDialog
                    show={openLetterDialog}
                    close={() => setOpenLetterDialog(false)}
                    triggerReloadData={() => setReloadData(!reloadData)}
                    selectedData={selectedData}
                    type={'salary'}
                />
            )}
        </>
    );
}

export default TabPendingPromote;
