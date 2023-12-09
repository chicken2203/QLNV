// ** React imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Custom components
import DataTable from 'app/component/DataTable';

// ** Service imports
import { fetchAllEmployee } from 'app/views/Employee/store/employeeSlice';
import { STATUS_TABLE } from 'app/Utils/Constants';
import ColumnEmployee from 'app/component/ColumnEmployee';
import EmployeeInfoDialog from 'app/component/Letters/EmployeeInfor';

function ConfirmApprovalTable() {
    // ** States
    const [openEmployeeInfoDialog, setOpenEmployeeInfoDialog] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    // ** Vars
    const dataStatus = STATUS_TABLE.APPROVED;
    const dispatch = useDispatch();
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

    const handleViewInforDialog = (rowData) => {
        setOpenEmployeeInfoDialog(true);
        setSelectedData(rowData);
    };

    const columns = ColumnEmployee({ dataStatus: dataStatus, handleViewInforDialog: handleViewInforDialog });

    return (
        <div className="m-sm-30">
            <DataTable data={employees} columns={columns} title={'Danh sách đã duyệt'} />
            {openEmployeeInfoDialog && (
                <EmployeeInfoDialog
                    open={openEmployeeInfoDialog}
                    item={selectedData}
                    handleClose={() => setOpenEmployeeInfoDialog(false)}
                />
            )}
        </div>
    );
}

export default ConfirmApprovalTable;
