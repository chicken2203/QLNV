// ** React imports
import React, { useEffect } from 'react';

// ** Third party imports
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import moment from 'moment';
import 'app/assets/RegistForm.scss';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

//  ** Service imports
import { LIST_POSITION, ROLE } from 'app/Utils/Constants';
import SignLetter from './components/SignLetter';
import { useDispatch, connect } from 'react-redux';
import { getAllLeader } from 'app/views/Employee/store/leaderSlice';

const useStyles = makeStyles(() => ({
    gridContainer: {
        paddingBottom: '20% !important',
        '& .content': {
            fontSize: '1rem',
            '& .first-line': {
                fontWeight: 'bold',
            },
        },
    },
    name: {
        textTransform: 'uppercase',
    },

    borderBottom: {
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            left: '0',
            bottom: '5px',
            height: '1px',
            borderBottom: '1px dotted #000',
        },
    },

    formName: {
        padding: '30px 0',
    },
}));

function ResignationLetter({ selectedData, handleChange, roles, submitRef, handleSubmitForm }) {
    // ** Vars
    const dispatch = useDispatch();
    const classes = useStyles();
    const resignDate = new Date(selectedData?.endDay);
    const currentPosName = LIST_POSITION.find((pos) => pos.id === selectedData?.currentPosition)?.name;
    const roleUser = roles[0].id === ROLE.USER;

    useEffect(() => {
        dispatch(getAllLeader());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid
            className={`font-family resume-grid ${classes.gridContainer} letter-a4`}
            container
            spacing={4}
            style={{ padding: '30px' }}
        >
            <ValidatorForm onSubmit={handleSubmitForm}>
                <Grid item container>
                    <Grid item container xs>
                        <Grid item container direction="column" alignItems="center">
                            <Grid item>
                                <h4>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                            </Grid>
                            <Grid item>
                                <h5>Độc lập - Tự do - Hạnh phúc </h5>
                            </Grid>
                            <Grid item>
                                <h5>-------------------------------------</h5>
                            </Grid>
                        </Grid>
                        <Grid item container direction="column" alignItems="center" xs>
                            <Grid item className={classes.formName}>
                                <h4>ĐƠN XIN NGHỈ VIỆC</h4>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container spacing={4}>
                    <Grid item container spacing={4}>
                        <Grid container item xs={12} spacing={2} className="content">
                            <Grid item xs={12}>
                                <Typography className="font-italic">Kính gửi giám đốc công ty Oceantech : </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className="font-italic box-flex-center">
                                    Tôi tên là:{' '}
                                    <span className="font-weight input-fullwidth-dotted">
                                        <input readOnly type="text" value={selectedData?.name} />
                                    </span>
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography className="font-italic box-flex-center">
                                    Chức vụ:{' '}
                                    <span className="font-weight input-fullwidth-dotted">
                                        <input readOnly type="text" value={currentPosName} />
                                    </span>
                                </Typography>
                            </Grid>

                            <Grid item xs={12} container>
                                <Typography className="font-italic box-flex-center">
                                    Nay tôi làm đơn này, kính xin Ban Giám đốc cho tôi được thôi việc từ:
                                </Typography>
                                <span className="input-dotted">
                                    <TextValidator
                                        id="standard-basic"
                                        fullWidth
                                        value={selectedData?.endDay}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        InputProps={{
                                            readOnly: !roleUser,
                                            inputProps: {
                                                min: moment().format('YYYY-MM-DD'),
                                            },
                                        }}
                                        type="date"
                                        name="endDay"
                                        variant="standard"
                                        validators={['required']}
                                        errorMessages={['Không được để trống']}
                                        size="small"
                                    />
                                </span>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography>
                                    Lý do xin nghỉ việc:
                                    <span></span>
                                </Typography>
                                <TextValidator
                                    className="textarea-dotted"
                                    id="standard-basic"
                                    fullWidth
                                    value={selectedData.reasonForEnding || ''}
                                    onChange={(e) => handleChange(e)}
                                    InputProps={{
                                        readOnly: !roleUser,
                                    }}
                                    type="text"
                                    name="reasonForEnding"
                                    variant="standard"
                                    multiline
                                    validators={['required']}
                                    errorMessages={['Không được để trống']}
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography className="font-italic">
                                    Tôi xin cam đoan đã bàn giao công việc lại cho bộ phận có liên quan trước khi nghỉ
                                    việc.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className="font-italic">
                                    Rất mong Ban Giám đốc xem xét và chấp thuận cho tôi được phép thôi việc. Tôi xin
                                    chân thành cảm ơn.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="space-between">
                            <SignLetter
                                selectedEmployee={selectedData}
                                signRecipients={true}
                                type="resign"
                                date={selectedData ? resignDate : new Date()}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Button variant="contained" type="submit" color="primary" style={{ display: 'none' }} ref={submitRef}>
                    {'Đăng ký'}
                </Button>
            </ValidatorForm>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
    roles: state.user.roles,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResignationLetter);
