// ** React imports
import React from 'react';
import { connect } from 'react-redux';

// ** Third party imports
import { Grid, Avatar } from '@material-ui/core';
import MaterialTable from 'material-table';
import moment from 'moment';
import 'app/assets/LetterStyle.scss';

// ** Custom components
import { GENDER, RELATIONSHIP } from 'app/Utils/Constants';
import * as COLUMNS from 'app/component/Columns';
import TruncateString from 'app/component/TruncateString';

export const EmployeeInfomation = (props) => {
    const { employeeInfo } = props;

    const dataTable = employeeInfo?.employeeFamilyDtos?.map((value, index) => ({
        ...value,
        tableData: { id: index },
    }));
    const columns = [
        COLUMNS.number((rowData) => rowData.tableData?.id + 1),
        COLUMNS.relationShip((rowData) => RELATIONSHIP.find((value) => value.id === rowData.relationShip)?.name),
        COLUMNS.name(),
        COLUMNS.dateOfBirth((rowData) => moment(rowData.dateOfBirth).format('DD/MM/YYYY')),
        COLUMNS.citizenIdentificationNumber(),
        COLUMNS.address((rowData) => TruncateString(rowData.address, 35)),
    ];
    return (
        <Grid item className="letter-a4">
            <Grid item style={{ padding: '7%', margin: 0 }} lg={12} md={12} sm={12} xs={12}>
                <Grid item container spacing={5} style={{ margin: 0 }}>
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                        <Avatar
                            className="m-auto"
                            alt="Avatar"
                            src={employeeInfo?.image}
                            style={{ width: '100%', height: 'auto', maxHeight: '250px' }}
                            variant="square"
                        ></Avatar>
                    </Grid>
                    <Grid item lg={9} md={9} sm={9} xs={9}>
                        <h4 className="mx-auto font-weight-bold text-center">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                        <h5 className="mx-auto font-weight-bold text-center">Độc lập - Tự do - Hạnh phúc</h5>
                        <p className="mx-auto font-weight-bold text-center mb-48">--------------------------------</p>
                        <h3 className="mx-auto font-weight-bold text-center"> SƠ YẾU LÝ LỊCH</h3>
                        <h4 className="mx-auto font-weight-bold text-center"> Tự thuật</h4>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid item className="pt-16">
                        <h4 className="font-weight-bold">I. THÔNG TIN BẢN THÂN</h4>
                    </Grid>
                    <Grid item container spacing={1} style={{ margin: 0 }}>
                        <Grid item container lg={9} md={9} sm={9} xs={9}>
                            <span>{'1. Họ và tên (chữ in hoa): '}</span>
                            <span className="input-dotted">
                                <input type="text" value={employeeInfo?.name?.toUpperCase()} readOnly />
                            </span>
                        </Grid>
                        <Grid item container lg={3} md={3} sm={3} xs={3}>
                            <span>{'Giới tính:'}</span>
                            <span className="input-dotted">
                                <input
                                    type="text"
                                    value={GENDER.find((value) => value.id === employeeInfo.gender).name}
                                    readOnly
                                />
                            </span>
                        </Grid>
                        <Grid item container lg={6} md={6} sm={6} xs={6}>
                            <span>{'2. Sinh ngày: '}</span>
                            <span className="input-dotted">
                                <input
                                    type="text"
                                    value={moment(employeeInfo.dateOfBirth).format('DD/MM/YYYY')}
                                    readOnly
                                />
                            </span>
                        </Grid>
                        <Grid item container lg={6} md={6} sm={6} xs={6}>
                            <span>{'Nơi sinh: '}</span>
                            <span className="input-dotted">
                                <input type="text" value={TruncateString(employeeInfo.address, 35)} readOnly />
                            </span>
                        </Grid>
                        <Grid item container lg={12} md={12} sm={12} xs={12}>
                            <span>{'3. Nơi ở hiện nay: '}</span>
                            <span className="input-dotted">
                                <input type="text" value={TruncateString(employeeInfo.address, 80)} readOnly />
                            </span>
                        </Grid>
                        <Grid item container lg={6} md={6} sm={6} xs={6}>
                            <span>{'4. Điện thoại: '}</span>
                            <span className="input-dotted">
                                <input type="text" value={employeeInfo.phone} readOnly />
                            </span>
                        </Grid>
                        <Grid item container lg={6} md={6} sm={6} xs={6}>
                            <span>{'Email: '}</span>
                            <span className="input-dotted">
                                <input type="text" value={employeeInfo.email} readOnly />
                            </span>
                        </Grid>
                        <Grid item container lg={6} md={6} sm={6} xs={6}>
                            <span>{'5. Dân tộc: '}</span>
                            <span className="input-dotted">
                                <input type="text" value={employeeInfo.religion} readOnly />
                            </span>
                        </Grid>
                        <Grid item container lg={6} md={6} sm={6} xs={6}>
                            <span>{'Tôn giáo: '}</span>
                            <span className="input-dotted">
                                <input type="text" value={employeeInfo.ethnic} readOnly />
                            </span>
                        </Grid>
                        <Grid item container lg={6} md={6} sm={6} xs={6}>
                            <span>{' 6. Số CCCD: '}</span>
                            <span className="input-dotted">
                                <input type="text" value={employeeInfo.citizenIdentificationNumber} readOnly />
                            </span>
                        </Grid>
                        <Grid item container lg={6} md={6} sm={6} xs={6}>
                            <span>{'Ngày cấp: '}</span>
                            <span className="input-dotted">
                                <input
                                    type="text"
                                    value={moment(employeeInfo.dateOfIssuanceCard).format('DD/MM/YYYY')}
                                    readOnly
                                />
                            </span>
                        </Grid>
                        <Grid item container lg={12} md={12} sm={12} xs={12}>
                            <span>{'7. Nơi cấp: '}</span>
                            <span className="input-dotted">
                                <input type="text" value={TruncateString(employeeInfo.placeOfIssueCard, 80)} readOnly />
                            </span>
                        </Grid>
                    </Grid>
                    <Grid item className="pt-16">
                        <h4 className="font-weight-bold">II. QUAN HỆ GIA ĐÌNH</h4>
                        <Grid item xs={12}>
                            <MaterialTable
                                title={'Bảng nhân viên'}
                                data={dataTable}
                                columns={columns}
                                options={{
                                    draggable: false,
                                    selection: false,
                                    actionsColumnIndex: -1,
                                    paging: false,
                                    sorting: false,
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
                                    tableLayout: 'auto',
                                }}
                                localization={{
                                    body: {
                                        emptyDataSourceMessage: `Không có mối quan hệ gia đình`,
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className="mt-16">
                    <Grid item>
                        <h4 className="font-weight-bold text-center">LỜI CAM ĐOAN</h4>
                    </Grid>
                    <Grid item>
                        Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng sự thật, nếu có điều gì không đúng tôi chịu
                        trách nhiệm trước pháp luật về lời khai của mình.
                    </Grid>
                    <Grid item container className="text-align-right flex-end p-16">
                        <Grid item className="text-align-right">
                            <Grid item container className="text-center mb-8">
                                <span>{'Hà Nội,'}</span>
                                <span className="font-italic ml-8">{'ngày'}</span>
                                <span className="input-day-dotted font-italic">
                                    <input
                                        type="text"
                                        value={
                                            !employeeInfo.submitDay
                                                ? moment().format('DD')
                                                : moment(employeeInfo.submitDay).date()
                                        }
                                        readOnly
                                    />
                                </span>
                                <span className="font-italic">{'tháng '}</span>
                                <span className="input-day-dotted font-italic">
                                    <input
                                        type="text"
                                        value={
                                            !employeeInfo.submitDay
                                                ? moment().format('MM')
                                                : moment(employeeInfo.submitDay).month()
                                        }
                                        readOnly
                                    />
                                </span>
                                <span className="font-italic">{'năm '}</span>
                                <span className="input-day-dotted font-italic">
                                    <input
                                        type="text"
                                        value={
                                            !employeeInfo.submitDay
                                                ? moment().format('YYYY')
                                                : moment(employeeInfo.submitDay).year()
                                        }
                                        readOnly
                                    />
                                </span>
                            </Grid>
                            <h5 className="text-center font-weight-bold">Người khai</h5>
                            <p className="text-center font-italic"> (Ký, ghi rõ họ tên)</p>

                            <p className="text-center font-weight-bold mt-72">{employeeInfo?.name}</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeInfomation);
