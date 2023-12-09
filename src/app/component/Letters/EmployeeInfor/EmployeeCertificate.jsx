import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import * as COLUMNS from 'app/component/Columns';
import TruncateString from 'app/component/TruncateString';
import moment from 'moment';

export const EmployeeCertificate = (props) => {
    const { employeeInfo } = props;

    const dataTable = employeeInfo?.certificatesDto?.map((value, index) => ({
        ...value,
        tableData: { id: index },
    }));
    const columns = [
        COLUMNS.number((rowData) => rowData.tableData?.id + 1),
        COLUMNS.certificateName(),
        COLUMNS.field((rowData) => TruncateString(rowData.field, 50)),
        COLUMNS.issueDate((rowData) => moment(rowData.issueDate).format('DD-MM-YYYY')),
        COLUMNS.content((rowData) => TruncateString(rowData.content, 50)),
    ];
    return (
        <Grid item className="letter-a4">
            <Grid item container spacing={6} style={{ padding: '5%', margin: 0 }} lg={12} md={12} sm={12} xs={12}>
                <Grid item>
                    <h4 className="font-weight-bold text-center">VĂN BẰNG CHỨNG CHỈ LIÊN QUAN</h4>
                </Grid>
                <Grid item xs={12}>
                    <MaterialTable
                        title={'Bảng nhân viên'}
                        data={dataTable}
                        columns={columns}
                        options={{
                            draggable: false,
                            sorting: false,
                            selection: false,
                            actionsColumnIndex: -1,
                            paging: false,

                            maxBodyHeight: '1000px',
                            minBodyHeight: '55px',
                            headerStyle: {
                                border: '1px solid #333',
                                textAlign: 'center',
                                fontFamily: 'serif',
                            },
                            cellStyle: {
                                border: '1px solid #333',
                                fontFamily: 'serif',
                            },
                            padding: 'dense',
                            toolbar: false,
                        }}
                        localization={{
                            body: {
                                emptyDataSourceMessage: `Không có bản ghi`,
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCertificate);
