// ** React imports
import React, { useEffect, useState } from 'react';

// ** Third party imports
import { Grid } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// ** Custom components
import TextFieldProps from 'app/component/TextFieldProps';
import StringDataHanldling from 'app/component/StringDataHanldling';
import ButtonControler from 'app/component/ButtonControler';
import * as ValidateRules from 'app/component/ValidateRules';

function CertificateForm(props) {
    const { handleClose, editCertificate, handleAddCertificate, handleEditCertificate, viewReadOnly } = props;
    const [currentCertificate, setCurrentCertificate] = useState({});
    useEffect(() => {
        setCurrentCertificate(editCertificate);
    }, [editCertificate]);
    const handleFormSubmit = () => {
        if (editCertificate.id || editCertificate.tempId) {
            handleEditCertificate(StringDataHanldling({ ...currentCertificate }));
        } else {
            handleAddCertificate(StringDataHanldling({ ...currentCertificate, tempId: uuidv4() }));
        }
        handleClose();
    };
    const handleChange = (event) => {
        setCurrentCertificate({
            ...currentCertificate,
            [event.target.name]: event.target.value,
        });
    };
    ValidatorForm.addValidationRule('matchVietnameseWords', (value) => {
        return ValidateRules.wordsLength(value);
    });
    ValidatorForm.addValidationRule('stringLengthLimited50', (value) => {
        return ValidateRules.lengthLessThan50(value);
    });
    ValidatorForm.addValidationRule('stringLengthLimited100', (value) => {
        return ValidateRules.lengthLessThan100(value);
    });
    ValidatorForm.addValidationRule('stringLengthLimited250', (value) => {
        return ValidateRules.lengthLessThan250(value);
    });
    return (
        <ValidatorForm
            onSubmit={handleFormSubmit}
            style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                padding: '4px',
            }}
        >
            <Grid container spacing={1} className="pt-10">
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextValidator
                        value={currentCertificate?.certificateName || ''}
                        type="text"
                        name="certificateName"
                        validators={['required', 'matchVietnameseWords', 'stringLengthLimited100']}
                        errorMessages={[
                            'Tên không được để trống',
                            'Có chứa từ không phải là Tiếng Việt',
                            'Không vượt quá 100 ký tự',
                        ]}
                        {...TextFieldProps({
                            title: 'Tên chứng chỉ',
                            view: viewReadOnly,
                            handlechange: handleChange,
                        })}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextValidator
                        value={
                            currentCertificate?.issueDate
                                ? moment(currentCertificate?.issueDate).format('YYYY-MM-DD')
                                : ''
                        }
                        type="date"
                        name="issueDate"
                        validators={['required']}
                        errorMessages={['Ngày có hiệu lực không được để trống']}
                        {...TextFieldProps({
                            title: 'Ngày có hiệu lực',
                            view: viewReadOnly,
                            handlechange: handleChange,
                            maxDate: moment().format('YYYY-MM-DD'),
                        })}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextValidator
                        value={currentCertificate?.field || ''}
                        type="text"
                        name="field"
                        validators={['required', 'matchVietnameseWords', 'stringLengthLimited50']}
                        errorMessages={[
                            'Xếp loại không được để trống',
                            'Có chứa từ không phải là Tiếng Việt',
                            'Không vượt quá 50 ký tự',
                        ]}
                        {...TextFieldProps({
                            title: 'Xếp loại',
                            view: viewReadOnly,
                            handlechange: handleChange,
                        })}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextValidator
                        value={currentCertificate?.content || ''}
                        type="text"
                        name="content"
                        validators={['required', 'matchVietnameseWords', 'stringLengthLimited250']}
                        errorMessages={[
                            'Nội dung không được để trống',
                            'Có chứa từ không phải là Tiếng Việt',
                            'Không vượt quá 250 ký tự',
                        ]}
                        {...TextFieldProps({
                            title: 'Nội dung chứng chỉ',
                            view: viewReadOnly,
                            handlechange: handleChange,
                        })}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <ButtonControler
                        handleCancel={() => setCurrentCertificate({})}
                        handleSubmit={() => {}}
                        disabledHandleSubmit={viewReadOnly}
                    />
                </Grid>
            </Grid>
        </ValidatorForm>
    );
}

export default CertificateForm;
