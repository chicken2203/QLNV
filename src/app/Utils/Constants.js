export const STATUS_EMPLOYEE_NAME = [
    { id: 0, name: 'Nộp lưu hồ sơ', content: 'Nộp lưu hồ sơ' },
    { id: 1, name: 'Thêm mới', content: 'Thêm mới' },
    { id: 2, name: 'Chờ được xác nhận thêm mới', content: 'Trình lãnh đạo' },
    { id: 3, name: 'Đã được chấp nhận', content: 'Phê duyệt' },
    { id: 4, name: 'Yêu cầu bổ xung', content: 'Yêu cầu bổ xung' },
    { id: 5, name: 'Từ chối', content: 'Từ chối' },
    { id: 6, name: 'Gửi yêu cầu kết thúc hồ sơ', content: 'yêu cầu kết thúc hồ sơ' },
    { id: 7, name: 'Chấp nhận kết thúc hồ sơ', content: 'Chấp nhận kết thúc hồ sơ' },
    { id: 8, name: 'Yêu cầu bổ xung kết thúc hồ sơ', content: 'Yêu cầu bổ xung kết thúc hồ sơ' },
    { id: 9, name: 'Từ chối kết thúc hồ sơ', content: 'Từ chối kết thúc hồ sơ' },
];

export const STATUS_EMPLOYEE = {
    SAVE_AND_QUIT: 0,
    ADD_NEW: 1,
    PENDING: 2,
    APPROVED: 3,
    ADDITIONAL_REQUESTED: 4,
    REJECT: 5,
    PENDING_ENDING: 6,
    APPROVED_ENDING: 7,
    ADDITIONAL_REQUESTED_ENDING: 8,
    REJECT_ENDING: 9,
};

export const STATUS_SALARY = {
    ADD_NEW: 1,
    PENDING: 2,
    APPROVED: 3,
    ADDITIONAL_REQUESTED: 4,
    REJECT: 5,
};

export const STATUS_SALARY_NAME = [
    { id: 1, name: 'Tạo mới' },
    { id: 2, name: 'Chờ duyệt' },
    { id: 3, name: 'Đã duyệt' },
    { id: 4, name: 'Yêu cầu bổ xung' },
    { id: 5, name: 'Đã từ chối' },
];

export const STATUS_PROMOTE = {
    ADD_NEW: 1,
    PENDING: 2,
    APPROVED: 3,
    ADDITIONAL_REQUESTED: 4,
    REJECT: 5,
};

export const STATUS_PROMOTE_NAME = [
    { id: 1, name: 'Tạo mới' },
    { id: 2, name: 'Chờ duyệt' },
    { id: 3, name: 'Đã duyệt' },
    { id: 4, name: 'Yêu cầu bổ xung' },
    { id: 5, name: 'Đã từ chối' },
];

export const STATUS_PROPOSAL = {
    ADD_NEW: 1,
    PENDING: 2,
    APPROVED: 3,
    ADDITIONAL_REQUESTED: 4,
    REJECT: 5,
};

export const STATUS_PROPOSAL_NAME = [
    { id: 1, name: 'Tạo mới' },
    { id: 2, name: 'Chờ duyệt' },
    { id: 3, name: 'Đã duyệt' },
    { id: 4, name: 'Yêu cầu bổ xung' },
    { id: 5, name: 'Đã từ chối' },
];

export const STATUS_LETTER = {
    ADD_NEW: 1,
    PENDING: 2,
    APPROVED: 3,
    ADDITIONAL_REQUESTED: 4,
    REJECT: 5,
};

export const DELETE_STATUS = ['1'];
export const EDIT_STATUS = ['1', '4', '5'];
export const VIEW_DETAILS_STATUSES = ['2', '3'];
export const WAIT_LEADER_APPROVED = ['2'];

export const SHOW_DATE = [2, 3, 5, 7, 9, 0];
export const SHOW_CONTENT = [2, 4, 5, 8, 9];

export const STATUS_TABLE = {
    MANAGEMENT_EMPLOYEE: '3,6,8,9',
    ADD_EMPLOYEE: '1,2,4,5',
    PENDING: '2,6',
    APPROVED: '3,7',
    REJECTED: '7,0',
};

export const ROLE = {
    ADMIN: 3,
    USER: 4,
    MANAGE: 5,
};

export const GENDER = [
    { id: 0, name: 'Nam' },
    { id: 1, name: 'Nữ' },
    { id: 2, name: 'Không xác định' },
];

export const RELATIONSHIP = [
    { id: 0, name: 'Bố' },
    { id: 1, name: 'Mẹ' },
    { id: 2, name: 'Anh/chị' },
    { id: 3, name: 'Em' },
    { id: 4, name: 'Vợ/chồng' },
    { id: 5, name: 'Con cái' },
];

export const TEAM = [
    { id: 1, name: 'Front-end Developer' },
    { id: 2, name: 'Back-end Developer' },
    { id: 3, name: 'Tester' },
];

export const LIST_POSITION = [
    { id: 1, name: 'Tổng giám đốc điều hành' },
    { id: 2, name: 'Giám đốc điều hành' },
    { id: 3, name: 'Giám đốc tài chính' },
    { id: 4, name: 'Giám đốc tiếp thị' },
    { id: 5, name: 'Giám đốc nhân sự' },
    { id: 6, name: 'Nhân viên thu nợ' },
];

export const TYPE_PROPOSAL = [
    { id: 1, name: 'Đề xuất' },
    { id: 2, name: 'Tiến cử' },
    { id: 3, name: 'Tham mưu' },
];

export const EXPERIENCE_EMPLOYEE = {
    companyName: '',
    startDate: '',
    endDate: '',
    jobDescription: '',
    leavingReason: '',
    companyAddress: '',
};

export const RESPONSE_STATUS = {
    success: 200,
};
export const AVATAR_SIZE_LIMIT = 5000000;

export const TAB = {
    LEADER_PENDING_TAB: {
        PENDING: 0,
        PENDING_SALARY: 1,
        PENDING_PROMOTE: 2,
        PENDING_PROPOSAL: 3,
    },
    EMPLOYEE_TAB: {
        INFO: 0,
        CERTIFICATE: 1,
        RELATIVE: 2,
    },
    REGISTER_TAB: {
        CV: 0,
        INFO: 1,
        CERTIFICATE: 2,
    },
    EMPLOYEE_MANAGEMENT_TAB: {
        SALARY: 0,
        PROMOTE: 1,
        PROPOSAL: 2,
    },
    LETTER_TAB: {
        SALARY: 0,
        PROMOTE: 0,
        PROPOSAL: 0,
        RESIGN: 0,
    },
};
