import { Grid, Typography } from '@material-ui/core';
import React from 'react';

const SignLetter = ({ selectedEmployee, signRecipients, date }) => {
    const lastWord = selectedEmployee?.name?.split(' ').pop();

    return (
        <>
            {signRecipients === true ? (
                <Grid item container xs={7} direction="column">
                    <p>Nơi nhận:</p>
                    <ul>
                        <li>
                            <p>Tổng Giám đốc</p>
                        </li>
                        <li>
                            <p>Như Điều 2</p>
                        </li>
                        <li>
                            <p>Lưu HS, HC</p>
                        </li>
                    </ul>
                </Grid>
            ) : (
                <Grid item container xs={7} direction="column"></Grid>
            )}

            <Grid item container xs={5} direction="column" alignItems="center">
                <Typography className="font-italic" align="right">
                    Hà Nội, {`ngày ${date?.getDate()} tháng ${date?.getMonth() + 1} năm ${date?.getFullYear()}`}
                </Typography>
                <p className="font-weight">Người làm đơn</p>
                (Ký, Họ và tên)
                <p className="font-weight mt-10">{lastWord}</p>
                <p className="font-weight mt-10">{selectedEmployee?.name}</p>
            </Grid>
        </>
    );
};

export default SignLetter;
