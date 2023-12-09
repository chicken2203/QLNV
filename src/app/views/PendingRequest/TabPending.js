// ** React imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Service imports
import { fetchAllEmployee } from 'app/views/Employee/store/employeeSlice';

//**  Custom components
import { STATUS_TABLE } from 'app/Utils/Constants';
import DataTable from 'app/component/DataTable';
import ColumnEmployee from 'app/component/ColumnEmployee';
import LetterDialog from 'app/component/Letters';
import EmployeeInfoDialog from 'app/component/Letters/EmployeeInfor';

function TabPending() {
    // ** States
    const [openLetterDialog, setOpenLetterDialog] = useState(false);
    const [openDialogEmployeeInfoDialog, setOpenViewInforDialog] = useState(false);
    const [reloadData, setReloadData] = useState(false);
    const [selectedData, setSelectedData] = useState({});

    // ** Vars
    const dispatch = useDispatch();
    const dataStatus = STATUS_TABLE.PENDING;
    const employees = useSelector((state) =>
        state.employees?.employeeData.map((employee) => ({
            ...employee,
            tableData: {
                id: employee.id,
            },
        })),
    );
    useEffect(() => {
        const searchObj = {
            pageIndex: 1,
            pageSize: 500,
            keyword: '',
            listStatus: dataStatus,
        };
        dispatch(fetchAllEmployee(searchObj));
    }, [dispatch, dataStatus, reloadData]);

    const handleConfirmResignation = (rowData) => {
        setOpenLetterDialog(true);
        setSelectedData(rowData);
    };

    const handleViewInforDialog = (rowData) => {
        setOpenViewInforDialog(true);
        setSelectedData(rowData);
    };
    const columns = ColumnEmployee({
        dataStatus: dataStatus,
        handleConfirmResignation: handleConfirmResignation,
        handleViewInforDialog: handleViewInforDialog,
    });

    return (
        <>
            <DataTable data={employees} columns={columns} title={'Danh sách chờ duyệt'} />
            {openLetterDialog && (
                <LetterDialog
                    show={openLetterDialog}
                    close={() => setOpenLetterDialog(false)}
                    selectedData={selectedData}
                    triggerReloadData={() => setReloadData(!reloadData)}
                    type={'resign'}
                />
            )}

            {openDialogEmployeeInfoDialog && (
                <EmployeeInfoDialog
                    open={openDialogEmployeeInfoDialog}
                    item={selectedData}
                    handleClose={() => setOpenViewInforDialog(false)}
                    viewOnly={true}
                    triggerReloadData={() => setReloadData(!reloadData)}
                />
            )}
        </>
    );
}

export default TabPending;
