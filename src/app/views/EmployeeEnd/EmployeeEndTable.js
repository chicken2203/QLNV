// ** React imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Custom components
import DataTable from 'app/component/DataTable';
import { STATUS_TABLE } from 'app/Utils/Constants';

// ** Service imports
import { fetchAllEmployee } from 'app/views/Employee/store/employeeSlice';
import ColumnEmployee from 'app/component/ColumnEmployee';
import EmployeeInfoDialog from 'app/component/Letters/EmployeeInfor';

function EmployeeEndTable() {
    // ** States
    const [openViewInforDialog, setOpenViewInforDialog] = useState(false);
    const [selectedData, setSelectedData] = useState({});

    // ** Vars
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees);
    const employeeData = employees?.employeeData.map((employee) => ({
        ...employee,
        tableData: {
            id: employee.id,
        },
    }));
    const dataStatus = STATUS_TABLE.REJECTED;

    useEffect(() => {
        const searchObj = {
            pageIndex: 1,
            pageSize: 500,
            keyword: '',
            listStatus: dataStatus,
        };
        dispatch(fetchAllEmployee(searchObj));
    }, [dataStatus, dispatch]);

    const handleViewInforDialog = (rowData) => {
        setOpenViewInforDialog(true);
        setSelectedData(rowData);
    };

    const columns = ColumnEmployee({ dataStatus: dataStatus, handleViewInforDialog: handleViewInforDialog });

    return (
        <div className="m-sm-30">
            <DataTable title={'Danh sách kết thúc'} data={employeeData} columns={columns} />
            {openViewInforDialog && (
                <EmployeeInfoDialog
                    open={openViewInforDialog}
                    item={selectedData}
                    handleClose={() => setOpenViewInforDialog(false)}
                    viewOnly={true}
                />
            )}
        </div>
    );
}

export default EmployeeEndTable;
