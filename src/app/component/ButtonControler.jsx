import React from 'react';
import { Grid, Button } from '@material-ui/core';

export default function ButtonControler(props) {
    const {
        handleCancel,
        handleSubmit,
        disabledHandleSubmit = false,
        handleRegister,
        disabledHandleRegister = false,
        handleSendLeader,
        hanldeAdditionalRequested,
        hanldeApproved,
        hanldeReject,
        handlePendingEnding,
        handleSaveAndQuit,
        handleWatchProfile,
    } = props;

    return (
        <Grid className="flex flex-center">
            {handleWatchProfile && (
                <Button onClick={handleWatchProfile} color="primary" variant="contained">
                    {' Xem hồ sơ'}
                </Button>
            )}
            {hanldeAdditionalRequested && (
                <Button className="ml-8" color="primary" variant="contained" onClick={hanldeAdditionalRequested}>
                    {'Yêu cầu bổ sung'}
                </Button>
            )}
            {hanldeApproved && (
                <Button className="ml-8" color="primary" variant="contained" onClick={hanldeApproved}>
                    {'Phê duyệt'}
                </Button>
            )}
            {hanldeReject && (
                <Button className="btn-secondary ml-8" variant="contained" onClick={hanldeReject}>
                    {'Từ chối'}
                </Button>
            )}
            {handleSaveAndQuit && (
                <Button className="ml-8" color="primary" variant="contained" onClick={handleSaveAndQuit}>
                    {'Kết thúc'}
                </Button>
            )}
            {handlePendingEnding && (
                <Button
                    className="ml-8 btn-secondary"
                    color="primary"
                    variant="contained"
                    onClick={handlePendingEnding}
                >
                    {'Yêu cầu kết thúc'}
                </Button>
            )}
            {handleSubmit && (
                <Button
                    className="ml-8"
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={disabledHandleSubmit}
                    onClick={handleSubmit}
                >
                    {'Lưu'}
                </Button>
            )}
            {handleRegister && (
                <Button
                    className="ml-8"
                    variant="contained"
                    color="primary"
                    disabled={disabledHandleRegister}
                    onClick={handleRegister}
                >
                    {'Đăng ký'}
                </Button>
            )}
            {handleSendLeader && (
                <Button className="ml-8" variant="contained" color="primary" onClick={handleSendLeader}>
                    {'Trình lãnh đạo'}
                </Button>
            )}
            {handleCancel && (
                <Button variant="contained" className="btn-cancel ml-8" onClick={handleCancel}>
                    {'Hủy'}
                </Button>
            )}
        </Grid>
    );
}
