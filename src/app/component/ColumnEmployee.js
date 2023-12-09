// ** React imports
import React from 'react';

// ** Third party imports
import moment from 'moment';
import { Avatar, Icon, IconButton, Tooltip, Typography } from '@material-ui/core';

// ** Custom components
import {
    EDIT_STATUS,
    GENDER,
    STATUS_EMPLOYEE,
    STATUS_EMPLOYEE_NAME,
    STATUS_TABLE,
    TEAM,
    VIEW_DETAILS_STATUSES,
    DELETE_STATUS,
} from 'app/Utils/Constants';
import TruncateString from './TruncateString';

const ColumnEmployee = ({
    dataStatus,
    handleViewInforDialog,
    handleOpenDialogUpdate,
    handleOpenDialogEmployee,
    handleDeleteEmployee,
    handleConfirmResignation,
}) => {
    const ActionButtons = ({ rowData, dataStatus }) => {
        switch (dataStatus) {
            case STATUS_TABLE.MANAGEMENT_EMPLOYEE:
                return (
                    <>
                        {+rowData.submitProfileStatus !== STATUS_EMPLOYEE.PENDING_ENDING && (
                            // +rowData.submitProfileStatus !== STATUS_EMPLOYEE.REJECT_ENDING &&
                            // +rowData.submitProfileStatus !== STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_ENDING && (
                            <IconButton size="small" onClick={() => handleOpenDialogUpdate(rowData)}>
                                <Icon color="primary">edit</Icon>
                            </IconButton>
                        )}
                        <IconButton size="small" onClick={() => handleViewInforDialog(rowData)}>
                            <Icon color="secondary">visibility</Icon>
                        </IconButton>
                    </>
                );
            case STATUS_TABLE.ADD_EMPLOYEE:
                return (
                    <>
                        {EDIT_STATUS.includes(rowData.submitProfileStatus) && (
                            <IconButton
                                size="small"
                                onClick={() => {
                                    handleOpenDialogEmployee(rowData);
                                }}
                            >
                                <Icon fontSize="small" color="primary">
                                    edit
                                </Icon>
                            </IconButton>
                        )}
                        {VIEW_DETAILS_STATUSES.includes(rowData.submitProfileStatus) && (
                            <IconButton
                                size="small"
                                onClick={() => {
                                    handleOpenDialogEmployee(rowData);
                                }}
                            >
                                <Icon color="secondary">visibility</Icon>
                            </IconButton>
                        )}
                        {DELETE_STATUS.includes(rowData.submitProfileStatus) && (
                            <IconButton
                                size="small"
                                onClick={() => {
                                    handleDeleteEmployee(rowData);
                                }}
                            >
                                <Icon color="error">delete</Icon>
                            </IconButton>
                        )}
                    </>
                );
            case STATUS_TABLE.REJECTED:
            case STATUS_TABLE.APPROVED:
                return (
                    <IconButton size="small" onClick={() => handleViewInforDialog(rowData)}>
                        <Icon color="primary">visibility</Icon>
                    </IconButton>
                );
            case STATUS_TABLE.PENDING:
                if (+rowData.submitProfileStatus === STATUS_EMPLOYEE.PENDING_ENDING) {
                    return (
                        <IconButton
                            onClick={() => {
                                handleConfirmResignation(rowData);
                            }}
                        >
                            <Icon color="primary">edit</Icon>
                        </IconButton>
                    );
                } else if (+rowData.submitProfileStatus === STATUS_EMPLOYEE.PENDING) {
                    return (
                        <IconButton
                            onClick={() => {
                                handleViewInforDialog(rowData);
                            }}
                        >
                            <Icon color="secondary">check</Icon>
                        </IconButton>
                    );
                } else {
                    return null;
                }
            default:
                return null;
        }
    };

    const RenderStatus = (rowData) => {
        const status = STATUS_EMPLOYEE_NAME.find((value) => value.id === +rowData.submitProfileStatus);
        const statusName = status.name;
        let statusStyle = { color: '#3f51b5', fontWeight: 'bold' };
        if (+rowData.submitProfileStatus === STATUS_EMPLOYEE.SAVE_AND_QUIT) {
            statusStyle = { color: '#3f51b5', fontWeight: 'bold' };
        } else if (+rowData.submitProfileStatus === STATUS_EMPLOYEE.ADD_NEW) {
            statusStyle = { color: '#FF993A', fontWeight: 'bold' };
        } else if (+rowData.submitProfileStatus === STATUS_EMPLOYEE.PENDING) {
            statusStyle = { color: '#ff7b00', fontWeight: 'bold' };
        } else if (+rowData.submitProfileStatus === STATUS_EMPLOYEE.APPROVED) {
            statusStyle = { color: '#4cd964', fontWeight: 'bold' };
        } else if (+rowData.submitProfileStatus === STATUS_EMPLOYEE.ADDITIONAL_REQUESTED) {
            statusStyle = { color: '#ffcc00', fontWeight: 'bold' };
        } else if (+rowData.submitProfileStatus === STATUS_EMPLOYEE.REJECT) {
            statusStyle = { color: '#f55555', fontWeight: 'bold' };
        } else if (+rowData.submitProfileStatus === STATUS_EMPLOYEE.PENDING_ENDING) {
            statusStyle = { color: '#4386FF', fontWeight: 'bold' };
        } else if (+rowData.submitProfileStatus === STATUS_EMPLOYEE.APPROVED_ENDING) {
            statusStyle = { color: '#4cd964', fontWeight: 'bold' };
        } else if (+rowData.submitProfileStatus === STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_ENDING) {
            statusStyle = { color: '#ffcc00', fontWeight: 'bold' };
        } else if (+rowData.submitProfileStatus === STATUS_EMPLOYEE.REJECT_ENDING) {
            statusStyle = { color: '#f55555', fontWeight: 'bold' };
        }
        return (
            <Tooltip title={rowData?.leaderName || ''}>
                <Typography style={statusStyle}>{statusName}</Typography>
            </Tooltip>
        );
    };

    const columns = [
        {
            title: 'Thao tác',
            field: 'custom',
            align: 'center',
            minWidth: 50,
            width: '10%',
            render: (rowData) => <ActionButtons rowData={rowData} dataStatus={dataStatus} />,
        },
        {
            field: 'image',
            title: 'Ảnh đại diện',
            align: 'center',
            minWidth: 50,
            render: (rowData) => {
                return (
                    <Avatar className="mx-auto">
                        {rowData?.image ? (
                            <img src={rowData?.image} alt={rowData?.name || ''} />
                        ) : (
                            rowData?.name.charAt(0).toUpperCase()
                        )}
                    </Avatar>
                );
            },
        },
        {
            title: 'Tên nhân viên',
            field: 'name',
            render: (rowData) => {
                return <div className="text-bold">{TruncateString(rowData?.name, 30) || ' '}</div>;
            },
        },
        {
            title: 'Mã nhân viên',
            field: 'code',
            align: 'center',
        },
        {
            title: 'Ngày sinh',
            field: 'dateOfBirth',
            align: 'center',
            minWidth: 100,
            maxWidth: 150,
            render: (rowdata) => moment(rowdata.dateOfBirth).format('DD/MM/YYYY'),
        },
        {
            title: 'Giới tính',
            field: 'gender',
            align: 'center',
            minWidth: 80,
            maxWidth: 120,
            render: (rowData) => GENDER.find((gender) => +rowData.gender === gender.id)?.name,
        },
        { title: 'Số điện thoại', field: 'phone', align: 'center', minWidth: 120, maxWidth: 150 },
        {
            title: 'Team',
            field: 'team',
            align: 'center',
            minWidth: 80,
            maxWidth: 120,
            render: (rowData) => TEAM.find((teamId) => +rowData.team === teamId.id)?.name,
        },
        {
            title: 'Địa chỉ',
            field: 'address',
            align: 'left',
            minWidth: 150,
            maxWidth: 200,
            render: (rowData) => TruncateString(rowData?.address, 30),
        },
        {
            title: 'Trạng thái',
            field: 'status',
            align: 'center',
            minWidth: 120,
            maxWidth: 200,
            render: RenderStatus,
        },
    ];
    return columns;
};
export default ColumnEmployee;
