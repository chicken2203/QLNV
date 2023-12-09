// ** React imports
import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';

// ** Third party imports
import { Grid, IconButton, Icon, Button, TextField, InputAdornment } from '@material-ui/core';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'styles/views/_style.scss';
import 'app/assets/LetterStyle.scss';
import { Breadcrumb, ConfirmationDialog } from 'egret';

// ** Custom components
import DataTable from 'app/component/DataTable';
import ColumnEmployee from 'app/component/ColumnEmployee';
import EmployeeInfoDialog from 'app/component/Letters/EmployeeInfor';
import EmployeeEditorDialog from './EmployeeEditorDialog';
import { STATUS_TABLE } from 'app/Utils/Constants';

// ** Services imports
import { fetchAllEmployee, deleteEmployee, resetEmployeeRegister, getEmployeeById } from './store/employeeSlice';
import { resetCertificateOfEmployee } from './store/certificateSlice';
import { resetRelationOfEmployee } from './store/relationShipSlice';
import { resetExperienceOfEmployee } from './store/experienceSlice';

toast.configure({
    autoClose: 1500,
    draggable: false,
    limit: 3,
});

function Employee(props) {
    const { employeeData, employeeRegister, loading, loadingRegister } = props;
    const [search, setSearch] = useState('');
    const [openEditorDialog, setOpenEditorDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openEmployeeInfoDialog, setOpenEmployeeInfoDialog] = useState(false);
    const [updateEmployee, setupdateEmployee] = useState(null);
    const [delEmployee, setDelEmployee] = useState(null);
    const dispatch = useDispatch();
    const searchRef = useRef(null);

    const dataTable = employeeData?.map((value) => ({ ...value, tableData: { id: value.id } }));
    const dataStatus = STATUS_TABLE.ADD_EMPLOYEE;

    useEffect(() => {
        if (searchRef.current) {
            clearTimeout(searchRef.current);
        }
        searchRef.current = setTimeout(() => {
            const searchObj = {
                pageIndex: 1,
                pageSize: 500,
                keyword: search,
                listStatus: dataStatus,
            };
            dispatch(fetchAllEmployee(searchObj));
        }, 300);
    }, [dispatch, search, dataStatus]);

    useEffect(() => {
        if (!openEditorDialog && !openEmployeeInfoDialog) {
            dispatch(resetEmployeeRegister());
        }
    }, [dispatch, openEditorDialog, openEmployeeInfoDialog]);

    const handleDialogClose = () => {
        setupdateEmployee('');
        setOpenEditorDialog(false);
        setOpenConfirmDialog(false);
        dispatch(resetCertificateOfEmployee());
        dispatch(resetRelationOfEmployee());
        dispatch(resetExperienceOfEmployee());
    };
    const handleCloseEmployeeInfoDialog = () => {
        setOpenEmployeeInfoDialog(false);
        setOpenEditorDialog(true);
        dispatch(resetCertificateOfEmployee());
        dispatch(resetRelationOfEmployee());
        dispatch(resetExperienceOfEmployee());
    };
    const handleOpenEmployeeInfoDialog = () => {
        setOpenEmployeeInfoDialog(true);
        setOpenEditorDialog(false);
    };

    const handleDeleteEmployee = (rowData) => {
        setOpenConfirmDialog(true);
        setDelEmployee(rowData);
    };

    const handleConfirmResignation = () => {
        dispatch(deleteEmployee(delEmployee));
        setOpenConfirmDialog(false);
    };

    const handleSetupdateEmployee = (info) => {
        setupdateEmployee(info);
    };
    const handleOpenDialogEmployee = (rowData) => {
        const data = {
            ...rowData,
            dateOfBirth: moment(rowData.dateOfBirth).format('YYYY-MM-DD'),
            dateOfIssuanceCard: moment(rowData.dateOfIssuanceCard).format('YYYY-MM-DD'),
        };
        setupdateEmployee(data);
        dispatch(getEmployeeById(rowData.id));
        setOpenEditorDialog(true);
    };

    const columns = ColumnEmployee({
        dataStatus: dataStatus,
        handleOpenDialogEmployee: handleOpenDialogEmployee,
        handleSetupdateEmployee: handleSetupdateEmployee,
        handleDeleteEmployee: handleDeleteEmployee,
        handleConfirmResignation: handleConfirmResignation,
    });

    return (
        <div className="m-sm-30 mb-0">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[{ name: 'Quản lý', path: '/directory/apartment' }, { name: 'Nhân viên' }]}
                />
            </div>

            <Grid container spacing={3} justify="space-between">
                <Grid item xl={10} md={9} sm={8} xs={6}>
                    <Button
                        className="mb-16 align-bottom"
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            dispatch(resetEmployeeRegister());
                            setOpenEditorDialog(true);
                        }}
                    >
                        {'Thêm mới'}
                    </Button>
                </Grid>

                <Grid item xl={2} md={3} sm={4} xs={6} className="flex flex-end">
                    <TextField
                        className="mb-16 w-100"
                        placeholder={'Tìm kiếm...'}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        value={search}
                        type="text"
                        name="search"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        type="button"
                                        style={{ padding: '2px' }}
                                        aria-label="search"
                                        color="primary"
                                    >
                                        <Icon>search</Icon>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        type="button"
                                        style={{ cursor: 'pointer', padding: '2px' }}
                                        aria-label="close"
                                        onClick={() => {
                                            setSearch('');
                                        }}
                                    >
                                        <Icon title={'Đóng'}>close</Icon>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <DataTable columns={columns} data={dataTable} pageSize={10} disableToolbar={true} />
            </Grid>
            {openEditorDialog && (
                <EmployeeEditorDialog
                    handleClose={handleDialogClose}
                    open={openEditorDialog}
                    item={updateEmployee}
                    handleOpenEmployeeInfoDialog={handleOpenEmployeeInfoDialog}
                    handleSetupdateEmployee={handleSetupdateEmployee}
                    loading={loading}
                />
            )}
            {openEmployeeInfoDialog && !loadingRegister && (
                <EmployeeInfoDialog
                    handleClose={handleCloseEmployeeInfoDialog}
                    open={openEmployeeInfoDialog}
                    item={employeeRegister}
                    closeFatherDialog={() => {
                        setOpenEditorDialog(false);
                    }}
                />
            )}

            {openConfirmDialog && (
                <ConfirmationDialog
                    title={'Xóa người dùng'}
                    open={openConfirmDialog}
                    onConfirmDialogClose={handleDialogClose}
                    onYesClick={handleConfirmResignation}
                    text={'Bạn có đồng ý xóa người dùng này không'}
                    Yes="Đồng ý"
                    No="Không"
                />
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    employeeData: state.employees.employeeData,
    employeeRegister: state.employees.employeeRegister,
    loading: state.employees.selectedLoading,
    loadingRegister: state.employees.loading,
});

export default connect(mapStateToProps)(Employee);
