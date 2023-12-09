import React from 'react';
export default function textFieldProps(props) {
    const {title, view, handlechange,maxDate=null,minDate=null} = props;
    return {
        className: 'w-100 mb-10',
        label: (
            <span className="font">
                <span style={{ color: 'red' }}> * </span>
                {title}
            </span>
        ),
        onChange: (e) => {
            handlechange(e);
        },
        InputProps: {
            readOnly: view,
            inputProps: {
                max: maxDate,
                min: minDate,
        }},
        variant: 'outlined',
        size: 'small',
    };
}