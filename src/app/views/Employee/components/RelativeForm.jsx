import React, { useEffect, useState } from 'react';
import { Grid, MenuItem } from '@material-ui/core';
import { SelectValidator, TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import TextFieldProps from 'app/component/TextFieldProps';
import { GENDER, RELATIONSHIP } from 'app/Utils/Constants';
import * as ValidateRules from 'app/component/ValidateRules';
import StringDataHanldling from 'app/component/StringDataHanldling';
import ButtonControler from 'app/component/ButtonControler';

function CertificateForm(props) {
    const { handleClose, editRelationShip, handleAddRelationShip, handleEditRelationShip, viewReadOnly } = props;
    const [currentRelationShip, setCurrentRelationShip] = useState({ gender: '', relationShip: '' });

    useEffect(() => {
        setCurrentRelationShip(editRelationShip);
    }, [editRelationShip]);

    const handleFormSubmit = () => {
        if (editRelationShip.id || editRelationShip.tempId) {
            handleEditRelationShip(StringDataHanldling({ ...currentRelationShip }));
        } else {
            handleAddRelationShip(StringDataHanldling({ ...currentRelationShip, tempId: uuidv4() }));
        }
        handleClose();
    };
    const handleChangeRelation = (event) => {
        setCurrentRelationShip({
            ...currentRelationShip,
            [event.target.name]: event.target.value,
        });
    };
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

    return (
        <ValidatorForm
            onSubmit={handleFormSubmit}
            style={{
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                padding: 4,
            }}
        >
            <Grid container spacing={1} className="pt-10">
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextValidator
                        value={currentRelationShip?.name || ''}
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
                            title: 'Họ và tên',
                            view: viewReadOnly,
                            handlechange: handleChangeRelation,
                        })}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextValidator
                        value={
                            currentRelationShip?.dateOfBirth
                                ? moment(currentRelationShip?.dateOfBirth).format('YYYY-MM-DD')
                                : ''
                        }
                        type="date"
                        name="dateOfBirth"
                        validators={['required']}
                        errorMessages={['Ngày sinh không được để trống']}
                        {...TextFieldProps({
                            title: 'Sinh ngày',
                            view: viewReadOnly,
                            handlechange: handleChangeRelation,
                            maxDate: moment().format('YYYY-MM-DD'),
                        })}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <SelectValidator
                        value={currentRelationShip?.gender}
                        fullWidth={true}
                        name="gender"
                        validators={['required']}
                        errorMessages={['Chưa chọn giới tính']}
                        {...TextFieldProps({
                            title: 'Giới tính',
                            view: viewReadOnly,
                            handlechange: handleChangeRelation,
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

                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <SelectValidator
                        value={currentRelationShip?.relationShip}
                        fullWidth={true}
                        name="relationShip"
                        validators={['required']}
                        errorMessages={['Chưa chọn quan hệ']}
                        {...TextFieldProps({
                            title: 'Mối quan hệ gia đình',
                            view: viewReadOnly,
                            handlechange: handleChangeRelation,
                        })}
                    >
                        {RELATIONSHIP.map((value) => {
                            return (
                                <MenuItem key={value.id} value={value.id}>
                                    {value.name}
                                </MenuItem>
                            );
                        })}
                    </SelectValidator>
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextValidator
                        value={currentRelationShip?.citizenIdentificationNumber || ''}
                        type="text"
                        name="citizenIdentificationNumber"
                        validators={['required', 'matchRegexp:^(?:\\d{9}|\\d{12})$']}
                        errorMessages={['Số CCCD không được để trống', 'Số  CCCD chỉ có 9 hoặc 12 số']}
                        {...TextFieldProps({
                            title: 'Số CCCD',
                            view: viewReadOnly,
                            handlechange: handleChangeRelation,
                        })}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextValidator
                        value={currentRelationShip?.address || ''}
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
                            handlechange: handleChangeRelation,
                        })}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextValidator
                        value={currentRelationShip?.email || ''}
                        type="text"
                        name="email"
                        validators={['required', 'isEmail', 'stringLengthLimited50']}
                        errorMessages={['Email không được để trống', 'Email không đúng', 'Không vượt quá 50 ký tự']}
                        {...TextFieldProps({
                            title: 'Email',
                            view: viewReadOnly,
                            handlechange: handleChangeRelation,
                        })}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextValidator
                        value={currentRelationShip?.phoneNumber || ''}
                        type="text"
                        name="phoneNumber"
                        validators={['required', 'matchRegexp:^0[0-9]{9,10}$']}
                        errorMessages={['Số điện thoại không được để trống', 'Định dạng chưa đúng SĐT']}
                        {...TextFieldProps({
                            title: 'Số điện thoại',
                            view: viewReadOnly,
                            handlechange: handleChangeRelation,
                        })}
                    />
                </Grid>
                <Grid container spacing={1} className="flex-center m-0 p-0">
                    <ButtonControler
                        handleCancel={() => setCurrentRelationShip({})}
                        handleSubmit={() => {}}
                        disabledHandleSubmit={viewReadOnly}
                    />
                </Grid>
            </Grid>
        </ValidatorForm>
    );
}

export default CertificateForm;
