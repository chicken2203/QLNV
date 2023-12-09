// ** React imports
import React from 'react';

// ** Third party imports
import { Grid, Typography } from '@material-ui/core';

// ** Custom component
import { LIST_POSITION } from 'app/Utils/Constants';
import HeaderLetter from './components/HeaderLetter';
import SignLetter from './components/SignLetter';

function PromoteLetter({ selectedData, selectedEmployee }) {
    // ** State
    const newPositionName = LIST_POSITION.find((pos) => pos.id === selectedData?.newPosition).name;
    const promotionDay = new Date(selectedData.promotionDay);
    const dateLetter = {
        date: promotionDay.getDate(),
        month: promotionDay.getMonth() + 1,
        year: promotionDay.getFullYear(),
    };

    return (
        <div className="font-family">
            <Grid container className="letter-a4" spacing={3} style={{ padding: '30px' }}>
                <HeaderLetter dateLetter={promotionDay} />
                <Grid container className="mb-14">
                    <Grid item xs={12}>
                        <div className="text-center mb-14 mt-14">
                            <Typography align="center" variant="h5">
                                QUYẾT ĐỊNH
                            </Typography>
                            <Typography className="font-weight" align="center">
                                Về việc bổ nhiệm cán bộ, công chức
                            </Typography>
                        </div>
                    </Grid>
                    <Grid container spacing={1} className="mb-14">
                        <Grid item xs={12}>
                            <Typography className="font-italic">
                                - Căn cứ vào quy định của Luật lao động về việc bổ nhiệm chức vụ cho nhân viên.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className="font-italic">
                                - Căn cứ vào hợp đồng lao động với nhân viên.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className="font-italic">
                                - Căn cứ vào năng lực, kinh nghiệm và đóng góp của nhân viên{' '}
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
                                <Typography align="left" variant="h5">
                                    QUYẾT ĐỊNH
                                </Typography>
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
                                        , chức vụ chính thức của Ông/Bà{' '}
                                        <span className="font-weight input-name-dotted">
                                            <input readOnly type="text" value={selectedEmployee?.name || ''} />
                                        </span>
                                        sẽ là:{' '}
                                        <>
                                            <span className="font-weight input-price-dotted">{newPositionName}</span>
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
                <Grid container spacing={2} justifyContent="space-between">
                    <SignLetter
                        selectedEmployee={selectedEmployee}
                        signRecipients={true}
                        type="promote"
                        date={promotionDay}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default PromoteLetter;
