// ** React imports
import React, { useState } from 'react';
import { connect } from 'react-redux';

// ** Third party imports
import { Grid, IconButton, Icon } from '@material-ui/core';
import DataTable from 'app/component/DataTable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmationDialog } from 'egret';
import moment from 'moment';

// ** Custom components
import CertificateForm from './CertificateForm';
import * as COLUMNS from 'app/component/Columns';
import TruncateString from 'app/component/TruncateString';

toast.configure({
    autoClose: 1500,
    draggable: false,
    limit: 3,
});

function EmployeeTabCertificate(props) {
    const { certificates, handleAddCertificate, handleDeleteCertificate, handleEditCertificate, viewReadOnly } = props;

    // States
    const [deleteCertificate, setDeleteCertificate] = useState();
    const [editCertificate, setEditCertificate] = useState({});
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    // Vars
    const dataTable = certificates?.map((value) => ({ ...value, tableData: { id: value.id } }));

    const handleDialogClose = () => {
        setOpenConfirmDialog(false);
    };
    const handleConfirmDeleteCertificate = () => {
        if (editCertificate.id === deleteCertificate.id) {
            setEditCertificate({});
        }
        handleDeleteCertificate(deleteCertificate);
        setOpenConfirmDialog(false);
    };

    const columns = [
        COLUMNS.action((rowData) => (
            <div>
                {!viewReadOnly && (
                    <IconButton
                        size="small"
                        onClick={() => {
                            setEditCertificate(rowData);
                        }}
                    >
                        <Icon fontSize="small" color="primary">
                            edit
                        </Icon>
                    </IconButton>
                )}
                {viewReadOnly && (
                    <IconButton
                        size="small"
                        onClick={() => {
                            setEditCertificate(rowData);
                        }}
                    >
                        <Icon color="secondary">visibility</Icon>
                    </IconButton>
                )}
                {!viewReadOnly && (
                    <IconButton
                        size="small"
                        onClick={() => {
                            setDeleteCertificate(rowData);
                            setOpenConfirmDialog(true);
                        }}
                    >
                        <Icon color="error">delete</Icon>
                    </IconButton>
                )}
            </div>
        )),
        COLUMNS.number((rowData) => rowData.tableData?.id + 1),
        COLUMNS.certificateName((rowData) => TruncateString(rowData.certificateName, 50)),
        COLUMNS.field((rowData) => TruncateString(rowData.field, 50)),
        COLUMNS.issueDate((rowData) => moment(rowData.issueDate).format('DD-MM-YYYY')),
        COLUMNS.content((rowData) => TruncateString(rowData.content, 100)),
    ];

    return (
        <Grid container spacing={1}>
            <Grid lg={12} md={12} sm={12} xs={12}>
                <CertificateForm
                    handleClose={() => {
                        setEditCertificate({});
                    }}
                    editCertificate={editCertificate}
                    handleAddCertificate={handleAddCertificate}
                    handleEditCertificate={handleEditCertificate}
                    viewReadOnly={viewReadOnly}
                />
            </Grid>
            <Grid lg={12} md={12} sm={12} xs={12}>
                {openConfirmDialog && (
                    <ConfirmationDialog
                        title={'Xóa chứng chỉ'}
                        open={openConfirmDialog}
                        onConfirmDialogClose={handleDialogClose}
                        onYesClick={handleConfirmDeleteCertificate}
                        text={'Bạn có đồng ý xóa chứng chỉ của nhân viên này không'}
                        Yes="Đồng ý"
                        No="Không"
                    />
                )}
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <DataTable columns={columns} data={dataTable} paging={false} disableToolbar={true} />
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(EmployeeTabCertificate);
