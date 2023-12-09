import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Grid, IconButton, Icon } from '@material-ui/core';
import DataTable from 'app/component/DataTable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmationDialog } from 'egret';
import RelativeForm from './RelativeForm';
import * as COLUMNS from 'app/component/Columns';
import TruncateString from 'app/component/TruncateString';
import { RELATIONSHIP } from 'app/Utils/Constants';
import moment from 'moment';
toast.configure({
    autoClose: 1500,
    draggable: false,
    limit: 3,
});

function EmployeeTabRelative(props) {
    const { relationShip, handleAddRelationShip, handleDeleteRelationShip, handleEditRelationShip, viewReadOnly } =
        props;

    const [editRelationShip, setEditRelationShip] = useState({});
    const [deleteRelationShip, setDeleteRelationShip] = useState({});
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const dataTable = relationShip?.map((value) => ({ ...value, tableData: { id: value.id } }));

    const handleDialogClose = () => {
        setOpenConfirmDialog(false);
    };
    const handleConfirmDeleteRelative = () => {
        if (editRelationShip.id === deleteRelationShip.id) {
            setEditRelationShip({});
        }
        handleDeleteRelationShip(deleteRelationShip);
        setOpenConfirmDialog(false);
    };

    const columns = [
        COLUMNS.action((rowData) => (
            <div>
                {!viewReadOnly && (
                    <IconButton
                        size="small"
                        onClick={() => {
                            setEditRelationShip(rowData);
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
                            setEditRelationShip(rowData);
                        }}
                    >
                        <Icon color="secondary">visibility</Icon>
                    </IconButton>
                )}
                {!viewReadOnly && (
                    <IconButton
                        size="small"
                        onClick={() => {
                            setDeleteRelationShip(rowData);
                            setOpenConfirmDialog(true);
                        }}
                    >
                        <Icon color="error">delete</Icon>
                    </IconButton>
                )}
            </div>
        )),
        COLUMNS.number((rowData) => rowData.tableData?.id + 1),
        COLUMNS.name(),
        COLUMNS.dateOfBirth((rowData) => moment(rowData.dateOfBirth).format('DD/MM/YYYY')),
        COLUMNS.relationShip((rowData) => RELATIONSHIP.find((value) => value.id === rowData.relationShip)?.name),
        COLUMNS.citizenIdentificationNumber(),
        COLUMNS.phoneNumber(),
        COLUMNS.email(),
        COLUMNS.address((rowData) => TruncateString(rowData.address, 100)),
    ];

    return (
        <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <RelativeForm
                    handleClose={() => {
                        setEditRelationShip({});
                    }}
                    editRelationShip={editRelationShip}
                    handleAddRelationShip={handleAddRelationShip}
                    handleEditRelationShip={handleEditRelationShip}
                    viewReadOnly={viewReadOnly}
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                {openConfirmDialog && (
                    <ConfirmationDialog
                        title={'Xóa mốí quan hệ'}
                        open={openConfirmDialog}
                        onConfirmDialogClose={handleDialogClose}
                        onYesClick={handleConfirmDeleteRelative}
                        text={'Bạn có đồng ý xóa mối quan hệ này của nhân viên không'}
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

export default connect(mapStateToProps)(EmployeeTabRelative);
