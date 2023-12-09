// ** React imports
import React from 'react';

// ** Third party imports
import { Grid, Typography } from '@material-ui/core';

// ** Custom components
import HeaderLetter from './components/HeaderLetter';
import SignLetter from './components/SignLetter';

function IncreaseSalaryLetter({ selectedData, selectedEmployee }) {
    const startDate = new Date(selectedData.startDate);
    const dateLetter = {
        date: startDate.getDate(),
        month: startDate.getMonth() + 1,
        year: startDate.getFullYear(),
    };
    return (
        <Grid container className="letter-a4 font-family" spacing={3} style={{ padding: '30px' }}>
            <HeaderLetter dateLetter={startDate} />
            <Grid container className="mb-14">
                <Grid item xs={12}>
                    <div className="text-center mb-14 mt-14">
                        <h3 className="font-weight">QUYẾT ĐỊNH</h3>
                        <h4 className="font-weight">Về việc tăng lương cho Nhân viên</h4>
                    </div>
                </Grid>
                <Grid container spacing={1} className="mb-14">
                    <Grid item xs={12}>
                        <Typography className="font-italic">
                            - Căn cứ Giấy chứng ĐKKD số 0106145319 ngày 08 tháng 04 năm 2013 của Công ty OCEANTECH
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className="font-italic">
                            - Căn cứ vào hợp đồng lao động với người lao động
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className="font-italic">
                            - Căn cứ những đóng góp thực tế của Ông/Bà{' '}
                            <span className="font-weight input-name-dotted">
                                <input readOnly type="text" value={selectedEmployee?.name || ''} />
                            </span>{' '}
                            đối với sự phát triển của Công ty OCEANTECH.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography className="font-italic">- Xét đề nghị của Trưởng phòng nhân sự.</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-14">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h4 className="font-weight">QUYẾT ĐỊNH</h4>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography component={'div'} variant="subtitle1">
                                <Typography>
                                    <span className="font-weight">Điều 1:</span> Kể từ ngày{' '}
                                    <span className="font-weight input-date-month-dotted">
                                        <input maxLength={2} name="date" value={dateLetter.date || ''} />
                                    </span>{' '}
                                    tháng{' '}
                                    <span className="font-weight input-date-month-dotted">
                                        <input maxLength={2} name="month" value={dateLetter.month || ''} />
                                    </span>{' '}
                                    năm{' '}
                                    <span className="font-weight input-year-dotted">
                                        <input maxLength={4} name="year" value={dateLetter.year || ''} />
                                    </span>
                                    , mức lương chính thức của Ông/Bà{' '}
                                    <span className="font-weight input-name-dotted">
                                        <input readOnly type="text" value={selectedEmployee?.name || ''} />
                                    </span>
                                    sẽ là:{' '}
                                    <>
                                        <span className="font-weight input-price-dotted">
                                            <input
                                                name="salary"
                                                value={selectedData?.newSalary?.toLocaleString() || ''}
                                            />
                                        </span>
                                        đồng
                                    </>
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component={'div'} variant="subtitle1">
                                <Typography>
                                    <span className="font-weight">Điều 2:</span> Các ông/bà Phòng Nhân sự, Phòng Tài
                                    chính Kế toán và Ông/Bà{' '}
                                    <span className="font-weight input-name-dotted">
                                        <input readOnly type="text" value={selectedEmployee?.name || ''} />
                                    </span>{' '}
                                    căn cứ quyết định thi hành.
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
                <SignLetter selectedEmployee={selectedEmployee} signRecipients={true} date={startDate} />
            </Grid>
        </Grid>
    );
}

export default IncreaseSalaryLetter;
