import { Grid, Typography } from '@material-ui/core';
import React from 'react';
const HeaderLetter = ({ dateLetter }) => {
    return (
        <Grid container spacing={2} className="mb-14" justifyContent="space-around">
            <Grid container item xs={5}>
                <div className="text-center">
                    <h4>CÔNG TY OCEANTECH</h4>
                    <h5>Số: 03/02-QĐ-TL</h5>
                </div>
            </Grid>

            <Grid container item xs={7}>
                <div className="text-center">
                    <h4>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                    <h5>Độc lập - Tự do - Hạnh phúc</h5>
                    <h5>___________________</h5>

                    <Typography className="font-italic" align="right">
                        Hà Nội,{' '}
                        {`ngày ${dateLetter.getDate()} tháng ${
                            dateLetter.getMonth() + 1
                        } năm ${dateLetter.getFullYear()}`}
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );
};

export default HeaderLetter;
