// ** React imports
import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import 'app/assets/Button.scss';

function DialogDelete({ close, show, confirmDelete }) {
    return (
        <Dialog open={show} onClose={close}>
            <DialogTitle className="text-center">Xác nhận xóa</DialogTitle>
            <DialogContent className="text-center mb-10">
                Bạn không thể hoàn tác Thao tác này, bạn chắc chắn chứ?
            </DialogContent>
            <DialogActions>
                <Button onClick={confirmDelete} className="btn-secondary" startIcon={<Delete />} variant="contained">
                    Xác nhận
                </Button>
                <Button onClick={close} variant="contained" className="btn-cancel">
                    Hủy bỏ
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default DialogDelete;
