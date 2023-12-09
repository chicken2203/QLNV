// ** React imports
import React from 'react';

// ** Third party imports
import { Grid, TextField, Typography } from '@material-ui/core';
import moment from 'moment';

// ** Custom component
import { TYPE_PROPOSAL } from 'app/Utils/Constants';
import HeaderLetter from './components/HeaderLetter';
import SignLetter from './components/SignLetter';

function ProposalLetter({ selectedData, selectedEmployee }) {
    // ** Vars
    const proposalDate = new Date(selectedData.proposalDate);
    function getTypeName(type) {
        const typeObj = TYPE_PROPOSAL.find((obj) => obj.id === +type);
        return typeObj ? typeObj.name : '';
    }

    return (
        <Grid container className="letter-a4 font-family" spacing={3} style={{ padding: '30px' }}>
            <HeaderLetter dateLetter={proposalDate} />
            <Grid container className="mb-14">
                <Grid item xs={12}>
                    <div className="text-center mb-14 mt-14">
                        <Typography align="center" variant="h5">
                            {`ĐƠN XIN ${getTypeName(selectedData?.type).toUpperCase()}`}
                        </Typography>
                    </div>
                </Grid>
                <Grid container spacing={1} className="mb-14">
                    <Grid item xs={12}>
                        <Typography className="font-italic">
                            Kính gửi: Cơ quan cấp trên, lãnh đạo công ty OCEANTECH
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography className="font-italic">
                            Tôi tên là:{' '}
                            <span className="font-weight input-name-dotted">
                                <input
                                    readOnly
                                    type="text"
                                    value={selectedEmployee?.name || ''}
                                    className="inputName"
                                />
                            </span>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography className="font-italic">
                            Sinh ngày:{' '}
                            <span className="font-weight input-name-dotted">
                                <input
                                    type="text"
                                    value={moment(selectedEmployee?.dateOfBirth).format('DD/MM/YYYY') || ''}
                                />
                            </span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className="font-italic">
                            Tôi viết đơn này để đề xuất tham mưu về việc:{' '}
                            <span className="font-weight input-content-dotted">
                                <input type="text" name="content" value={selectedData?.content || ''} />
                            </span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Nội dụng:{' '}
                            <span>
                                <TextField
                                    type="text"
                                    name="reasonForEnding"
                                    value={selectedData?.note || ''}
                                    fullWidth
                                    validators={['required']}
                                    size="small"
                                    multiline
                                    className="textarea-dotted"
                                />
                            </span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className="font-italic">
                            Rất mong nhận được sự xem xét, quan tâm và giải quyết đề nghị trên của tôi.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className="font-italic">Xin trân trọng cảm ơn!</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="space-between">
                <SignLetter selectedEmployee={selectedEmployee} type="proposal" date={proposalDate} />
            </Grid>
        </Grid>
    );
}

export default ProposalLetter;
