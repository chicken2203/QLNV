// ** React imports
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, connect } from 'react-redux';

// ** Third party imports
import {
    Dialog,
    Grid,
    DialogActions,
    DialogTitle,
    DialogContent,
    IconButton,
    Icon,
    Tabs,
    Tab,
    Backdrop,
} from '@material-ui/core';
import * as Yup from 'yup';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ** Custom components
import TabPanel, { a11yProps } from 'app/component/TabPanel';
import StringDataHanldling from 'app/component/StringDataHanldling';
import * as ValidateRules from 'app/component/ValidateRules';
import EmployeeTabInfo from './components/EmployeeTabInfo';
import EmployeeTabCertificate from './components/EmployeeTabCertificate';
import EmployeeTabRelative from './components/EmployeeTabRelative';
import { VIEW_DETAILS_STATUSES, TAB } from 'app/Utils/Constants';
import ButtonControler from 'app/component/ButtonControler';

// ** Services imports
import { createEmployee, updateEmployee } from './store/employeeSlice';
import {
    fetchCertificateOfEmployee,
    createNewCertificate,
    editCertificateOfEmployee,
    deleteCertificateOfEmployee,
} from './store/certificateSlice';
import {
    fetchRelationOfEmployee,
    creatNewRelation,
    editRelationOfEmployee,
    deleteRelationOfEmployee,
} from './store/relationShipSlice';

toast.configure({
    autoClose: 1500,
    draggable: false,
    limit: 3,
});

function EmployeeEditorDialog(props) {
    const {
        item,
        handleClose,
        handleOpenEmployeeInfoDialog,
        handleSetupdateEmployee,
        employeeRegister,
        certificates,
        relationsShip,
    } = props;
    // States
    const [employeeInfo, setEmployeeInfo] = useState(item || {});
    const [showRegisterButton, setShowRegisterButton] = useState(false);
    const [hadChangeInfo, setHadChangeInfo] = useState(false);
    const [tabInfo, setTabInfo] = useState(TAB.EMPLOYEE_TAB.INFO);

    // Vars
    const dispatch = useDispatch();
    const submitRef = useRef();
    const viewReadOnly = VIEW_DETAILS_STATUSES.includes(employeeInfo.submitProfileStatus);

    const schema = Yup.object().shape({
        name: Yup.string()
            .required('Họ tên không được để trống')
            .test('matchVietnameseName', 'Đầy đủ họ tên và không được chứa số, kí tự đặc biệt', (value) => {
                return ValidateRules.vietnameseName(value);
            })
            .test('matchVietnameseWords', 'Có chứa từ không phải là Tiếng Việt', (value) => {
                return ValidateRules.wordsLength(value);
            })
            .test('stringLengthLimited50', 'Không vượt quá 50 ký tự', (value) => {
                return ValidateRules.lengthLessThan50(value);
            }),
        code: Yup.string()
            .required('Mã không được để trống')
            .matches(/^NV\d{2}\d{3}$/, {
                message:
                    'Invalid code format. It should be in the format "NVYYXXX" (YY: last 2 digits of the current year, XXX: 3 digits)',
            })
            .test('isValidYear', 'Invalid year in code', (value) => {
                const yearInCode = value.slice(2, 4);
                return Number(yearInCode) === Number(moment().format('YY'));
            }),
        team: Yup.number('Không đúng định dạng').required('Nhóm không được để trống'),
        address: Yup.string()
            .required('Địa chỉ không được để trống')
            .test('matchVietnameseWords', 'Có chứa từ không phải là Tiếng Việt', (value) => {
                return ValidateRules.wordsLength(value);
            })
            .test('stringLengthLimited100', 'Không vượt quá 100 ký tự', (value) => {
                return ValidateRules.lengthLessThan100(value);
            }),
        dateOfBirth: Yup.date()
            .required('Ngày tháng năm sinh không được để trống')
            .max(new Date(), 'Ngày tháng không hợp lệ'),
        gender: Yup.number('Không đúng định dạng').required('Chưa chọn giới tính'),
        email: Yup.string()
            .required('Email không được để trống')
            .email('Không đúng định dạng Email')
            .test('stringLengthLimited50', 'Không vượt quá 50 ký tự', (value) => {
                return ValidateRules.lengthLessThan50(value);
            }),
        phone: Yup.string()

            .required('Số điện thoại không được để trống')
            .matches(/^0\d{9,10}$/, {
                message: 'Định dạng chưa đúng SĐT',
            }),
        religion: Yup.string()
            .required('Dân tộc không được để trống')
            .test('stringLengthLimited50', 'Không vượt quá 50 ký tự', (value) => {
                return ValidateRules.lengthLessThan50(value);
            }),
        ethnic: Yup.string()
            .required('Tôn giáo không được để trống')
            .test('stringLengthLimited50', 'Không vượt quá 50 ký tự', (value) => {
                return ValidateRules.lengthLessThan50(value);
            }),
        citizenIdentificationNumber: Yup.string()

            .required('Số CCCD không được để trống')
            .matches(/^(?:\d{9}|\d{12})$/, 'Số  CCCD chỉ có 9 hoặc 12 số'),
        dateOfIssuanceCard: Yup.date('Không đúng định dạng')
            .required('Ngày cấp CCCD không được để trống')
            .test('dateOfIssuanceCard', 'Ngày cấp CCCD phải sau ngày tháng năm sinh', function (value) {
                const { dateOfBirth } = this.parent;
                if (!dateOfBirth || !value) return true;
                return new Date(value) > new Date(dateOfBirth);
            })
            .max(new Date(), 'Ngày tháng không hợp lệ'),
        placeOfIssueCard: Yup.string()
            .required('Nơi cấp CCCD không được để trống')
            .test('stringLengthLimited50', 'Không vượt quá 50 ký tự', (value) => {
                return ValidateRules.lengthLessThan50(value);
            }),
    });

    useEffect(() => {
        if (employeeRegister?.id) {
            const data = {
                ...employeeRegister,
                dateOfBirth: moment(employeeRegister.dateOfBirth).format('YYYY-MM-DD'),
                dateOfIssuanceCard: moment(employeeRegister.dateOfIssuanceCard).format('YYYY-MM-DD'),
            };
            setEmployeeInfo(data);
        }
    }, [employeeRegister]);
    useEffect(() => {
        employeeRegister.id && dispatch(fetchCertificateOfEmployee(employeeRegister.id));
        employeeRegister.id && dispatch(fetchRelationOfEmployee(employeeRegister.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeRegister]);
    useEffect(() => {
        setEmployeeInfo({ ...employeeInfo, certificatesDto: certificates });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [certificates]);
    useEffect(() => {
        setEmployeeInfo({ ...employeeInfo, employeeFamilyDtos: relationsShip });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [relationsShip]);

    const handleFormSubmit = () => {
        const data = employeeInfo;
        if (employeeInfo.id) {
            dispatch(updateEmployee(StringDataHanldling(data)));
        } else dispatch(createEmployee(StringDataHanldling(data)));
        handleSetupdateEmployee(StringDataHanldling(data));
        setShowRegisterButton(true);
    };
    const handleChangeInfo = (name, value) => {
        setEmployeeInfo({
            ...employeeInfo,
            [name]: value,
        });
        setShowRegisterButton(false);
        setHadChangeInfo(true);
    };
    const handleChangeInfoAvatar = (name, value) => {
        setEmployeeInfo({
            ...employeeInfo,
            image: value?.preview,
            [name]: value,
        });
        setHadChangeInfo(true);
        setShowRegisterButton(false);
    };

    const handleAddCertificate = (newCertificate) => {
        if (employeeInfo.id) {
            newCertificate = { ...newCertificate, employeeId: employeeInfo.id };
            dispatch(createNewCertificate(newCertificate));
        } else {
            setEmployeeInfo({
                ...employeeInfo,
                certificatesDto: employeeInfo.certificatesDto
                    ? [...employeeInfo.certificatesDto, newCertificate]
                    : [newCertificate],
            });
        }
        setHadChangeInfo(true);
        setShowRegisterButton(false);
    };
    const handleDeleteCertificate = (deleteCertificate) => {
        if (employeeInfo.id) {
            dispatch(deleteCertificateOfEmployee(deleteCertificate));
        } else {
            setEmployeeInfo({
                ...employeeInfo,
                certificatesDto: employeeInfo.certificatesDto.filter(
                    (value) => value.id !== deleteCertificate.id || value.tempId !== deleteCertificate.tempId,
                ),
            });
        }
        setHadChangeInfo(true);
        setShowRegisterButton(false);
    };
    const handleEditCertificate = (editedCertificate) => {
        if (employeeInfo.id) {
            dispatch(editCertificateOfEmployee(editedCertificate));
        } else {
            setEmployeeInfo({
                ...employeeInfo,
                certificatesDto: employeeInfo.certificatesDto.map((value) =>
                    value.id === editedCertificate.id && value.tempId === editedCertificate.tempId
                        ? { ...value, ...editedCertificate }
                        : value,
                ),
            });
        }
        setHadChangeInfo(true);
        setShowRegisterButton(false);
    };
    const handleAddRelationShip = (newRelationShip) => {
        if (employeeInfo.id) {
            newRelationShip = { ...newRelationShip, employeeId: employeeInfo.id };
            dispatch(creatNewRelation(newRelationShip));
        } else {
            setEmployeeInfo({
                ...employeeInfo,
                employeeFamilyDtos: employeeInfo.employeeFamilyDtos
                    ? [...employeeInfo.employeeFamilyDtos, newRelationShip]
                    : [newRelationShip],
            });
        }
        setHadChangeInfo(true);
        setShowRegisterButton(false);
    };
    const handleDeleteRelationShip = (deleteRelationShip) => {
        if (employeeInfo.id) {
            dispatch(deleteRelationOfEmployee(deleteRelationShip));
        } else {
            setEmployeeInfo({
                ...employeeInfo,
                employeeFamilyDtos: employeeInfo.employeeFamilyDtos.filter(
                    (value) => value.id !== deleteRelationShip.id || value.tempId !== deleteRelationShip.tempId,
                ),
            });
        }
        setHadChangeInfo(true);
        setShowRegisterButton(false);
    };
    const handleEditRelationShip = (editRelationShip) => {
        if (employeeInfo.id) {
            dispatch(editRelationOfEmployee(editRelationShip));
        } else {
            setEmployeeInfo({
                ...employeeInfo,
                employeeFamilyDtos: employeeInfo.employeeFamilyDtos.filter(
                    (value) => value.id !== editRelationShip.id || value.tempId !== editRelationShip.tempId,
                ),
            });
        }
        setEmployeeInfo({
            ...employeeInfo,
            employeeFamilyDtos: employeeInfo.employeeFamilyDtos.map((value) =>
                value.id === editRelationShip.id && value.tempId === editRelationShip.tempId
                    ? { ...value, ...editRelationShip }
                    : value,
            ),
        });
        setHadChangeInfo(true);
        setShowRegisterButton(false);
    };

    return (
        <Dialog
            open={props.open}
            maxWidth={'md'}
            fullWidth={true}
            closeAfterTransition
            onClose={handleClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <span className="mb-20 styleColor"> {'Thông tin nhân viên'} </span>
                <IconButton
                    style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
                    onClick={() => handleClose()}
                >
                    <Icon color="error" title={'Đóng'}>
                        close
                    </Icon>
                </IconButton>
            </DialogTitle>

            <DialogContent dividers className="pt-0">
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Tabs
                        variant="scrollable"
                        scrollButtons="auto"
                        indicatorColor="primary"
                        textColor="primary"
                        value={tabInfo}
                        onChange={async (e, newValue) => {
                            if (tabInfo === TAB.EMPLOYEE_TAB.INFO && !viewReadOnly) {
                                try {
                                    await schema.validate(employeeInfo, { abortEarly: false });
                                    setTabInfo(newValue);
                                } catch (e) {
                                    submitRef.current.click();
                                }
                            } else {
                                setTabInfo(newValue);
                            }
                        }}
                        aria-label="Employee-Tab"
                    >
                        <Tab label="Thông tin cơ bản" {...a11yProps(TAB.EMPLOYEE_TAB.INFO, 'simple')} />
                        <Tab label="Chứng chỉ" {...a11yProps(TAB.EMPLOYEE_TAB.CERTIFICATE, 'simple')} />
                        <Tab label="Quan hệ gia đình" {...a11yProps(TAB.EMPLOYEE_TAB.RELATIVE, 'simple')} />
                    </Tabs>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TabPanel value={tabInfo} index={TAB.EMPLOYEE_TAB.INFO}>
                        <EmployeeTabInfo
                            employeeInfo={employeeInfo}
                            handleFormSubmit={handleFormSubmit}
                            handleChangeInfo={handleChangeInfo}
                            handleChangeInfoAvatar={handleChangeInfoAvatar}
                            viewReadOnly={viewReadOnly}
                            submitRef={submitRef}
                            schema={schema}
                        ></EmployeeTabInfo>
                    </TabPanel>
                    <TabPanel value={tabInfo} index={TAB.EMPLOYEE_TAB.CERTIFICATE}>
                        <EmployeeTabCertificate
                            certificates={employeeInfo.certificatesDto || []}
                            handleAddCertificate={handleAddCertificate}
                            handleDeleteCertificate={handleDeleteCertificate}
                            handleEditCertificate={handleEditCertificate}
                            viewReadOnly={viewReadOnly}
                        ></EmployeeTabCertificate>
                    </TabPanel>
                    <TabPanel value={tabInfo} index={TAB.EMPLOYEE_TAB.RELATIVE}>
                        <EmployeeTabRelative
                            relationShip={employeeInfo.employeeFamilyDtos || []}
                            handleAddRelationShip={handleAddRelationShip}
                            handleDeleteRelationShip={handleDeleteRelationShip}
                            handleEditRelationShip={handleEditRelationShip}
                            viewReadOnly={viewReadOnly}
                        ></EmployeeTabRelative>
                    </TabPanel>
                </Grid>
            </DialogContent>

            <DialogActions>
                <ButtonControler
                    handleCancel={() => handleClose()}
                    handleSubmit={async () => {
                        if (tabInfo === TAB.EMPLOYEE_TAB.INFO) {
                            try {
                                await schema.validate(employeeInfo, { abortEarly: false });
                                handleFormSubmit();
                            } catch (e) {
                                submitRef.current.click();
                            }
                        } else {
                            handleFormSubmit();
                        }
                    }}
                    disabledHandleSubmit={showRegisterButton || viewReadOnly}
                    handleRegister={async () => {
                        if (tabInfo === TAB.EMPLOYEE_TAB.INFO) {
                            try {
                                await schema.validate(employeeInfo, { abortEarly: false });
                                hadChangeInfo && handleFormSubmit();
                                handleOpenEmployeeInfoDialog();
                            } catch (e) {
                                submitRef.current.click();
                            }
                        } else {
                            hadChangeInfo && handleFormSubmit();
                            handleOpenEmployeeInfoDialog();
                        }
                    }}
                    disabledHandleRegister={!employeeRegister.id || viewReadOnly}
                />
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = (state) => {
    return {
        certificates: state.certificates.employeeCertificates,
        relationsShip: state.relations.employeeRelations,
        employeeRegister: state.employees.employeeRegister,
    };
};

export default connect(mapStateToProps)(EmployeeEditorDialog);
