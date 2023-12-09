// ** React imports
import React from 'react';

// ** Third party imports
import moment from 'moment';
import { Icon, IconButton, Typography } from '@material-ui/core';

// ** Custom components
import {
    LIST_POSITION,
    STATUS_PROMOTE,
    STATUS_PROMOTE_NAME,
    STATUS_PROPOSAL,
    STATUS_PROPOSAL_NAME,
    STATUS_SALARY,
    STATUS_SALARY_NAME,
    TYPE_PROPOSAL,
} from 'app/Utils/Constants';
import TruncateString from 'app/component/TruncateString';

const ColumnPendingRequest = ({ type, handleEdit }) => {
    const StatusChip = ({ status, rowStatus, constantStatus }) => {
        const { id: statusCode, name: statusName } = status.find((value) => value.id === +rowStatus);
        let statusStyle = { color: '#7467EF' };
        if (statusCode === constantStatus.PENDING) {
            statusStyle = { color: '#7467EF', fontWeight: 'bold' };
        } else if (statusCode === constantStatus.APPROVED) {
            statusStyle = { color: '#34c759', fontWeight: 'bold' };
        } else if (statusCode === constantStatus.ADDITIONAL_REQUESTED) {
            statusStyle = { color: '#ff9e43', fontWeight: 'bold' };
        } else if (statusCode === constantStatus.REJECT) {
            statusStyle = { color: '#f55555', fontWeight: 'bold' };
        }
        return <Typography style={statusStyle}>{statusName}</Typography>;
    };

    const commonColumns = [
        {
            title: 'Thao tác',
            field: 'custom',
            align: 'center',
            width: '10%',
            render: (rowData) => {
                if (
                    +rowData?.salaryIncreaseStatus === STATUS_SALARY.PENDING ||
                    +rowData?.proposalStatus === STATUS_PROPOSAL.PENDING ||
                    +rowData?.processStatus === STATUS_PROMOTE.PENDING
                ) {
                    return (
                        <IconButton
                            size="small"
                            onClick={() => {
                                handleEdit(rowData);
                            }}
                        >
                            <Icon color="primary">edit</Icon>
                        </IconButton>
                    );
                }
                return null;
            },
        },
        {
            title: 'Phiếu số',
            key: 'id',
            align: 'center',
            width: 60,
            render: (rowData) => rowData?.id,
        },
    ];

    switch (type) {
        case 'promote':
            return [
                ...commonColumns,
                {
                    title: 'Ngày thăng chức',
                    field: 'promotionDay',
                    align: 'center',
                    width: 120,
                    render: (rowData) => moment(rowData?.promotionDay).format('DD/MM/YYYY'),
                },
                {
                    title: 'Lần thứ',
                    field: 'times',
                    align: 'center',
                    width: 80,
                },
                {
                    title: 'Chức vụ cũ',
                    field: 'currentPosition',
                    align: 'center',
                    width: 150,
                    render: (rowData) => LIST_POSITION.find((value) => value.id === +rowData?.currentPosition)?.name,
                },
                {
                    title: 'Chức vụ mới',
                    field: 'newPosition',
                    align: 'center',
                    width: 150,
                    render: (rowData) => LIST_POSITION.find((value) => value.id === +rowData?.newPosition)?.name,
                },
                {
                    title: 'Ghi chú',
                    field: 'note',
                    align: 'center',
                    maxWidth: 200,
                    render: (rowData) => TruncateString(rowData?.note, 30),
                },
                {
                    title: 'Trạng thái',
                    field: 'status',
                    align: 'center',
                    width: 120,
                    render: (rowData) => (
                        <StatusChip
                            status={STATUS_PROMOTE_NAME}
                            rowStatus={rowData?.processStatus}
                            constantStatus={STATUS_PROMOTE}
                        />
                    ),
                },
            ];
        case 'proposal':
            return [
                ...commonColumns,
                {
                    title: 'Loại',
                    field: 'type',
                    align: 'center',
                    width: 100,
                    render: (rowData) => TYPE_PROPOSAL.find((value) => value.id === +rowData?.type)?.name,
                },
                {
                    title: 'Nội dung',
                    field: 'content',
                    align: 'center',
                    maxWidth: 200,
                    render: (rowData) => TruncateString(rowData?.content, 50),
                },
                {
                    title: 'Ghi chú',
                    field: 'note',
                    align: 'center',
                    maxWidth: 200,
                    render: (rowData) => TruncateString(rowData?.note, 50),
                },
                {
                    title: 'Ngày diễn biến',
                    field: 'proposalDate',
                    align: 'center',
                    width: 120,
                    render: (rowData) => moment(rowData?.proposalDate).format('DD/MM/YYYY'),
                },
                {
                    title: 'Trạng thái',
                    field: 'status',
                    align: 'center',
                    width: 100,
                    render: (rowData) => (
                        <StatusChip
                            status={STATUS_PROPOSAL_NAME}
                            rowStatus={rowData?.proposalStatus}
                            constantStatus={STATUS_PROPOSAL}
                        />
                    ),
                },
            ];
        case 'salary':
            return [
                ...commonColumns,
                {
                    title: 'Ngày tăng lương',
                    field: 'startDate',
                    align: 'center',
                    width: 120,
                    render: (rowData) => moment(rowData?.startDate).format('DD/MM/YYYY'),
                },
                {
                    title: 'Lần thứ',
                    field: 'times',
                    align: 'center',
                    width: 80,
                },
                {
                    title: 'Lương cũ',
                    field: 'oldSalary',
                    align: 'center',
                    width: 100,
                },
                {
                    title: 'Lương mới',
                    field: 'newSalary',
                    align: 'center',
                    width: 100,
                },
                {
                    title: 'Ghi chú',
                    field: 'note',
                    align: 'center',
                    maxWidth: 200,
                    render: (rowData) => TruncateString(rowData?.note, 50),
                },
                {
                    title: 'Lý do',
                    field: 'reason',
                    align: 'center',
                    maxWidth: 200,
                    render: (rowData) => TruncateString(rowData?.reason, 50),
                },
                {
                    title: 'Trạng thái',
                    field: 'status',
                    align: 'center',
                    width: 100,
                    render: (rowData) => (
                        <StatusChip
                            status={STATUS_SALARY_NAME}
                            rowStatus={rowData?.salaryIncreaseStatus}
                            constantStatus={STATUS_SALARY}
                        />
                    ),
                },
            ];
        default:
            return [];
    }
};
export default ColumnPendingRequest;
