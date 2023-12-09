import React from 'react';
import { connect } from 'react-redux';

import { Grid, MenuItem, IconButton, Avatar, Button } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';

import TextFieldProps from 'app/component/TextFieldProps';
import { TEAM, GENDER, AVATAR_SIZE_LIMIT } from 'app/Utils/Constants';
import * as ValidateRules from 'app/component/ValidateRules';

import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

toast.configure({
    autoClose: 1500,
    draggable: false,
    limit: 3,
});

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17),
        margin: '0 auto',
    },
}));

function EmployeeTabInfo(props) {
    const { employeeInfo, handleChangeInfo, handleChangeInfoAvatar, viewReadOnly, submitRef } = props;
    const classes = useStyles();
    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file?.size < AVATAR_SIZE_LIMIT) {
                file.preview = URL.createObjectURL(file);
                handleChangeInfoAvatar('avatar', file);
            } else toast.warning('Dung lượng tối đa của ảnh là 5Mb');
        }
    };

    ValidatorForm.addValidationRule('afterDateOfBirth', (value) => {
        const { dateOfBirth } = employeeInfo;
        if (!dateOfBirth || !value) return true;
        return new Date(value) > new Date(dateOfBirth);
    });
    ValidatorForm.addValidationRule('matchVietnameseName', (value) => {
        return ValidateRules.vietnameseName(value);
    });
    ValidatorForm.addValidationRule('matchVietnameseWords', (value) => {
        return ValidateRules.wordsLength(value);
    });
    ValidatorForm.addValidationRule('stringLengthLimited50', (value) => {
        return ValidateRules.lengthLessThan50(value);
    });
    ValidatorForm.addValidationRule('stringLengthLimited100', (value) => {
        return ValidateRules.lengthLessThan100(value);
    });
    const onSubmit = (e) => {};
    const handleChange = (e) => {
        handleChangeInfo(e.target.name, e.target.value);
    };

    return (
        <ValidatorForm
            onSubmit={onSubmit}
            style={{
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                padding: 8,
            }}
        >
            <Grid className="pt-8" container spacing={1}>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                    <Avatar
                        className={classes.large}
                        alt="Avatar"
                        src={employeeInfo?.image}
                        variant="circular"
                    ></Avatar>
                    <div className="text-center">
                        <input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleChangeAvatar}
                            disabled={viewReadOnly}
                        />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <AddAPhotoIcon color="primary" />
                            </IconButton>
                        </label>
                    </div>
                </Grid>
                <Grid container spacing={1} item lg={10} md={10} sm={12} xs={12}>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <TextValidator
                            value={employeeInfo?.name || ''}
                            type="text"
                            name="name"
                            validators={[
                                'required',
                                'matchVietnameseName',
                                'matchVietnameseWords',
                                'stringLengthLimited50',
                            ]}
                            errorMessages={[
                                'Họ tên không được để trống',
                                'Đầy đủ họ tên và không được chứa số, kí tự đặc biệt',
                                'Có chứa từ không phải là Tiếng Việt',
                                'Không vượt quá 50 ký tự',
                            ]}
                            {...TextFieldProps({
                                title: 'Họ và tên nhân viên',
                                view: viewReadOnly,
                                handlechange: handleChange,
                            })}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <TextValidator
                            value={employeeInfo?.code}
                            type="text"
                            name="code"
                            validators={['required', `matchRegexp:^NV${moment().format('YY')}\\d{3}$`]}
                            errorMessages={[
                                'Mã không được để trống',
                                'Không đúng định dạng NV+ năm tham gia 2 chữ số + 3 ký tự bất kỳ',
                            ]}
                            {...TextFieldProps({
                                title: 'Mã nhân viên',
                                view: viewReadOnly,
                                handlechange: handleChange,
                            })}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <SelectValidator
                            value={employeeInfo?.team}
                            size="small"
                            name="team"
                            validators={['required']}
                            errorMessages={['Nhóm không được để trống']}
                            {...TextFieldProps({
                                title: 'Nhóm tham gia',
                                view: viewReadOnly,
                                handlechange: handleChange,
                            })}
                        >
                            {TEAM.map((value) => {
                                return (
                                    <MenuItem key={value.id} value={value.id}>
                                        {value.name}
                                    </MenuItem>
                                );
                            })}
                        </SelectValidator>
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <TextValidator
                            value={employeeInfo?.address || ''}
                            type="text"
                            name="address"
                            validators={['required', 'matchVietnameseWords', 'stringLengthLimited100']}
                            errorMessages={[
                                'Địa chỉ không được để trống',
                                'Có chứa từ không phải là Tiếng Việt',
                                'Không vượt quá 100 ký tự',
                            ]}
                            {...TextFieldProps({
                                title: 'Địa chỉ',
                                view: viewReadOnly,
                                handlechange: handleChange,
                            })}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <TextValidator
                            value={
                                employeeInfo?.dateOfBirth ? moment(employeeInfo?.dateOfBirth).format('YYYY-MM-DD') : ''
                            }
                            type="date"
                            name="dateOfBirth"
                            validators={['required']}
                            errorMessages={['Ngày tháng năm sinh không được để trống']}
                            {...TextFieldProps({
                                title: 'Sinh ngày',
                                view: viewReadOnly,
                                handlechange: handleChange,
                                maxDate: moment().format('YYYY-MM-DD'),
                            })}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <SelectValidator
                            value={employeeInfo?.gender}
                            size="small"
                            name="gender"
                            validators={['required']}
                            errorMessages={['Chưa chọn giới tính']}
                            {...TextFieldProps({
                                title: 'Giới tính',
                                view: viewReadOnly,
                                handlechange: handleChange,
                            })}
                        >
                            {GENDER.map((value) => {
                                return (
                                    <MenuItem key={value.id} value={value.id}>
                                        {value.name}
                                    </MenuItem>
                                );
                            })}
                        </SelectValidator>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <TextValidator
                            value={employeeInfo?.email}
                            type="text"
                            name="email"
                            validators={['required', 'isEmail', 'stringLengthLimited50']}
                            errorMessages={[
                                'Email không được để trống',
                                'Không đúng định dạng Email',
                                'Không vượt quá 50 ký tự',
                            ]}
                            {...TextFieldProps({
                                title: 'Email',
                                view: viewReadOnly,
                                handlechange: handleChange,
                            })}
                        />
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <TextValidator
                            value={employeeInfo?.phone}
                            type="text"
                            name="phone"
                            validators={['required', 'matchRegexp:^0[0-9]{9,10}$']}
                            errorMessages={['Số điện thoại không được để trống', 'Định dạng chưa đúng SĐT']}
                            {...TextFieldProps({
                                title: 'Số điện thoại',
                                view: viewReadOnly,
                                handlechange: handleChange,
                            })}
                        />
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                        <TextValidator
                            value={employeeInfo?.religion}
                            type="text"
                            name="religion"
                            validators={['required', 'stringLengthLimited50']}
                            errorMessages={['Dân tộc không được để trống', 'Không vượt quá 50 ký tự']}
                            {...TextFieldProps({
                                title: 'Dân tộc',
                                view: viewReadOnly,
                                handlechange: handleChange,
                            })}
                        />
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                        <TextValidator
                            value={employeeInfo?.ethnic}
                            type="text"
                            name="ethnic"
                            validators={['required', 'stringLengthLimited50']}
                            errorMessages={['Tôn giáo không được để trống', 'Không vượt quá 50 ký tự']}
                            {...TextFieldProps({
                                title: 'Tôn giáo',
                                view: viewReadOnly,
                                handlechange: handleChange,
                            })}
                        />
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <TextValidator
                            value={employeeInfo?.citizenIdentificationNumber}
                            type="text"
                            name="citizenIdentificationNumber"
                            validators={['required', 'matchRegexp:^(?:\\d{9}|\\d{12})$']}
                            errorMessages={['Số CCCD không được để trống', 'Số  CCCD chỉ có 9 hoặc 12 số']}
                            {...TextFieldProps({
                                title: 'Số CCCD',
                                view: viewReadOnly,
                                handlechange: handleChange,
                            })}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <TextValidator
                            value={
                                employeeInfo?.dateOfIssuanceCard
                                    ? moment(employeeInfo?.dateOfIssuanceCard).format('YYYY-MM-DD')
                                    : ''
                            }
                            type="date"
                            name="dateOfIssuanceCard"
                            validators={['required', 'afterDateOfBirth']}
                            errorMessages={[
                                'Ngày cấp CCCD không được để trống',
                                'Ngày cấp CCCD phải sau ngày tháng năm sinh',
                            ]}
                            {...TextFieldProps({
                                title: 'Ngày cấp',
                                view: viewReadOnly,
                                handlechange: handleChange,
                                maxDate: moment().format('YYYY-MM-DD'),
                            })}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <TextValidator
                            value={employeeInfo?.placeOfIssueCard}
                            type="text"
                            name="placeOfIssueCard"
                            validators={['required', 'stringLengthLimited50']}
                            errorMessages={['Nơi cấp CCCD không được để trống', 'Không vượt quá 50 ký tự']}
                            {...TextFieldProps({
                                title: 'Nơi cấp',
                                view: viewReadOnly,
                                handlechange: handleChange,
                            })}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Button variant="contained" type="submit" color="primary" style={{ display: 'none' }} ref={submitRef}>
                {'Đăng ký'}
            </Button>
        </ValidatorForm>
    );
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(EmployeeTabInfo);
