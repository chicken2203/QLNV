// ** React imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Custom components
import DataTable from 'app/component/DataTable';
import FormEventUpdate from './FormEventUpdate';
import { STATUS_TABLE } from 'app/Utils/Constants';
import EmployeeInfoDialog from 'app/component/Letters/EmployeeInfor';
import ColumnEmployee from 'app/component/ColumnEmployee';

// ** Service imports
import { fetchAllEmployee } from 'app/views/Employee/store/employeeSlice';

function EmployeeManagement() {
    // ** States
    const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
    const [openViewInforDialog, setOpenViewInforDialog] = useState(false);
    const [selectedData, setSelectedData] = useState({});

    // ** Vars
    const dispatch = useDispatch();
    const dataStatus = STATUS_TABLE.MANAGEMENT_EMPLOYEE;
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
    }, [dispatch, dataStatus]);

    const handleOpenDialogUpdate = (rowData) => {
        setOpenDialogUpdate(true);
        setSelectedData(rowData);
    };

    const handleViewInforDialog = (rowData) => {
        setOpenViewInforDialog(true);
        setSelectedData(rowData);
    };

    const columns = ColumnEmployee({
        dataStatus: dataStatus,
        handleOpenDialogUpdate: handleOpenDialogUpdate,
        handleViewInforDialog: handleViewInforDialog,
    });

    return (
        <div className="m-sm-30 ">
            <DataTable data={employees} columns={columns} title={'Quản lý nhân viên'} />
            {openDialogUpdate && (
                <FormEventUpdate
                    show={openDialogUpdate}
                    close={() => setOpenDialogUpdate(false)}
                    selectedData={selectedData}
                />
            )}
            {openViewInforDialog && (
                <EmployeeInfoDialog
                    open={openViewInforDialog}
                    item={selectedData}
                    handleClose={() => setOpenViewInforDialog(false)}
                />
            )}
        </div>
    );
}

export default EmployeeManagement;
